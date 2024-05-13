import { type RsbuildTarget } from '@rsbuild/shared';
import type { SwcLoaderOptions } from '@rspack/core';
import type { NormalizedConfig, RsbuildPlugin } from '../../types';
export declare function getDefaultSwcConfig(config: NormalizedConfig, rootPath: string, target: RsbuildTarget): Promise<SwcLoaderOptions>;
/**
 * Provide some swc configs of rspack
 */
export declare const pluginSwc: () => RsbuildPlugin;
export declare function applySwcDecoratorConfig(swcConfig: SwcLoaderOptions, config: NormalizedConfig): void;
