import { BuiltinPluginName } from "@rspack/binding";
import { Compiler } from "../Compiler";
export declare const JsLoaderRspackPlugin: {
    new (compiler: Compiler): {
        name: BuiltinPluginName;
        _options: (rawContext: import("@rspack/binding").JsLoaderContext) => Promise<import("@rspack/binding").JsLoaderResult>;
        affectedHooks: "done" | "compilation" | "make" | "compile" | "emit" | "afterEmit" | "invalid" | "thisCompilation" | "afterDone" | "normalModuleFactory" | "contextModuleFactory" | "initialize" | "shouldEmit" | "infrastructureLog" | "beforeRun" | "run" | "assetEmitted" | "failed" | "shutdown" | "watchRun" | "watchClose" | "environment" | "afterEnvironment" | "afterPlugins" | "afterResolvers" | "beforeCompile" | "afterCompile" | "finishMake" | "entryOption" | undefined;
        raw(): import("@rspack/binding").BuiltinPlugin;
        apply(compiler: Compiler): void;
    };
};
