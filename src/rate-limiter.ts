export class RateLimiter {
  private lastRequestTime: number = 0;

  async wait(baseDelay: number, label?: string): Promise<void> {
    if (baseDelay <= 0) return;

    const jitter = Math.floor(Math.random() * baseDelay * 0.3);
    const totalDelay = baseDelay + jitter;

    const timeSinceLastRequest = Date.now() - this.lastRequestTime;
    const remainingDelay = Math.max(0, totalDelay - timeSinceLastRequest);

    if (remainingDelay > 0) {
      if (label) {
        console.log(
          `   ⏳ ${label}: ${(remainingDelay / 1000).toFixed(1)}s waiting (ban protection)...`
        );
      }
      await this.sleep(remainingDelay);
    }

    this.lastRequestTime = Date.now();
  }

  async waitBetweenPages(baseDelay: number, pageName?: string): Promise<void> {
    const extraDelay = Math.floor(Math.random() * 5000);

    if (pageName) {
      console.log(`\n   🔄 Next page: ${pageName}`);
    }

    await this.wait(baseDelay + extraDelay, 'Waiting between pages');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
