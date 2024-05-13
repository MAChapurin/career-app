import type { PluginManager, RsbuildPlugin, RsbuildPluginAPI } from '@rsbuild/shared';
export declare function createPluginManager(): PluginManager;
export declare const pluginDagSort: (plugins: RsbuildPlugin[]) => RsbuildPlugin[];
export declare function initPlugins({ pluginAPI, pluginManager, }: {
    pluginAPI?: RsbuildPluginAPI;
    pluginManager: PluginManager;
}): Promise<void>;
