import { BuiltinPluginName, RawHttpExternalsRspackPluginOptions } from "@rspack/binding";
export declare const HttpExternalsRspackPlugin: {
    new (css: boolean, webAsync: boolean): {
        name: BuiltinPluginName;
        _options: RawHttpExternalsRspackPluginOptions;
        affectedHooks: "done" | "compilation" | "make" | "compile" | "emit" | "afterEmit" | "invalid" | "thisCompilation" | "afterDone" | "normalModuleFactory" | "contextModuleFactory" | "initialize" | "shouldEmit" | "infrastructureLog" | "beforeRun" | "run" | "assetEmitted" | "failed" | "shutdown" | "watchRun" | "watchClose" | "environment" | "afterEnvironment" | "afterPlugins" | "afterResolvers" | "beforeCompile" | "afterCompile" | "finishMake" | "entryOption" | undefined;
        raw(): import("@rspack/binding").BuiltinPlugin;
        apply(compiler: import("../Compiler").Compiler): void;
    };
};
