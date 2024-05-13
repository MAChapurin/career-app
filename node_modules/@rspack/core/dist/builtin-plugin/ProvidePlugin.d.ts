import { BuiltinPluginName } from "@rspack/binding";
export type ProvidePluginOptions = Record<string, string | string[]>;
export declare const ProvidePlugin: {
    new (provide: ProvidePluginOptions): {
        name: BuiltinPluginName;
        _options: Record<string, string[]>;
        affectedHooks: "done" | "compilation" | "make" | "compile" | "emit" | "afterEmit" | "invalid" | "thisCompilation" | "afterDone" | "normalModuleFactory" | "contextModuleFactory" | "initialize" | "shouldEmit" | "infrastructureLog" | "beforeRun" | "run" | "assetEmitted" | "failed" | "shutdown" | "watchRun" | "watchClose" | "environment" | "afterEnvironment" | "afterPlugins" | "afterResolvers" | "beforeCompile" | "afterCompile" | "finishMake" | "entryOption" | undefined;
        raw(): import("@rspack/binding").BuiltinPlugin;
        apply(compiler: import("../Compiler").Compiler): void;
    };
};
