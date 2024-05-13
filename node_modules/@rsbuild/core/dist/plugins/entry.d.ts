import { type RsbuildEntry, type RsbuildTarget } from '@rsbuild/shared';
import type { NormalizedConfig, RsbuildConfig, RsbuildPlugin } from '../types';
export declare function getEntryObject(config: RsbuildConfig | NormalizedConfig, target: RsbuildTarget): RsbuildEntry;
export declare const pluginEntry: () => RsbuildPlugin;
