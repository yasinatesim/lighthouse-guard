export declare class SafeChrome {
    private chromeFlags;
    private chrome;
    private killTimeout;
    constructor(chromeFlags: string[]);
    launch(): Promise<number>;
    kill(): Promise<void>;
    isRunning(): boolean;
}
