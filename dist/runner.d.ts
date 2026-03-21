import { Config, RunResult } from './types';
export declare class LighthouseGuard {
    private config;
    private rateLimiter;
    private aggregator;
    private notifier;
    constructor(userConfig: Partial<Config>);
    run(): Promise<{
        results: RunResult[];
        passed: boolean;
    }>;
    private runPage;
    private executeWithRetry;
    private runLighthouseWithTimeout;
    private runLighthouse;
    private checkThresholds;
    private printResult;
    private printSummary;
}
//# sourceMappingURL=runner.d.ts.map