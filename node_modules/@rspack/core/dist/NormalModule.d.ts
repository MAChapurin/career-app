/// <reference types="node" />
import { AsyncSeriesBailHook, HookMap, SyncHook } from "tapable";
import { Compilation } from "./Compilation";
import { LoaderContext } from "./config";
export declare class NormalModule {
    constructor();
    static getCompilationHooks(compilation: Compilation): {
        loader: SyncHook<[LoaderContext<{}>], void, import("tapable").UnsetAdditionalOptions>;
        readResourceForScheme: any;
        readResource: HookMap<AsyncSeriesBailHook<[LoaderContext<{}>], string | Buffer, import("tapable").UnsetAdditionalOptions>>;
    };
}
