import { RunResult, NotificationConfig } from './types';
export declare class Notifier {
    private config?;
    constructor(config?: NotificationConfig | undefined);
    notify(results: RunResult[]): Promise<void>;
    private sendSlack;
    private sendWebhook;
}
