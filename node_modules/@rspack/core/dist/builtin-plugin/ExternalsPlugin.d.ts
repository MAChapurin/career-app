import { BuiltinPluginName, RawExternalsPluginOptions } from "@rspack/binding";
export declare const ExternalsPlugin: {
    new (type: string, externals: string | RegExp | Record<string, string | boolean | string[] | Record<string, string | string[]>> | ((args_0: {
        context?: string | undefined;
        dependencyType?: string | undefined;
        request?: string | undefined;
    }, args_1: (args_0: Error | undefined, args_1: string | boolean | string[] | Record<string, string | string[]> | undefined, args_2: "promise" | "jsonp" | "import" | "amd" | "commonjs" | "commonjs2" | "var" | "module" | "assign" | "this" | "window" | "self" | "global" | "commonjs-module" | "commonjs-static" | "amd-require" | "umd" | "umd2" | "system" | "script" | "node-commonjs" | undefined, ...args_3: unknown[]) => void, ...args_2: unknown[]) => unknown) | ((args_0: {
        context?: string | undefined;
        dependencyType?: string | undefined;
        request?: string | undefined;
    }, ...args_1: unknown[]) => Promise<string | boolean | string[] | Record<string, string | string[]>>) | (string | RegExp | Record<string, string | boolean | string[] | Record<string, string | string[]>> | ((args_0: {
        context?: string | undefined;
        dependencyType?: string | undefined;
        request?: string | undefined;
    }, args_1: (args_0: Error | undefined, args_1: string | boolean | string[] | Record<string, string | string[]> | undefined, args_2: "promise" | "jsonp" | "import" | "amd" | "commonjs" | "commonjs2" | "var" | "module" | "assign" | "this" | "window" | "self" | "global" | "commonjs-module" | "commonjs-static" | "amd-require" | "umd" | "umd2" | "system" | "script" | "node-commonjs" | undefined, ...args_3: unknown[]) => void, ...args_2: unknown[]) => unknown) | ((args_0: {
        context?: string | undefined;
        dependencyType?: string | undefined;
        request?: string | undefined;
    }, ...args_1: unknown[]) => Promise<string | boolean | string[] | Record<string, string | string[]>>))[]): {
        name: BuiltinPluginName;
        _options: RawExternalsPluginOptions;
        affectedHooks: "done" | "compilation" | "make" | "compile" | "emit" | "afterEmit" | "invalid" | "thisCompilation" | "afterDone" | "normalModuleFactory" | "contextModuleFactory" | "initialize" | "shouldEmit" | "infrastructureLog" | "beforeRun" | "run" | "assetEmitted" | "failed" | "shutdown" | "watchRun" | "watchClose" | "environment" | "afterEnvironment" | "afterPlugins" | "afterResolvers" | "beforeCompile" | "afterCompile" | "finishMake" | "entryOption" | undefined;
        raw(): import("@rspack/binding").BuiltinPlugin;
        apply(compiler: import("../Compiler").Compiler): void;
    };
};
