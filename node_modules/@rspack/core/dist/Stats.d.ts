import { Compilation, FilterItemTypes } from ".";
import { StatsValue, StatsOptions } from "./config";
import type { StatsCompilation } from "./stats/statsFactoryUtils";
export type { StatsCompilation, StatsAsset, StatsChunk, StatsModule, StatsError, StatsWarnings } from "./stats/statsFactoryUtils";
export declare class Stats {
    #private;
    compilation: Compilation;
    constructor(compilation: Compilation);
    get hash(): string | null;
    hasErrors(): boolean;
    hasWarnings(): boolean;
    toJson(opts?: StatsValue, forToString?: boolean): StatsCompilation;
    toString(opts?: StatsValue): string;
}
export declare function normalizeStatsPreset(options?: StatsValue): StatsOptions;
export declare const normalizeFilter: (item: FilterItemTypes) => (args_0: string, ...args_1: unknown[]) => boolean;
export declare const optionsOrFallback: (...args: any) => any;
