import type { Compiler } from "@rspack/core";
import { type PluginOptions } from "./options";
export type { PluginOptions };
/**
 * @typedef {Object} Options
 * @property {(string | RegExp | (string | RegExp)[] | null)=} include included resourcePath for loader
 * @property {(string | RegExp | (string | RegExp)[] | null)=} exclude excluded resourcePath for loader
 */
declare class ReactRefreshRspackPlugin {
    options: PluginOptions;
    static deprecated_runtimePaths: string[];
    constructor(options?: PluginOptions);
    apply(compiler: Compiler): void;
}
export = ReactRefreshRspackPlugin;
