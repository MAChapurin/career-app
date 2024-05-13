export type Compiler = import("../Compiler").Compiler;
export type LoaderOptionsPluginOptions = any;
/** @typedef {import("../Compiler").Compiler} Compiler */
/** @typedef {any} LoaderOptionsPluginOptions */
export class LoaderOptionsPlugin {
    /**
     * @param {LoaderOptionsPluginOptions} options options object
     */
    constructor(options?: LoaderOptionsPluginOptions);
    options: any;
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler: Compiler): void;
}
