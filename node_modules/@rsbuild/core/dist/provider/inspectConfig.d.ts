import { type InspectConfigOptions, type InspectConfigResult, type RspackConfig } from '@rsbuild/shared';
import { type InitConfigsOptions } from './initConfigs';
export declare function inspectConfig({ context, pluginManager, rsbuildOptions, bundlerConfigs, inspectOptions, }: InitConfigsOptions & {
    inspectOptions?: InspectConfigOptions;
    bundlerConfigs?: RspackConfig[];
}): Promise<InspectConfigResult<'rspack'>>;
