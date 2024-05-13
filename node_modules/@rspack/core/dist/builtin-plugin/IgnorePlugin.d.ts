import { BuiltinPluginName, RawIgnorePluginOptions } from "@rspack/binding";
export type IgnorePluginOptions = {
    resourceRegExp: NonNullable<RawIgnorePluginOptions["resourceRegExp"]>;
    contextRegExp?: RawIgnorePluginOptions["contextRegExp"];
} | {
    checkResource: NonNullable<RawIgnorePluginOptions["checkResource"]>;
};
export declare const IgnorePlugin: {
    new (options: IgnorePluginOptions): {
        name: BuiltinPluginName;
        _options: RawIgnorePluginOptions;
        affectedHooks: "done" | "compilation" | "make" | "compile" | "emit" | "afterEmit" | "invalid" | "thisCompilation" | "afterDone" | "normalModuleFactory" | "contextModuleFactory" | "initialize" | "shouldEmit" | "infrastructureLog" | "beforeRun" | "run" | "assetEmitted" | "failed" | "shutdown" | "watchRun" | "watchClose" | "environment" | "afterEnvironment" | "afterPlugins" | "afterResolvers" | "beforeCompile" | "afterCompile" | "finishMake" | "entryOption" | undefined;
        raw(): import("@rspack/binding").BuiltinPlugin;
        apply(compiler: import("../Compiler").Compiler): void;
    };
};
