import { BuiltinPluginName, RawBundlerInfoPluginOptions } from "@rspack/binding";
export type BundleInfoOptions = {
    version?: string;
    force?: boolean | string[];
};
export declare const BundlerInfoRspackPlugin: {
    new (options: BundleInfoOptions): {
        name: BuiltinPluginName;
        _options: RawBundlerInfoPluginOptions;
        affectedHooks: "done" | "compilation" | "make" | "compile" | "emit" | "afterEmit" | "invalid" | "thisCompilation" | "afterDone" | "normalModuleFactory" | "contextModuleFactory" | "initialize" | "shouldEmit" | "infrastructureLog" | "beforeRun" | "run" | "assetEmitted" | "failed" | "shutdown" | "watchRun" | "watchClose" | "environment" | "afterEnvironment" | "afterPlugins" | "afterResolvers" | "beforeCompile" | "afterCompile" | "finishMake" | "entryOption" | undefined;
        raw(): import("@rspack/binding").BuiltinPlugin;
        apply(compiler: import("../Compiler").Compiler): void;
    };
};
