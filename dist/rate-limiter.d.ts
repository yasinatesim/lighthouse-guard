export declare class RateLimiter {
    private lastRequestTime;
    wait(baseDelay: number, label?: string): Promise<void>;
    waitBetweenPages(baseDelay: number, pageName?: string): Promise<void>;
    private sleep;
}
//# sourceMappingURL=rate-limiter.d.ts.map