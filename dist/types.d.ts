export interface Config {
    urls: PageConfig[];
    runs: number;
    strategy: 'median' | 'average';
    delayBetweenRuns: number;
    delayBetweenPages: number;
    maxRetries: number;
    retryDelay: number;
    timeout: number;
    gracefulFail: boolean;
    chromeFlags: string[];
    devices: ('mobile' | 'desktop')[];
    failOnThreshold: boolean;
    notifications?: NotificationConfig;
}
export interface PageConfig {
    url: string;
    name: string;
    thresholds: {
        mobile?: ThresholdScores;
        desktop?: ThresholdScores;
    };
}
export interface ThresholdScores {
    performance?: number;
    accessibility?: number;
    bestPractices?: number;
    seo?: number;
    lcp?: number;
    fcp?: number;
    tbt?: number;
    cls?: number;
}
export interface NotificationConfig {
    slack?: {
        webhookUrl: string;
        channel?: string;
        mentionOnFail?: string;
    };
    webhook?: {
        url: string;
        headers?: Record<string, string>;
    };
}
export interface RunResult {
    url: string;
    name: string;
    device: 'mobile' | 'desktop';
    scores: Scores;
    metrics: Metrics;
    individualRuns: Scores[];
    passed: boolean;
    failures: Failure[];
    strategy: string;
    runs: number;
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
}
export interface Scores {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
}
export interface Metrics {
    fcp: number;
    lcp: number;
    tbt: number;
    cls: number;
    si: number;
    tti: number;
}
export interface Failure {
    metric: string;
    actual: number;
    expected: number;
}
//# sourceMappingURL=types.d.ts.map