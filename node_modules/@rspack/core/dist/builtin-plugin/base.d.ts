import * as binding from "@rspack/binding";
import { Compiler, RspackPluginInstance } from "..";
type AffectedHooks = keyof Compiler["hooks"];
export declare const HOOKS_CAN_NOT_INHERENT_FROM_PARENT: string[];
export declare function canInherentFromParent(affectedHooks?: AffectedHooks): boolean;
export declare abstract class RspackBuiltinPlugin implements RspackPluginInstance {
    abstract raw(compiler: Compiler): binding.BuiltinPlugin | undefined;
    abstract name: binding.BuiltinPluginName;
    affectedHooks?: AffectedHooks;
    apply(compiler: Compiler): void;
}
export declare function createBuiltinPlugin<R>(name: binding.BuiltinPluginName, options: R): binding.BuiltinPlugin;
export declare function create<T extends any[], R>(name: binding.BuiltinPluginName, resolve: (...args: T) => R, affectedHooks?: AffectedHooks): {
    new (...args: T): {
        name: binding.BuiltinPluginName;
        _options: R;
        affectedHooks: "done" | "compilation" | "make" | "compile" | "emit" | "afterEmit" | "invalid" | "thisCompilation" | "afterDone" | "normalModuleFactory" | "contextModuleFactory" | "initialize" | "shouldEmit" | "infrastructureLog" | "beforeRun" | "run" | "assetEmitted" | "failed" | "shutdown" | "watchRun" | "watchClose" | "environment" | "afterEnvironment" | "afterPlugins" | "afterResolvers" | "beforeCompile" | "afterCompile" | "finishMake" | "entryOption" | undefined;
        raw(): binding.BuiltinPlugin;
        apply(compiler: Compiler): void;
    };
};
export {};
