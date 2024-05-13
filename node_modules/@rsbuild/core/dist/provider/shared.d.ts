import { type MultiStats, type Stats, type StatsError, isMultiCompiler } from '@rsbuild/shared';
import type { StatsCompilation, StatsValue } from '@rspack/core';
export declare const rspackMinVersion = "0.6.2";
export declare const isSatisfyRspackVersion: (originalVersion: string) => Promise<boolean>;
export declare const getCompiledPath: (packageName: string) => string;
export declare const BUILTIN_LOADER = "builtin:";
export declare const getAllStatsErrors: (statsData: StatsCompilation) => StatsError[] | undefined;
export declare const getAllStatsWarnings: (statsData: StatsCompilation) => StatsError[] | undefined;
export declare function getStatsOptions(compiler: Parameters<typeof isMultiCompiler>[0]): StatsValue | undefined;
export declare function formatStats(stats: Stats | MultiStats, options?: StatsValue): {
    message: string;
    level: string;
} | {
    message?: undefined;
    level?: undefined;
};
