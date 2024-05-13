import { BuiltinPluginName, RawProgressPluginOptions } from "@rspack/binding";
export type ProgressPluginArgument = Partial<RawProgressPluginOptions> | undefined;
export declare const ProgressPlugin: {
    new (progress?: ProgressPluginArgument): {
        name: BuiltinPluginName;
        _options: RawProgressPluginOptions;
        affectedHooks: "done" | "compilation" | "make" | "compile" | "emit" | "afterEmit" | "invalid" | "thisCompilation" | "afterDone" | "normalModuleFactory" | "contextModuleFactory" | "initialize" | "shouldEmit" | "infrastructureLog" | "beforeRun" | "run" | "assetEmitted" | "failed" | "shutdown" | "watchRun" | "watchClose" | "environment" | "afterEnvironment" | "afterPlugins" | "afterResolvers" | "beforeCompile" | "afterCompile" | "finishMake" | "entryOption" | undefined;
        raw(): import("@rspack/binding").BuiltinPlugin;
        apply(compiler: import("../Compiler").Compiler): void;
    };
};
