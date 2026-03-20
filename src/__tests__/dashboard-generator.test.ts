import * as fs from 'fs';
import { RunResult } from '../types';

// Mock fs so we don't need the real dashboard.html on disk during tests
jest.mock('fs');
const mockReadFileSync = fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>;

// Import AFTER mocking
import { generateDashboardHTML } from '../action/dashboard-generator';

const makeResult = (overrides: Partial<RunResult> = {}): RunResult => ({
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
    mockReadFileSync.mockReturnValue(
      '<script>const RESULTS = __RESULTS_DATA__;</script>'
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('replaces __RESULTS_DATA__ with JSON-serialized results', () => {
    const results = [makeResult()];
    const html = generateDashboardHTML(results);
    expect(html).toContain(JSON.stringify(results));
    expect(html).not.toContain('__RESULTS_DATA__');
  });

  it('handles an empty results array', () => {
    const html = generateDashboardHTML([]);
    expect(html).toContain('[]');
    expect(html).not.toContain('__RESULTS_DATA__');
  });

  it('serializes multiple results correctly', () => {
    const results = [
      makeResult({ name: 'Home', device: 'mobile' }),
      makeResult({ name: 'Home', device: 'desktop' }),
      makeResult({ name: 'About', device: 'mobile', passed: false }),
    ];
    const html = generateDashboardHTML(results);
    const parsed = JSON.parse(
      html.match(/<script>const RESULTS = (.+);<\/script>/)![1]
    );
    expect(parsed).toHaveLength(3);
    expect(parsed[2].passed).toBe(false);
  });

  it('reads the template from the correct relative path', () => {
    generateDashboardHTML([]);
    const calledPath = mockReadFileSync.mock.calls[0][0] as string;
    expect(calledPath).toMatch(/dashboard\.html$/);
  });
});
