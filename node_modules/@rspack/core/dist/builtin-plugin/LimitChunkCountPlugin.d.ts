import { BuiltinPluginName, RawLimitChunkCountPluginOptions } from "@rspack/binding";
export type LimitChunkCountOptions = {
    chunkOverhead?: number;
    entryChunkMultiplicator?: number;
    maxChunks: number;
};
export declare const LimitChunkCountPlugin: {
    new (options: LimitChunkCountOptions): {
        name: BuiltinPluginName;
        _options: RawLimitChunkCountPluginOptions;
        affectedHooks: "done" | "compilation" | "make" | "compile" | "emit" | "afterEmit" | "invalid" | "thisCompilation" | "afterDone" | "normalModuleFactory" | "contextModuleFactory" | "initialize" | "shouldEmit" | "infrastructureLog" | "beforeRun" | "run" | "assetEmitted" | "failed" | "shutdown" | "watchRun" | "watchClose" | "environment" | "afterEnvironment" | "afterPlugins" | "afterResolvers" | "beforeCompile" | "afterCompile" | "finishMake" | "entryOption" | undefined;
        raw(): import("@rspack/binding").BuiltinPlugin;
        apply(compiler: import("../Compiler").Compiler): void;
    };
};
