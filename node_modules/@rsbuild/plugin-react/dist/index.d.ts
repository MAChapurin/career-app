import { Rspack, RsbuildPlugin } from '@rsbuild/core';
import { PluginOptions } from '@rspack/plugin-react-refresh';

type SplitReactChunkOptions = {
    /**
     * Whether to enable split chunking for React-related dependencies (e.g., react, react-dom, scheduler).
     *
     * @default true
     */
    react?: boolean;
    /**
     * Whether to enable split chunking for routing-related dependencies (e.g., react-router, react-router-dom, history).
     *
     * @default true
     */
    router?: boolean;
};
type PluginReactOptions = {
    /**
     * Configure the behavior of SWC to transform React code,
     * the same as SWC's [jsc.transform.react](https://swc.rs/docs/configuration/compilation#jsctransformreact).
     */
    swcReactOptions?: Rspack.SwcLoaderTransformConfig['react'];
    /**
     * Configuration for chunk splitting of React-related dependencies.
     */
    splitChunks?: SplitReactChunkOptions;
    /**
     * When set to `true`, enables the React Profiler for performance analysis in production builds.
     * @default false
     */
    enableProfiler?: boolean;
    /**
     * Options passed to `@rspack/plugin-react-refresh`
     * @see https://rspack.dev/guide/tech/react#rspackplugin-react-refresh
     */
    reactRefreshOptions?: PluginOptions;
};
declare const PLUGIN_REACT_NAME = "rsbuild:react";
declare const pluginReact: ({ enableProfiler, ...options }?: PluginReactOptions) => RsbuildPlugin;

export { PLUGIN_REACT_NAME, type PluginReactOptions, type SplitReactChunkOptions, pluginReact };
