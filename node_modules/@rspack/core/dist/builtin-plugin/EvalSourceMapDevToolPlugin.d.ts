import { BuiltinPluginName, RawSourceMapDevToolPluginOptions } from "@rspack/binding";
import { SourceMapDevToolPluginOptions } from "./SourceMapDevToolPlugin";
export declare const EvalSourceMapDevToolPlugin: {
    new (options: SourceMapDevToolPluginOptions): {
        name: BuiltinPluginName;
        _options: RawSourceMapDevToolPluginOptions;
        affectedHooks: "done" | "compilation" | "make" | "compile" | "emit" | "afterEmit" | "invalid" | "thisCompilation" | "afterDone" | "normalModuleFactory" | "contextModuleFactory" | "initialize" | "shouldEmit" | "infrastructureLog" | "beforeRun" | "run" | "assetEmitted" | "failed" | "shutdown" | "watchRun" | "watchClose" | "environment" | "afterEnvironment" | "afterPlugins" | "afterResolvers" | "beforeCompile" | "afterCompile" | "finishMake" | "entryOption" | undefined;
        raw(): import("@rspack/binding").BuiltinPlugin;
        apply(compiler: import("../Compiler").Compiler): void;
    };
};
