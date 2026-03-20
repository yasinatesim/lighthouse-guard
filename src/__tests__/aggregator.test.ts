import { Aggregator } from '../aggregator';
import { Scores, Metrics } from '../types';

const makeScores = (perf: number): Scores => ({
  performance: perf,
  accessibility: 90,
  bestPractices: 85,
  seo: 88,
});

const makeMetrics = (lcp: number): Metrics => ({
  fcp: 1000,
  lcp,
  tbt: 100,
  cls: 0.1,
  si: 1500,
  tti: 3000,
});

describe('Aggregator — median strategy', () => {
  const agg = new Aggregator('median');

  describe('scores()', () => {
    it('returns the middle value for an odd-count array', () => {
      const input = [makeScores(72), makeScores(89), makeScores(81)];
      // sorted: 72, 81, 89 → median = 81
      expect(agg.scores(input).performance).toBe(81);
    });

    it('returns the average of the two middle values for an even-count array', () => {
      const input = [makeScores(70), makeScores(80), makeScores(90), makeScores(100)];
      // sorted: 70, 80, 90, 100 → (80+90)/2 = 85
      expect(agg.scores(input).performance).toBe(85);
    });

    it('returns the single value when only one run', () => {
      expect(agg.scores([makeScores(88)]).performance).toBe(88);
    });

    it('filters out runs where performance is 0', () => {
      const input = [makeScores(0), makeScores(85)];
      expect(agg.scores(input).performance).toBe(85);
    });

    it('returns zero scores when all runs have performance = 0', () => {
      const result = agg.scores([makeScores(0), makeScores(0)]);
      expect(result.performance).toBe(0);
      expect(result.accessibility).toBe(0);
    });

    it('returns zero scores for an empty array', () => {
      const result = agg.scores([]);
      expect(result.performance).toBe(0);
      expect(result.seo).toBe(0);
    });

    it('aggregates all four score fields', () => {
      const input: Scores[] = [
        { performance: 70, accessibility: 92, bestPractices: 80, seo: 85 },
        { performance: 80, accessibility: 94, bestPractices: 82, seo: 87 },
        { performance: 90, accessibility: 96, bestPractices: 84, seo: 89 },
      ];
      const result = agg.scores(input);
      expect(result.performance).toBe(80);
      expect(result.accessibility).toBe(94);
      expect(result.bestPractices).toBe(82);
      expect(result.seo).toBe(87);
    });
  });

  describe('metrics()', () => {
    it('returns median LCP', () => {
      const input = [makeMetrics(2000), makeMetrics(2500), makeMetrics(2200)];
      expect(agg.metrics(input).lcp).toBe(2200);
    });

    it('filters out runs where lcp is 0', () => {
      const input = [makeMetrics(0), makeMetrics(2500)];
      expect(agg.metrics(input).lcp).toBe(2500);
    });

    it('returns zero metrics for an empty array', () => {
      const result = agg.metrics([]);
      expect(result.lcp).toBe(0);
      expect(result.fcp).toBe(0);
    });

    it('returns zero metrics when all runs have lcp = 0', () => {
      const result = agg.metrics([makeMetrics(0)]);
      expect(result.lcp).toBe(0);
    });

    it('aggregates CLS with correct precision', () => {
      const input: Metrics[] = [
        { fcp: 1000, lcp: 2000, tbt: 100, cls: 0.05, si: 1500, tti: 3000 },
        { fcp: 1000, lcp: 2200, tbt: 110, cls: 0.10, si: 1600, tti: 3100 },
        { fcp: 1000, lcp: 2400, tbt: 120, cls: 0.15, si: 1700, tti: 3200 },
      ];
      // sorted cls: 0.05, 0.10, 0.15 → median = 0.10
      expect(agg.metrics(input).cls).toBe(0.1);
    });
  });
});

describe('Aggregator — average strategy', () => {
  const agg = new Aggregator('average');

  it('returns the rounded arithmetic mean', () => {
    const input = [makeScores(70), makeScores(80), makeScores(90)];
    // (70+80+90)/3 = 80
    expect(agg.scores(input).performance).toBe(80);
  });

  it('rounds 0.5 up', () => {
    const input = [makeScores(85), makeScores(86)];
    // (85+86)/2 = 85.5 → rounds to 86
    expect(agg.scores(input).performance).toBe(86);
  });

  it('handles a single value correctly', () => {
    expect(agg.scores([makeScores(77)]).performance).toBe(77);
  });

  it('averages metrics correctly', () => {
    const input = [makeMetrics(2000), makeMetrics(3000)];
    expect(agg.metrics(input).lcp).toBe(2500);
  });
});
