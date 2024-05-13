/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/blob/4b4ca3b/lib/MultiCompiler.js
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
import { Compiler, RspackOptions } from ".";
import ResolverFactory = require("./ResolverFactory");
import { WatchFileSystem } from "./util/fs";
import { Watching } from "./Watching";
import { AsyncSeriesHook, Callback, MultiHook, SyncHook } from "tapable";
import MultiStats from "./MultiStats";
import MultiWatching from "./MultiWatching";
import { WatchOptions } from "./config";
type Any = any;
export interface MultiCompilerOptions {
    /**
     * how many Compilers are allows to run at the same time in parallel
     */
    parallelism?: number;
}
export type MultiRspackOptions = ReadonlyArray<RspackOptions> & MultiCompilerOptions;
export declare class MultiCompiler {
    #private;
    context: string;
    compilers: Compiler[];
    dependencies: WeakMap<Compiler, string[]>;
    hooks: {
        done: SyncHook<MultiStats>;
        invalid: MultiHook<SyncHook<[string | null, number]>>;
        run: MultiHook<AsyncSeriesHook<[Compiler]>>;
        watchClose: SyncHook<Any>;
        watchRun: MultiHook<Any>;
        infrastructureLog: MultiHook<Any>;
    };
    name: string;
    infrastructureLogger: Any;
    _options: {
        parallelism?: number;
    };
    root: Compiler;
    resolverFactory: ResolverFactory;
    running: boolean;
    watching: Watching;
    watchMode: boolean;
    constructor(compilers: Compiler[] | Record<string, Compiler>, options?: MultiCompilerOptions);
    get options(): import(".").RspackOptionsNormalized[] & {
        parallelism?: number | undefined;
    };
    get outputPath(): string;
    get inputFileSystem(): void;
    get outputFileSystem(): typeof import("fs");
    get watchFileSystem(): WatchFileSystem;
    get intermediateFileSystem(): any;
    set inputFileSystem(value: void);
    set outputFileSystem(value: typeof import("fs"));
    set watchFileSystem(value: WatchFileSystem);
    set intermediateFileSystem(value: any);
    getInfrastructureLogger(name: string): import("./logging/Logger").Logger;
    /**
     * @param compiler - the child compiler
     * @param dependencies - its dependencies
     */
    setDependencies(compiler: Compiler, dependencies: string[]): void;
    /**
     * @param callback - signals when the validation is complete
     * @returns true if the dependencies are valid
     */
    validateDependencies(callback: Callback<Error, MultiStats>): boolean;
    /**
     * @param watchOptions - the watcher's options
     * @param handler - signals when the call finishes
     * @returns a compiler watcher
     */
    watch(watchOptions: WatchOptions, handler: Callback<Error, MultiStats>): MultiWatching;
    run(callback: Callback<Error, MultiStats>): void;
    purgeInputFileSystem(): void;
    close(callback: Callback<Error, void>): void;
}
export {};
