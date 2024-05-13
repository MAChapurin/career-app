export type Compiler = any;
export type CodeValue = any;
/** @typedef {any} Compiler */
/** @typedef {any} CodeValue */
export class EnvironmentPlugin {
    constructor(...keys: any[]);
    keys: any[];
    defaultValues: any;
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler: Compiler): void;
}
