"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
class RateLimiter {
    lastRequestTime = 0;
    async wait(baseDelay, label) {
        if (baseDelay <= 0)
            return;
        const jitter = Math.floor(Math.random() * baseDelay * 0.3);
        const totalDelay = baseDelay + jitter;
        const timeSinceLastRequest = Date.now() - this.lastRequestTime;
        const remainingDelay = Math.max(0, totalDelay - timeSinceLastRequest);
        if (remainingDelay > 0) {
            if (label) {
                console.log(`   ⏳ ${label}: ${(remainingDelay / 1000).toFixed(1)}s waiting (ban protection)...`);
            }
            await this.sleep(remainingDelay);
        }
        this.lastRequestTime = Date.now();
    }
    async waitBetweenPages(baseDelay, pageName) {
        const extraDelay = Math.floor(Math.random() * 5000);
        if (pageName) {
            console.log(`\n   🔄 Next page: ${pageName}`);
        }
        await this.wait(baseDelay + extraDelay, 'Waiting between pages');
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.RateLimiter = RateLimiter;
//# sourceMappingURL=rate-limiter.js.map