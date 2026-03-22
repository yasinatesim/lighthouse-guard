"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeChrome = void 0;
const chromeLauncher = __importStar(require("chrome-launcher"));
class SafeChrome {
    chromeFlags;
    chrome = null;
    killTimeout = null;
    constructor(chromeFlags) {
        this.chromeFlags = chromeFlags;
    }
    async launch() {
        await this.kill();
        try {
            this.chrome = await chromeLauncher.launch({
                chromePath: process.env.CHROME_PATH || process.env.CHROMIUM_PATH || undefined,
                chromeFlags: [
                    ...this.chromeFlags,
                    '--headless=new',
                    '--no-sandbox',
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--disable-extensions',
                    '--disable-background-networking',
                    '--disable-default-apps',
                    '--disable-sync',
                    '--no-first-run',
                    '--disable-translate',
                    '--js-flags=--max-old-space-size=512',
                    '--disable-features=TranslateUI',
                ],
                connectionPollInterval: 500,
                maxConnectionRetries: 10,
            });
            this.killTimeout = setTimeout(() => {
                console.warn('   ⚠️  Chrome has been open for 5 minutes, force closing...');
                void this.kill().catch(() => { });
            }, 5 * 60 * 1000);
            return this.chrome.port;
        }
        catch (error) {
            await this.kill();
            throw new Error(`Chrome could not be launched: ${error}`);
        }
    }
    async kill() {
        if (this.killTimeout) {
            clearTimeout(this.killTimeout);
            this.killTimeout = null;
        }
        if (!this.chrome)
            return;
        const pid = this.chrome.pid;
        try {
            await this.chrome.kill();
        }
        catch {
            // Continue silently
        }
        try {
            if (pid) {
                process.kill(pid, 0);
                process.kill(pid, 'SIGKILL');
            }
        }
        catch {
            // Process already dead
        }
        this.chrome = null;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    isRunning() {
        if (!this.chrome)
            return false;
        try {
            process.kill(this.chrome.pid, 0);
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.SafeChrome = SafeChrome;
//# sourceMappingURL=safe-chrome.js.map