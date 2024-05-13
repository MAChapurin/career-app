import type { CompileMiddlewareAPI, DevConfig, ServerConfig } from '@rsbuild/shared';
type WatchFilesOptions = {
    dev: DevConfig;
    server: ServerConfig;
    compileMiddlewareAPI?: CompileMiddlewareAPI;
};
export declare function setupWatchFiles(options: WatchFilesOptions): Promise<{
    close(): Promise<void>;
} | undefined>;
export {};
