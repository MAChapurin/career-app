import { type PluginManager, type RsbuildPluginAPI } from '@rsbuild/shared';
import type { InternalContext, NormalizedConfig } from './types';
export declare function getHTMLPathByEntry(entryName: string, config: NormalizedConfig): string;
export declare function getPluginAPI({ context, pluginManager, }: {
    context: InternalContext;
    pluginManager: PluginManager;
}): RsbuildPluginAPI;
