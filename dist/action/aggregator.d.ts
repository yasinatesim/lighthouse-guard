import { Scores, Metrics } from './types';
export declare class Aggregator {
    private strategy;
    constructor(strategy: 'median' | 'average');
    scores(allScores: Scores[]): Scores;
    metrics(allMetrics: Metrics[]): Metrics;
    private calculate;
    private median;
    private average;
}
