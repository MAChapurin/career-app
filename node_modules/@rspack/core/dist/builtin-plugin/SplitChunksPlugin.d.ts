import { type OptimizationSplitChunksOptions } from "../config/zod";
import { RspackBuiltinPlugin } from "./base";
import { Compiler } from "../Compiler";
import { BuiltinPlugin, BuiltinPluginName } from "@rspack/binding";
export declare class SplitChunksPlugin extends RspackBuiltinPlugin {
    private options;
    name: BuiltinPluginName;
    affectedHooks: "thisCompilation";
    constructor(options: OptimizationSplitChunksOptions);
    raw(compiler: Compiler): BuiltinPlugin;
}
