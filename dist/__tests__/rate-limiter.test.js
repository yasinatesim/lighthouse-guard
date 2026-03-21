"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rate_limiter_1 = require("../rate-limiter");
// RateLimiter starts with lastRequestTime=0, so the FIRST call always resolves
// immediately (Date.now() - 0 >> any baseDelay). Tests that check waiting behaviour
// must "prime" the limiter with an initial call first.
describe('RateLimiter', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });
    describe('wait()', () => {
        it('resolves immediately when delay is 0', async () => {
            const limiter = new rate_limiter_1.RateLimiter();
            await expect(limiter.wait(0)).resolves.toBeUndefined();
        });
        it('resolves immediately when delay is negative', async () => {
            const limiter = new rate_limiter_1.RateLimiter();
            await expect(limiter.wait(-100)).resolves.toBeUndefined();
        });
        it('first call always resolves immediately (no prior request)', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(0);
            const limiter = new rate_limiter_1.RateLimiter();
            let resolved = false;
            const p = limiter.wait(1000).then(() => { resolved = true; });
            await Promise.resolve(); // flush microtasks
            await p;
            expect(resolved).toBe(true); // resolved without timer advance
        });
        it('waits baseDelay ms when called immediately after previous request', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(0); // no jitter
            const limiter = new rate_limiter_1.RateLimiter();
            await limiter.wait(100); // prime — resolves immediately
            let resolved = false;
            const p = limiter.wait(1000).then(() => { resolved = true; });
            await Promise.resolve();
            expect(resolved).toBe(false);
            jest.advanceTimersByTime(1001);
            await p;
            expect(resolved).toBe(true);
        });
        it('applies jitter (up to 30% of baseDelay)', async () => {
            // random=1.0 → jitter = floor(1.0 * 1000 * 0.3) = 300ms → total = 1300ms
            jest.spyOn(Math, 'random').mockReturnValue(1.0);
            const limiter = new rate_limiter_1.RateLimiter();
            await limiter.wait(100); // prime
            let resolved = false;
            const p = limiter.wait(1000).then(() => { resolved = true; });
            await Promise.resolve();
            expect(resolved).toBe(false);
            jest.advanceTimersByTime(1301);
            await p;
            expect(resolved).toBe(true);
        });
        it('deducts elapsed time from the required wait', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(0);
            const limiter = new rate_limiter_1.RateLimiter();
            await limiter.wait(100); // prime
            // 500ms pass — half of the 1000ms delay has already elapsed
            jest.advanceTimersByTime(500);
            let resolved = false;
            const p = limiter.wait(1000).then(() => { resolved = true; });
            await Promise.resolve();
            expect(resolved).toBe(false); // 500ms remaining
            jest.advanceTimersByTime(501);
            await p;
            expect(resolved).toBe(true);
        });
        it('resolves immediately when more than baseDelay has already elapsed', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(0);
            const limiter = new rate_limiter_1.RateLimiter();
            await limiter.wait(100); // prime
            jest.advanceTimersByTime(2000); // more than any delay
            let resolved = false;
            const p = limiter.wait(1000).then(() => { resolved = true; });
            await Promise.resolve();
            await p;
            expect(resolved).toBe(true);
        });
    });
    describe('waitBetweenPages()', () => {
        it('waits at least baseDelay after priming', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(0);
            const limiter = new rate_limiter_1.RateLimiter();
            await limiter.wait(100); // prime
            let resolved = false;
            const p = limiter.waitBetweenPages(1000).then(() => { resolved = true; });
            await Promise.resolve();
            expect(resolved).toBe(false);
            jest.advanceTimersByTime(1100);
            await p;
            expect(resolved).toBe(true);
        });
        it('resolves without throwing on first call', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(0);
            const limiter = new rate_limiter_1.RateLimiter();
            await expect(limiter.waitBetweenPages(0)).resolves.toBeUndefined();
        });
    });
});
//# sourceMappingURL=rate-limiter.test.js.map