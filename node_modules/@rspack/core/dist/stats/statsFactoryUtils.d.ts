import * as binding from "@rspack/binding";
import { type Comparator } from "../util/comparators";
import type { Compilation } from "../Compilation";
import type { StatsOptions } from "../config";
import type { StatsFactory, StatsFactoryContext } from "./StatsFactory";
export type KnownStatsChunkGroup = binding.JsStatsChunkGroup;
export type KnownStatsChunk = binding.JsStatsChunk;
export type StatsChunkGroup = binding.JsStatsChunkGroup & Record<string, any>;
export type KnownStatsAsset = binding.JsStatsAsset;
export type StatsAsset = KnownStatsAsset & Record<string, any>;
export type StatsChunk = KnownStatsChunk & Record<string, any>;
export type KnownStatsModule = Omit<binding.JsStatsModule, "usedExports" | "providedExports" | "optimizationBailout"> & {
    profile?: StatsProfile;
    usedExports?: null | string[] | boolean;
    providedExports?: null | string[];
    optimizationBailout?: null | string[];
};
export type StatsProfile = KnownStatsProfile & Record<string, any>;
export type KnownStatsProfile = {
    total: number;
    resolving: number;
    integration: number;
    building: number;
};
export type StatsModule = KnownStatsModule & Record<string, any>;
export type StatsModuleIssuer = binding.JsStatsModuleIssuer & Record<string, any>;
export type StatsError = binding.JsStatsError & Record<string, any>;
export type StatsWarnings = binding.JsStatsWarning & Record<string, any>;
export type StatsModuleReason = binding.JsStatsModuleReason & Record<string, any>;
export type KnownStatsCompilation = {
    /**
     * webpack version.
     * this is a hack to be compatible with plugin which detect webpack's version
     */
    version?: string;
    /** rspack version */
    rspackVersion?: string;
    name?: string;
    hash?: string;
    time?: number;
    builtAt?: number;
    publicPath?: string;
    outputPath?: string;
    assets?: StatsAsset[];
    assetsByChunkName?: Record<string, string[]>;
    chunks?: StatsChunk[];
    modules?: StatsModule[];
    entrypoints?: Record<string, StatsChunkGroup>;
    namedChunkGroups?: Record<string, StatsChunkGroup>;
    errors?: StatsError[];
    errorsCount?: number;
    warnings?: StatsWarnings[];
    warningsCount?: number;
    filteredModules?: number;
    children?: StatsCompilation[];
    logging?: Record<string, StatsLogging>;
};
export type StatsCompilation = KnownStatsCompilation & Record<string, any>;
export type StatsLogging = KnownStatsLogging & Record<string, any>;
export type KnownStatsLogging = {
    entries: StatsLoggingEntry[];
    filteredEntries: number;
    debug: boolean;
};
export type StatsLoggingEntry = KnownStatsLoggingEntry & Record<string, any>;
export type KnownStatsLoggingEntry = {
    type: string;
    message: string;
    trace?: string[] | undefined;
    children?: StatsLoggingEntry[] | undefined;
    args?: any[] | undefined;
    time?: number | undefined;
};
export type KnownStatsChunkOrigin = {
    module?: string | undefined;
    moduleIdentifier?: string | undefined;
    moduleName?: string | undefined;
    loc?: string | undefined;
    request?: string | undefined;
    moduleId?: (string | number) | undefined;
};
type ExtractorsByOption<T, O> = {
    [x: string]: (object: O, data: T, context: StatsFactoryContext, options: any, factory: StatsFactory) => void;
};
type PreprocessedAsset = StatsAsset & {
    type: string;
    related: PreprocessedAsset[];
};
export type SimpleExtractors = {
    compilation: ExtractorsByOption<Compilation, StatsCompilation>;
    asset$visible: ExtractorsByOption<PreprocessedAsset, StatsAsset>;
    asset: ExtractorsByOption<PreprocessedAsset, StatsAsset>;
    module: ExtractorsByOption<binding.JsStatsModule, StatsModule>;
    module$visible: ExtractorsByOption<binding.JsStatsModule, StatsModule>;
    moduleIssuer: ExtractorsByOption<binding.JsStatsModuleIssuer, StatsModuleIssuer>;
    profile: ExtractorsByOption<binding.JsStatsModuleProfile, StatsProfile>;
    moduleReason: ExtractorsByOption<binding.JsStatsModuleReason, StatsModuleReason>;
    chunk: ExtractorsByOption<StatsChunk, KnownStatsChunk>;
};
type KnownNormalizedStatsOptions = {
    context: string;
};
export type NormalizedStatsOptions = KnownNormalizedStatsOptions & Omit<StatsOptions, keyof KnownNormalizedStatsOptions> & Record<string, any>;
export declare const uniqueArray: <T, I>(items: Iterable<T>, selector: (arg: T) => Iterable<I>) => I[];
export declare const uniqueOrderedArray: <T, I>(items: Iterable<T>, selector: (arg: T) => Iterable<I>, comparator: Comparator) => I[];
export declare const iterateConfig: (config: Record<string, Record<string, Function>>, options: NormalizedStatsOptions, fn: (a1: string, a2: Function) => void) => void;
type Child = {
    children?: ItemChildren;
    filteredChildren?: number;
};
type ItemChildren = Child[];
export declare const getTotalItems: (children: ItemChildren) => number;
export declare const collapse: (children: ItemChildren) => Child[];
export declare const spaceLimited: (itemsAndGroups: ItemChildren, max: number, filteredChildrenLineReserved?: boolean) => {
    children: any;
    filteredChildren: any;
};
export declare const countWithChildren: (compilation: Compilation, getItems: (compilation: Compilation, key: string) => any[]) => number;
export declare const sortByField: (field: string) => (a1: Object, a2: Object) => number;
export declare const assetGroup: (children: StatsAsset[]) => {
    size: number;
};
export declare const moduleGroup: (children: KnownStatsModule[]) => {
    size: number;
    sizes: {};
};
export declare const mergeToObject: (items: {
    [key: string]: any;
    name: string;
}[]) => Object;
export declare function resolveStatsMillisecond(s: binding.JsStatsMillisecond): number;
export {};
