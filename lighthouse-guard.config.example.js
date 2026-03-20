// lighthouse-guard.config.js - Example configuration

module.exports = {
  urls: [
    {
      url: 'https://yasinates.com',
      name: 'Home',
      thresholds: {
        mobile: {
          performance: 70,
          accessibility: 90,
          bestPractices: 80,
          seo: 90,
          lcp: 2500,
          fcp: 1800,
          tbt: 300,
          cls: 0.1,
        },
        desktop: {
          performance: 85,
          accessibility: 90,
          bestPractices: 80,
          seo: 90,
          lcp: 1500,
          fcp: 1200,
          tbt: 150,
          cls: 0.05,
        },
      },
    },
    {
      url: 'https://yasinates.com/hakkimda',
      name: 'About',
      thresholds: {
        mobile: {
          performance: 75,
          accessibility: 90,
        },
        desktop: {
          performance: 88,
          accessibility: 90,
        },
      },
    },
  ],

  runs: 3,
  strategy: 'median', // 'median' | 'average'

  // Ban protection
  delayBetweenRuns: 10000,   // 10 seconds
  delayBetweenPages: 15000,  // 15 seconds

  // Failure protection
  maxRetries: 3,
  retryDelay: 15000,
  timeout: 90000,
  gracefulFail: true,        // true = pipeline does NOT break if no result

  devices: ['mobile', 'desktop'],
  failOnThreshold: true,

  // Notifications (optional)
  // notifications: {
  //   slack: {
  //     webhookUrl: 'https://hooks.slack.com/services/xxx/yyy/zzz',
  //     channel: '#deployments',
  //     mentionOnFail: '@channel',
  //   },
  //   webhook: {
  //     url: 'https://your-webhook.com/lighthouse',
  //     headers: { 'Authorization': 'Bearer your-token' },
  //   },
  // },
};
