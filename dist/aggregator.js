"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregator = void 0;
class Aggregator {
    strategy;
    constructor(strategy) {
        this.strategy = strategy;
    }
    scores(allScores) {
        const valid = allScores.filter(s => s.performance > 0);
        if (valid.length === 0) {
            return { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 };
        }
        const keys = ['performance', 'accessibility', 'bestPractices', 'seo'];
        const result = {};
        for (const key of keys) {
            result[key] = this.calculate(valid.map(s => s[key]));
        }
        return result;
    }
    metrics(allMetrics) {
        const valid = allMetrics.filter(m => m.lcp > 0);
        if (valid.length === 0) {
            return { fcp: 0, lcp: 0, tbt: 0, cls: 0, si: 0, tti: 0 };
        }
        const keys = ['fcp', 'lcp', 'tbt', 'cls', 'si', 'tti'];
        const result = {};
        for (const key of keys) {
            result[key] = this.calculate(valid.map(m => m[key]));
        }
        return result;
    }
    calculate(values) {
        if (values.length === 0)
            return 0;
        if (values.length === 1)
            return values[0];
        return this.strategy === 'median' ? this.median(values) : this.average(values);
    }
    median(values) {
        const sorted = [...values].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0
            ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
            : sorted[mid];
    }
    average(values) {
        return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    }
}
exports.Aggregator = Aggregator;
//# sourceMappingURL=aggregator.js.map