"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const safe_chrome_1 = require("../safe-chrome");
const mockKill = jest.fn().mockResolvedValue(undefined);
const mockLaunch = jest.fn();
jest.mock('chrome-launcher', () => ({
    launch: (...args) => mockLaunch(...args),
}));
const makeMockChrome = (port = 9222, pid = 12345) => ({
    port,
    pid,
    kill: mockKill,
    process: {},
});
describe('SafeChrome', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        mockKill.mockClear().mockResolvedValue(undefined);
        mockLaunch.mockClear();
    });
    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });
    describe('launch()', () => {
        it('returns the port from chrome-launcher', async () => {
            mockLaunch.mockResolvedValue(makeMockChrome(9222));
            const chrome = new safe_chrome_1.SafeChrome([]);
            const port = await chrome.launch();
            expect(port).toBe(9222);
        });
        it('passes --headless=new and --no-sandbox flags', async () => {
            mockLaunch.mockResolvedValue(makeMockChrome());
            const chrome = new safe_chrome_1.SafeChrome([]);
            await chrome.launch();
            const flags = mockLaunch.mock.calls[0][0].chromeFlags;
            expect(flags).toContain('--headless=new');
            expect(flags).toContain('--no-sandbox');
        });
        it('prepends user-supplied flags before built-in flags', async () => {
            mockLaunch.mockResolvedValue(makeMockChrome());
            const chrome = new safe_chrome_1.SafeChrome(['--custom-flag']);
            await chrome.launch();
            const flags = mockLaunch.mock.calls[0][0].chromeFlags;
            expect(flags[0]).toBe('--custom-flag');
        });
        it('throws a descriptive error when chrome-launcher rejects', async () => {
            mockLaunch.mockRejectedValue(new Error('no chrome binary'));
            const chrome = new safe_chrome_1.SafeChrome([]);
            await expect(chrome.launch()).rejects.toThrow('Chrome could not be launched');
        });
    });
    describe('kill()', () => {
        it('is a no-op when chrome was never launched', async () => {
            const chrome = new safe_chrome_1.SafeChrome([]);
            // kill() ends with a 1s sleep — run all timers to let it finish
            const p = chrome.kill();
            await jest.runAllTimersAsync();
            await p;
            expect(mockKill).not.toHaveBeenCalled();
        });
        it('calls chrome.kill() after a successful launch', async () => {
            mockLaunch.mockResolvedValue(makeMockChrome());
            const chrome = new safe_chrome_1.SafeChrome([]);
            await chrome.launch();
            const p = chrome.kill();
            await jest.runAllTimersAsync();
            await p;
            expect(mockKill).toHaveBeenCalledTimes(1);
        });
        it('nulls the internal reference so a second kill is a no-op', async () => {
            mockLaunch.mockResolvedValue(makeMockChrome());
            const chrome = new safe_chrome_1.SafeChrome([]);
            await chrome.launch();
            const first = chrome.kill();
            await jest.runAllTimersAsync();
            await first;
            mockKill.mockClear();
            const second = chrome.kill();
            await jest.runAllTimersAsync();
            await second;
            expect(mockKill).not.toHaveBeenCalled();
        });
    });
    describe('isRunning()', () => {
        it('returns false when chrome was never launched', () => {
            const chrome = new safe_chrome_1.SafeChrome([]);
            expect(chrome.isRunning()).toBe(false);
        });
        it('returns true when using the current process PID (always alive)', async () => {
            // Use the test process's own PID — signal 0 probe will succeed
            mockLaunch.mockResolvedValue(makeMockChrome(9222, process.pid));
            const chrome = new safe_chrome_1.SafeChrome([]);
            await chrome.launch();
            expect(chrome.isRunning()).toBe(true);
        });
        it('returns false for a PID that does not exist', async () => {
            // PID 1 is init/launchd — signal 0 will throw EPERM or succeed depending
            // on the OS. Use an absurdly high PID that cannot exist.
            mockLaunch.mockResolvedValue(makeMockChrome(9222, 9999999));
            const chrome = new safe_chrome_1.SafeChrome([]);
            await chrome.launch();
            // process.kill(9999999, 0) throws ESRCH → isRunning() catches and returns false
            expect(chrome.isRunning()).toBe(false);
        });
    });
});
//# sourceMappingURL=safe-chrome.test.js.map