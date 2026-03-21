"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notifier_1 = require("../notifier");
const makeResult = (passed = true) => ({
    url: 'https://example.com',
    name: 'Home',
    device: 'mobile',
    scores: { performance: 92, accessibility: 97, bestPractices: 83, seo: 91 },
    metrics: { fcp: 1200, lcp: 2100, tbt: 80, cls: 0.02, si: 1800, tti: 3200 },
    individualRuns: [],
    passed,
    failures: passed ? [] : [{ metric: 'performance', actual: 65, expected: 80 }],
    strategy: 'median',
    runs: 3,
    totalRuns: 3,
    successfulRuns: 3,
    failedRuns: 0,
});
describe('Notifier', () => {
    describe('notify() — no config', () => {
        it('resolves immediately when no notification config is set', async () => {
            const notifier = new notifier_1.Notifier(undefined);
            await expect(notifier.notify([makeResult()])).resolves.toBeUndefined();
        });
    });
    describe('notify() — Slack', () => {
        let fetchSpy;
        beforeEach(() => {
            fetchSpy = jest.spyOn(globalThis, 'fetch');
        });
        afterEach(() => {
            fetchSpy.mockRestore();
        });
        it('posts to the Slack webhook URL', async () => {
            fetchSpy.mockResolvedValue({ ok: true });
            const notifier = new notifier_1.Notifier({
                slack: { webhookUrl: 'https://hooks.slack.com/test' },
            });
            await notifier.notify([makeResult()]);
            expect(fetchSpy).toHaveBeenCalledWith('https://hooks.slack.com/test', expect.objectContaining({ method: 'POST' }));
        });
        it('sends application/json content-type', async () => {
            fetchSpy.mockResolvedValue({ ok: true });
            const notifier = new notifier_1.Notifier({
                slack: { webhookUrl: 'https://hooks.slack.com/test' },
            });
            await notifier.notify([makeResult()]);
            const options = fetchSpy.mock.calls[0][1];
            expect(options.headers['Content-Type']).toBe('application/json');
        });
        it('does NOT throw when fetch fails (graceful warn)', async () => {
            fetchSpy.mockRejectedValue(new Error('Network error'));
            const notifier = new notifier_1.Notifier({
                slack: { webhookUrl: 'https://hooks.slack.com/test' },
            });
            await expect(notifier.notify([makeResult()])).resolves.toBeUndefined();
        });
        it('does NOT throw when Slack returns non-ok status', async () => {
            fetchSpy.mockResolvedValue({ ok: false, status: 400 });
            const notifier = new notifier_1.Notifier({
                slack: { webhookUrl: 'https://hooks.slack.com/test' },
            });
            await expect(notifier.notify([makeResult()])).resolves.toBeUndefined();
        });
    });
    describe('notify() — generic webhook', () => {
        let fetchSpy;
        beforeEach(() => {
            fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true });
        });
        afterEach(() => {
            fetchSpy.mockRestore();
        });
        it('posts to the webhook URL', async () => {
            const notifier = new notifier_1.Notifier({
                webhook: { url: 'https://myserver.com/hook' },
            });
            await notifier.notify([makeResult()]);
            expect(fetchSpy).toHaveBeenCalledWith('https://myserver.com/hook', expect.objectContaining({ method: 'POST' }));
        });
        it('includes status and results in the payload', async () => {
            const notifier = new notifier_1.Notifier({
                webhook: { url: 'https://myserver.com/hook' },
            });
            await notifier.notify([makeResult(true)]);
            const body = JSON.parse(fetchSpy.mock.calls[0][1].body);
            expect(body.status).toBe('passed');
            expect(Array.isArray(body.results)).toBe(true);
        });
        it('forwards custom headers', async () => {
            const notifier = new notifier_1.Notifier({
                webhook: {
                    url: 'https://myserver.com/hook',
                    headers: { 'X-Api-Key': 'secret' },
                },
            });
            await notifier.notify([makeResult()]);
            const options = fetchSpy.mock.calls[0][1];
            expect(options.headers['X-Api-Key']).toBe('secret');
        });
    });
});
//# sourceMappingURL=notifier.test.js.map