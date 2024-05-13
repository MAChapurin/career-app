export type Compiler = any;
/** @typedef {any} Compiler */
export class LoaderTargetPlugin {
    /**
     * @param {string} target the target
     */
    constructor(target: string);
    target: string;
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler: Compiler): void;
}
