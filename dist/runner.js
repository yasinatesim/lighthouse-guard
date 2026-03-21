"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LighthouseGuard = void 0;
const lighthouse_1 = __importDefault(require("lighthouse"));
const safe_chrome_1 = require("./safe-chrome");
const rate_limiter_1 = require("./rate-limiter");
const aggregator_1 = require("./aggregator");
const notifier_1 = require("./notifier");
const DEVICE_CONFIG = {
    mobile: {
        formFactor: 'mobile',
        screenEmulation: { mobile: true, width: 375, height: 667, deviceScaleFactor: 2, disabled: false },
        throttling: { cpuSlowdownMultiplier: 4, downloadThroughputKbps: 1600, uploadThroughputKbps: 750, rttMs: 150 },
    },
    desktop: {
        formFactor: 'desktop',
        screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
        throttling: { cpuSlowdownMultiplier: 1, downloadThroughputKbps: 10240, uploadThroughputKbps: 10240, rttMs: 40 },
    },
};
const DEFAULT_CONFIG = {
    urls: [],
    runs: 3,
    strategy: 'median',
    delayBetweenRuns: 10000,
    delayBetweenPages: 15000,
    maxRetries: 3,
    retryDelay: 15000,
    timeout: 90000,
    gracefulFail: true,
    chromeFlags: [],
    devices: ['mobile', 'desktop'],
    failOnThreshold: true,
};
class LighthouseGuard {
    config;
    rateLimiter;
    aggregator;
    notifier;
    constructor(userConfig) {
        this.config = { ...DEFAULT_CONFIG, ...userConfig };
        this.rateLimiter = new rate_limiter_1.RateLimiter();
        this.aggregator = new aggregator_1.Aggregator(this.config.strategy);
        this.notifier = new notifier_1.Notifier(this.config.notifications);
    }
    async run() {
        console.log('\n╔══════════════════════════════════════════╗');
        console.log('║      🔦 Lighthouse Guard v1.0.0          ║');
        console.log('╚══════════════════════════════════════════╝\n');
        console.log(`📋 ${this.config.urls.length} pages × ${this.config.devices.length} devices × ${this.config.runs} runs`);
        console.log(`📊 Strategy: ${this.config.strategy}`);
        console.log(`⏱️  Between runs: ${this.config.delayBetweenRuns / 1000}s, Between pages: ${this.config.delayBetweenPages / 1000}s`);
        console.log(`🔄 Max retries: ${this.config.maxRetries}, Graceful: ${this.config.gracefulFail}\n`);
        const allResults = [];
        let isFirstPage = true;
        for (const pageConfig of this.config.urls) {
            if (!isFirstPage) {
                await this.rateLimiter.waitBetweenPages(this.config.delayBetweenPages, pageConfig.name);
            }
            isFirstPage = false;
            for (const device of this.config.devices) {
                const result = await this.runPage(pageConfig, device);
                allResults.push(result);
                this.printResult(result);
            }
        }
        const passed = allResults.every(r => r.passed);
        await this.notifier.notify(allResults);
        this.printSummary(allResults, passed);
        return { results: allResults, passed };
    }
    async runPage(pageConfig, device) {
        console.log(`\n🌐 ${pageConfig.name} [${device.toUpperCase()}]`);
        console.log(`   URL: ${pageConfig.url}`);
        console.log(`   Running ${this.config.runs} runs...\n`);
        const allScores = [];
        const allMetrics = [];
        let failedRuns = 0;
        for (let i = 0; i < this.config.runs; i++) {
            if (i > 0) {
                await this.rateLimiter.wait(this.config.delayBetweenRuns, `Before run ${i + 1}`);
            }
            console.log(`   ▶️  Run ${i + 1}/${this.config.runs}`);
            const result = await this.executeWithRetry(pageConfig.url, device, i + 1);
            if (result) {
                allScores.push(result.scores);
                allMetrics.push(result.metrics);
                console.log(`   ✅ Run ${i + 1}: Performance=${result.scores.performance}, LCP=${Math.round(result.metrics.lcp)}ms`);
            }
            else {
                failedRuns++;
                console.log(`   ⚠️  Run ${i + 1}: No result obtained (graceful skip)`);
            }
        }
        const aggregatedScores = this.aggregator.scores(allScores);
        const aggregatedMetrics = this.aggregator.metrics(allMetrics);
        const thresholds = pageConfig.thresholds[device];
        const failures = thresholds ? this.checkThresholds(aggregatedScores, aggregatedMetrics, thresholds) : [];
        const hasResults = allScores.length > 0;
        const thresholdPassed = failures.length === 0;
        const passed = this.config.gracefulFail
            ? (hasResults ? thresholdPassed : true)
            : (hasResults && thresholdPassed);
        return {
            url: pageConfig.url,
            name: pageConfig.name,
            device,
            scores: aggregatedScores,
            metrics: aggregatedMetrics,
            individualRuns: allScores,
            passed: this.config.failOnThreshold ? passed : true,
            failures,
            strategy: this.config.strategy,
            runs: this.config.runs,
            totalRuns: this.config.runs,
            successfulRuns: allScores.length,
            failedRuns,
        };
    }
    async executeWithRetry(url, device, runNumber) {
        for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
            if (attempt > 1) {
                const retryDelay = this.config.retryDelay * attempt;
                console.log(`      🔄 Retry ${attempt}/${this.config.maxRetries} (after ${retryDelay / 1000}s)...`);
                await this.rateLimiter.wait(retryDelay, `Retry ${attempt}/${this.config.maxRetries}`);
            }
            const chrome = new safe_chrome_1.SafeChrome(this.config.chromeFlags);
            try {
                const port = await chrome.launch();
                const result = await this.runLighthouseWithTimeout(url, port, device);
                if (result)
                    return result;
            }
            catch (error) {
                const msg = error instanceof Error ? error.message : String(error);
                console.log(`      ⚠️  Attempt ${attempt} failed: ${msg}`);
            }
            finally {
                await chrome.kill();
            }
        }
        if (this.config.gracefulFail) {
            return null;
        }
        throw new Error(`All ${this.config.maxRetries} attempts failed for ${url}`);
    }
    async runLighthouseWithTimeout(url, port, device) {
        let timer;
        const timeout = new Promise((resolve) => {
            timer = setTimeout(() => {
                console.log(`      ⏰ Timeout (${this.config.timeout / 1000}s)`);
                resolve(null);
            }, this.config.timeout);
        });
        try {
            return await Promise.race([this.runLighthouse(url, port, device), timeout]);
        }
        finally {
            clearTimeout(timer);
        }
    }
    async runLighthouse(url, port, device) {
        try {
            const deviceConfig = DEVICE_CONFIG[device];
            const runnerResult = await (0, lighthouse_1.default)(url, {
                port,
                output: 'json',
                logLevel: 'error',
                formFactor: deviceConfig.formFactor,
                screenEmulation: deviceConfig.screenEmulation,
                throttling: deviceConfig.throttling,
                onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
                skipAudits: ['screenshot-thumbnails', 'final-screenshot', 'full-page-screenshot'],
            });
            if (!runnerResult?.lhr?.categories)
                return null;
            const { lhr } = runnerResult;
            const cats = lhr.categories;
            const audits = lhr.audits;
            const scores = {
                performance: Math.round((cats.performance?.score ?? 0) * 100),
                accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
                bestPractices: Math.round((cats['best-practices']?.score ?? 0) * 100),
                seo: Math.round((cats.seo?.score ?? 0) * 100),
            };
            const metrics = {
                fcp: audits['first-contentful-paint']?.numericValue ?? 0,
                lcp: audits['largest-contentful-paint']?.numericValue ?? 0,
                tbt: audits['total-blocking-time']?.numericValue ?? 0,
                cls: audits['cumulative-layout-shift']?.numericValue ?? 0,
                si: audits['speed-index']?.numericValue ?? 0,
                tti: audits['interactive']?.numericValue ?? 0,
            };
            return { scores, metrics };
        }
        catch {
            return null;
        }
    }
    checkThresholds(scores, metrics, thresholds) {
        const failures = [];
        const scoreChecks = [
            ['performance', scores.performance, thresholds.performance],
            ['accessibility', scores.accessibility, thresholds.accessibility],
            ['bestPractices', scores.bestPractices, thresholds.bestPractices],
            ['seo', scores.seo, thresholds.seo],
        ];
        for (const [name, actual, expected] of scoreChecks) {
            if (expected !== undefined && actual < expected) {
                failures.push({ metric: name, actual, expected });
            }
        }
        const metricChecks = [
            ['LCP', metrics.lcp, thresholds.lcp],
            ['FCP', metrics.fcp, thresholds.fcp],
            ['TBT', metrics.tbt, thresholds.tbt],
            ['CLS', metrics.cls, thresholds.cls],
        ];
        for (const [name, actual, expected] of metricChecks) {
            if (expected !== undefined && actual > expected) {
                failures.push({ metric: name, actual: Math.round(actual * 1000) / 1000, expected });
            }
        }
        return failures;
    }
    printResult(result) {
        const icon = result.passed ? '✅' : '❌';
        console.log(`\n   ${icon} RESULT [${result.device.toUpperCase()}]:`);
        console.log(`   ┌──────────────────┬───────┐`);
        console.log(`   │ Performance      │ ${String(result.scores.performance).padStart(5)} │`);
        console.log(`   │ Accessibility    │ ${String(result.scores.accessibility).padStart(5)} │`);
        console.log(`   │ Best Practices   │ ${String(result.scores.bestPractices).padStart(5)} │`);
        console.log(`   │ SEO              │ ${String(result.scores.seo).padStart(5)} │`);
        console.log(`   ├──────────────────┼───────┤`);
        console.log(`   │ LCP              │ ${String(Math.round(result.metrics.lcp)).padStart(4)}ms│`);
        console.log(`   │ FCP              │ ${String(Math.round(result.metrics.fcp)).padStart(4)}ms│`);
        console.log(`   │ TBT              │ ${String(Math.round(result.metrics.tbt)).padStart(4)}ms│`);
        console.log(`   │ CLS              │ ${result.metrics.cls.toFixed(3).padStart(5)} │`);
        console.log(`   └──────────────────┴───────┘`);
        console.log(`   📊 ${result.successfulRuns}/${result.totalRuns} successful runs (${result.strategy})`);
        if (result.failures.length > 0) {
            console.log(`   ⚠️  Failed thresholds:`);
            for (const f of result.failures) {
                console.log(`      • ${f.metric}: ${f.actual} (min: ${f.expected})`);
            }
        }
    }
    printSummary(results, passed) {
        console.log('\n');
        console.log('══════════════════════════════════════════════');
        if (passed) {
            console.log('  ✅ ALL TESTS PASSED');
        }
        else {
            console.log('  ❌ SOME TESTS FAILED');
        }
        console.log('══════════════════════════════════════════════');
        console.log('\n  Page                     Device   Perf  Status');
        console.log('  ─────────────────────────────────────────────');
        for (const r of results) {
            const icon = r.passed ? '✅' : '❌';
            const name = r.name.padEnd(24).substring(0, 24);
            const device = r.device.padEnd(8);
            const perf = String(r.scores.performance).padStart(4);
            console.log(`  ${name} ${device} ${perf}  ${icon}`);
        }
        console.log('');
    }
}
exports.LighthouseGuard = LighthouseGuard;
//# sourceMappingURL=runner.js.map