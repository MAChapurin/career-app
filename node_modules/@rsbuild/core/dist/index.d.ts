/**
 * The methods and types exported from this file are considered as
 * the public API of @rsbuild/core.
 */
import { rspack } from '@rspack/core';
import type * as Rspack from '@rspack/core';
export { loadEnv } from './loadEnv';
export { createRsbuild } from './createRsbuild';
export { loadConfig, defineConfig } from './config';
export declare const version: any;
export { rspack };
export type { Rspack };
export { logger } from '@rsbuild/shared';
export { mergeRsbuildConfig } from './mergeConfig';
export { PLUGIN_SWC_NAME, PLUGIN_CSS_NAME, PLUGIN_SASS_NAME, PLUGIN_LESS_NAME, PLUGIN_STYLUS_NAME, } from './constants';
export type { RsbuildConfig, DevConfig, HtmlConfig, ToolsConfig, SourceConfig, ServerConfig, OutputConfig, SecurityConfig, PerformanceConfig, ModuleFederationConfig, NormalizedConfig, NormalizedDevConfig, NormalizedHtmlConfig, NormalizedToolsConfig, NormalizedSourceConfig, NormalizedServerConfig, NormalizedOutputConfig, NormalizedSecurityConfig, NormalizedPerformanceConfig, NormalizedModuleFederationConfig, RsbuildPlugin, RsbuildPlugins, RsbuildPluginAPI, } from './types';
export type { RsbuildMode, RsbuildEntry, RsbuildTarget, RsbuildContext, RsbuildInstance, CreateRsbuildOptions, InspectConfigOptions, OnExitFn, OnAfterBuildFn, OnAfterCreateCompilerFn, OnAfterStartDevServerFn, OnAfterStartProdServerFn, OnBeforeBuildFn, OnBeforeStartDevServerFn, OnBeforeStartProdServerFn, OnBeforeCreateCompilerFn, OnCloseDevServerFn, OnDevCompileDoneFn, ModifyBundlerChainFn, ModifyRspackConfigFn, ModifyRsbuildConfigFn, TransformFn, TransformHandler, } from '@rsbuild/shared';
