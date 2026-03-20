import * as chromeLauncher from 'chrome-launcher';

export class SafeChrome {
  private chrome: chromeLauncher.LaunchedChrome | null = null;
  private killTimeout: NodeJS.Timeout | null = null;

  constructor(private chromeFlags: string[]) {}

  async launch(): Promise<number> {
    await this.kill();

    try {
      this.chrome = await chromeLauncher.launch({
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
        void this.kill().catch(() => {});
      }, 5 * 60 * 1000);

      return this.chrome.port;
    } catch (error) {
      await this.kill();
      throw new Error(`Chrome could not be launched: ${error}`);
    }
  }

  async kill(): Promise<void> {
    if (this.killTimeout) {
      clearTimeout(this.killTimeout);
      this.killTimeout = null;
    }

    if (!this.chrome) return;

    const pid = this.chrome.pid;

    try {
      await this.chrome.kill();
    } catch {
      // Continue silently
    }

    try {
      if (pid) {
        process.kill(pid, 0);
        process.kill(pid, 'SIGKILL');
      }
    } catch {
      // Process already dead
    }

    this.chrome = null;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  isRunning(): boolean {
    if (!this.chrome) return false;

    try {
      process.kill(this.chrome.pid, 0);
      return true;
    } catch {
      return false;
    }
  }
}
