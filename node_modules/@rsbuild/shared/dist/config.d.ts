import type { InspectConfigOptions, NormalizedConfig, RsbuildConfig } from './types';
export declare function outputInspectConfigFiles({ rsbuildConfig, rawRsbuildConfig, bundlerConfigs, inspectOptions, configType, }: {
    configType: string;
    rsbuildConfig: NormalizedConfig;
    rawRsbuildConfig: string;
    bundlerConfigs: string[];
    inspectOptions: InspectConfigOptions & {
        outputPath: string;
    };
}): Promise<void>;
export declare function stringifyConfig(config: unknown, verbose?: boolean): Promise<string>;
export declare const getDefaultStyledComponentsConfig: (isProd: boolean, ssr: boolean) => {
    ssr: boolean;
    pure: boolean;
    displayName: boolean;
    transpileTemplateLiterals: boolean;
};
/**
 * Omit unused keys from Rsbuild config passed by user
 */
export declare const pickRsbuildConfig: (rsbuildConfig: RsbuildConfig) => RsbuildConfig;
