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
const fs = __importStar(require("fs"));
// Mock fs so we don't need the real dashboard.html on disk during tests
jest.mock('fs');
const mockReadFileSync = fs.readFileSync;
// Import AFTER mocking
const dashboard_generator_1 = require("../action/dashboard-generator");
const makeResult = (overrides = {}) => ({
    url: 'https://example.com',
    name: 'Home',
    device: 'mobile',
    scores: { performance: 92, accessibility: 97, bestPractices: 83, seo: 91 },
    metrics: { fcp: 1200, lcp: 2100, tbt: 80, cls: 0.02, si: 1800, tti: 3200 },
    individualRuns: [],
    passed: true,
    failures: [],
    strategy: 'median',
    runs: 3,
    totalRuns: 3,
    successfulRuns: 3,
    failedRuns: 0,
    ...overrides,
});
describe('generateDashboardHTML()', () => {
    beforeEach(() => {
        mockReadFileSync.mockReturnValue('<script>const RESULTS = __RESULTS_DATA__;</script>');
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('replaces __RESULTS_DATA__ with JSON-serialized results', () => {
        const results = [makeResult()];
        const html = (0, dashboard_generator_1.generateDashboardHTML)(results);
        expect(html).toContain(JSON.stringify(results));
        expect(html).not.toContain('__RESULTS_DATA__');
    });
    it('handles an empty results array', () => {
        const html = (0, dashboard_generator_1.generateDashboardHTML)([]);
        expect(html).toContain('[]');
        expect(html).not.toContain('__RESULTS_DATA__');
    });
    it('serializes multiple results correctly', () => {
        const results = [
            makeResult({ name: 'Home', device: 'mobile' }),
            makeResult({ name: 'Home', device: 'desktop' }),
            makeResult({ name: 'About', device: 'mobile', passed: false }),
        ];
        const html = (0, dashboard_generator_1.generateDashboardHTML)(results);
        const parsed = JSON.parse(html.match(/<script>const RESULTS = (.+);<\/script>/)[1]);
        expect(parsed).toHaveLength(3);
        expect(parsed[2].passed).toBe(false);
    });
    it('reads the template from the correct relative path', () => {
        (0, dashboard_generator_1.generateDashboardHTML)([]);
        const calledPath = mockReadFileSync.mock.calls[0][0];
        expect(calledPath).toMatch(/dashboard\.html$/);
    });
});
//# sourceMappingURL=dashboard-generator.test.js.map