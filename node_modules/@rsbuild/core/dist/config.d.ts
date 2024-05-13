import type { NormalizedConfig, RsbuildConfig } from '@rsbuild/shared';
export declare const withDefaultConfig: (rootPath: string, config: RsbuildConfig) => Promise<RsbuildConfig>;
/** #__PURE__
 * 1. May used by multiple plugins.
 * 2. Object value that should not be empty.
 * 3. Meaningful and can be filled by constant value.
 */
export declare const normalizeConfig: (config: RsbuildConfig) => NormalizedConfig;
export type ConfigParams = {
    env: string;
    command: string;
    envMode?: string;
};
export type RsbuildConfigAsyncFn = (env: ConfigParams) => Promise<RsbuildConfig>;
export type RsbuildConfigSyncFn = (env: ConfigParams) => RsbuildConfig;
export type RsbuildConfigExport = RsbuildConfig | RsbuildConfigSyncFn | RsbuildConfigAsyncFn;
/**
 * This function helps you to autocomplete configuration types.
 * It accepts a Rsbuild config object, or a function that returns a config.
 */
export declare function defineConfig(config: RsbuildConfig): RsbuildConfig;
export declare function defineConfig(config: RsbuildConfigSyncFn): RsbuildConfigSyncFn;
export declare function defineConfig(config: RsbuildConfigAsyncFn): RsbuildConfigAsyncFn;
export declare function defineConfig(config: RsbuildConfigExport): RsbuildConfigExport;
export declare function watchFiles(files: string[]): Promise<void>;
export declare function loadConfig({ cwd, path, envMode, }?: {
    cwd?: string;
    path?: string;
    envMode?: string;
}): Promise<{
    content: RsbuildConfig;
    filePath: string | null;
}>;
