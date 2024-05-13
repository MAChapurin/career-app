import { type CreateRsbuildOptions, type PluginManager, type RspackConfig } from '@rsbuild/shared';
import type { InternalContext, NormalizedConfig } from '../types';
export type InitConfigsOptions = {
    context: InternalContext;
    pluginManager: PluginManager;
    rsbuildOptions: Required<CreateRsbuildOptions>;
};
export declare function initRsbuildConfig({ context, pluginManager, }: Pick<InitConfigsOptions, 'context' | 'pluginManager'>): Promise<NormalizedConfig>;
export declare function initConfigs({ context, pluginManager, rsbuildOptions, }: InitConfigsOptions): Promise<{
    rspackConfigs: RspackConfig[];
}>;
