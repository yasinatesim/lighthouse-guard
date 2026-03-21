"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("../runner");
// Mock chrome-launcher — factory must be self-contained (jest.mock is hoisted)
jest.mock('chrome-launcher', () => ({
    launch: jest.fn().mockResolvedValue({
        port: 9222,
        pid: 12345,
        kill: jest.fn().mockResolvedValue(undefined),
    }),
}));
const chromeLauncher = __importStar(require("chrome-launcher"));
// Mock lighthouse to return a controlled result
const mockLighthouse = jest.fn();
jest.mock('lighthouse', () => ({
    __esModule: true,
    default: (...args) => mockLighthouse(...args),
}));
const makeLighthouseResult = (perf = 0.9, a11y = 0.97, bp = 0.83, seo = 0.91) => ({
    lhr: {
        categories: {
            performance: { score: perf },
            accessibility: { score: a11y },
            'best-practices': { score: bp },
            seo: { score: seo },
        },
        audits: {
            'first-contentful-paint': { numericValue: 1200 },
            'largest-contentful-paint': { numericValue: 2100 },
            'total-blocking-time': { numericValue: 80 },
            'cumulative-layout-shift': { numericValue: 0.02 },
            'speed-index': { numericValue: 1800 },
            interactive: { numericValue: 3200 },
        },
    },
});
const makePage = (overrides = {}) => ({
    url: 'https://example.com',
    name: 'Home',
    thresholds: {},
    ...overrides,
});
describe('LighthouseGuard', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        mockLighthouse.mockClear();
        chromeLauncher.launch.mockClear();
    });
    afterEach(async () => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });
    describe('run() — threshold pass/fail', () => {
        it('reports passed=true when all scores meet thresholds', async () => {
            mockLighthouse.mockResolvedValue(makeLighthouseResult(0.92, 0.97, 0.85, 0.91));
            const guard = new runner_1.LighthouseGuard({
                urls: [
                    makePage({
                        thresholds: {
                            mobile: { performance: 80, accessibility: 90 },
                        },
                    }),
                ],
                runs: 1,
                devices: ['mobile'],
                delayBetweenRuns: 0,
                delayBetweenPages: 0,
                maxRetries: 1,
                gracefulFail: true,
                failOnThreshold: true,
            });
            // run() awaits lighthouse which is mocked but still async — run all timers
            const runPromise = guard.run();
            await jest.runAllTimersAsync();
            const { results, passed } = await runPromise;
            expect(passed).toBe(true);
            expect(results[0].failures).toHaveLength(0);
            expect(results[0].scores.performance).toBe(92);
        });
        it('reports passed=false when a score is below threshold', async () => {
            mockLighthouse.mockResolvedValue(makeLighthouseResult(0.65, 0.97, 0.85, 0.91));
            const guard = new runner_1.LighthouseGuard({
                urls: [
                    makePage({
                        thresholds: {
                            mobile: { performance: 80 },
                        },
                    }),
                ],
                runs: 1,
                devices: ['mobile'],
                delayBetweenRuns: 0,
                delayBetweenPages: 0,
                maxRetries: 1,
                gracefulFail: true,
                failOnThreshold: true,
            });
            const runPromise = guard.run();
            await jest.runAllTimersAsync();
            const { results, passed } = await runPromise;
            expect(passed).toBe(false);
            expect(results[0].failures).toHaveLength(1);
            expect(results[0].failures[0]).toMatchObject({ metric: 'performance', actual: 65, expected: 80 });
        });
        it('reports passed=true when failOnThreshold=false regardless of scores', async () => {
            mockLighthouse.mockResolvedValue(makeLighthouseResult(0.40, 0.40, 0.40, 0.40));
            const guard = new runner_1.LighthouseGuard({
                urls: [makePage({ thresholds: { mobile: { performance: 80 } } })],
                runs: 1,
                devices: ['mobile'],
                delayBetweenRuns: 0,
                delayBetweenPages: 0,
                maxRetries: 1,
                gracefulFail: true,
                failOnThreshold: false,
            });
            const runPromise = guard.run();
            await jest.runAllTimersAsync();
            const { passed } = await runPromise;
            expect(passed).toBe(true);
        });
    });
    describe('run() — graceful fail', () => {
        it('skips failed runs and continues when gracefulFail=true', async () => {
            mockLighthouse.mockResolvedValue(null); // simulate lighthouse returning nothing
            const guard = new runner_1.LighthouseGuard({
                urls: [makePage()],
                runs: 1,
                devices: ['mobile'],
                delayBetweenRuns: 0,
                delayBetweenPages: 0,
                maxRetries: 1,
                gracefulFail: true,
                failOnThreshold: true,
            });
            const runPromise = guard.run();
            await jest.runAllTimersAsync();
            const { results } = await runPromise;
            expect(results[0].successfulRuns).toBe(0);
            expect(results[0].failedRuns).toBe(1);
            // gracefulFail: no results → passed=true (pipeline continues)
            expect(results[0].passed).toBe(true);
        });
        it('exhausts all retries and throws when gracefulFail=false', async () => {
            mockLighthouse.mockRejectedValue(new Error('Chrome crashed'));
            const guard = new runner_1.LighthouseGuard({
                urls: [makePage()],
                runs: 1,
                devices: ['mobile'],
                delayBetweenRuns: 0,
                delayBetweenPages: 0,
                maxRetries: 2,
                retryDelay: 0,
                gracefulFail: false,
                failOnThreshold: true,
            });
            const runPromise = guard.run();
            // Attach catch before flushing timers to prevent unhandled rejection
            const caught = runPromise.catch((e) => e);
            await jest.runAllTimersAsync();
            const result = await caught;
            expect(result).toBeInstanceOf(Error);
            expect(result.message).toContain('All 2 attempts failed');
        });
        it('exhausts all retries and returns null when gracefulFail=true', async () => {
            mockLighthouse.mockRejectedValue(new Error('Chrome crashed'));
            const guard = new runner_1.LighthouseGuard({
                urls: [makePage()],
                runs: 1,
                devices: ['mobile'],
                delayBetweenRuns: 0,
                delayBetweenPages: 0,
                maxRetries: 2,
                retryDelay: 0,
                gracefulFail: true,
                failOnThreshold: true,
            });
            const runPromise = guard.run();
            await jest.runAllTimersAsync();
            const { results } = await runPromise;
            // gracefulFail=true → swallows the error, pipeline continues
            expect(results[0].failedRuns).toBe(1);
            expect(results[0].passed).toBe(true);
        });
    });
    describe('run() — median aggregation across multiple runs', () => {
        it('uses median of 3 runs to eliminate outliers', async () => {
            mockLighthouse
                .mockResolvedValueOnce(makeLighthouseResult(0.72)) // run 1 outlier
                .mockResolvedValueOnce(makeLighthouseResult(0.89)) // run 2 ← median
                .mockResolvedValueOnce(makeLighthouseResult(0.81)); // run 3
            const guard = new runner_1.LighthouseGuard({
                urls: [makePage({ thresholds: { mobile: { performance: 85 } } })],
                runs: 3,
                strategy: 'median',
                devices: ['mobile'],
                delayBetweenRuns: 0,
                delayBetweenPages: 0,
                maxRetries: 1,
                gracefulFail: true,
                failOnThreshold: true,
            });
            const runPromise = guard.run();
            await jest.runAllTimersAsync();
            const { results } = await runPromise;
            // sorted: 72, 81, 89 → median = 81 → below threshold 85
            expect(results[0].scores.performance).toBe(81);
            expect(results[0].passed).toBe(false);
        });
    });
});
//# sourceMappingURL=runner.test.js.map