import { BuiltinPluginName, RawCopyPattern, RawCopyRspackPluginOptions } from "@rspack/binding";
export type CopyRspackPluginOptions = {
    patterns: (string | ({
        from: string;
    } & Partial<RawCopyPattern>))[];
};
export declare const CopyRspackPlugin: {
    new (copy: CopyRspackPluginOptions): {
        name: BuiltinPluginName;
        _options: RawCopyRspackPluginOptions;
        affectedHooks: "done" | "compilation" | "make" | "compile" | "emit" | "afterEmit" | "invalid" | "thisCompilation" | "afterDone" | "normalModuleFactory" | "contextModuleFactory" | "initialize" | "shouldEmit" | "infrastructureLog" | "beforeRun" | "run" | "assetEmitted" | "failed" | "shutdown" | "watchRun" | "watchClose" | "environment" | "afterEnvironment" | "afterPlugins" | "afterResolvers" | "beforeCompile" | "afterCompile" | "finishMake" | "entryOption" | undefined;
        raw(): import("@rspack/binding").BuiltinPlugin;
        apply(compiler: import("../Compiler").Compiler): void;
    };
};
