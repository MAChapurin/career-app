export = WebpackError;
/** @typedef {any} Chunk */
/** @typedef {any} DependencyLocation */
/** @typedef {any} Module */
declare class WebpackError extends Error {
    details: any;
    /** @type {Module} */
    module: Module;
    /** @type {DependencyLocation} */
    loc: DependencyLocation;
    /** @type {boolean} */
    hideStack: boolean;
    /** @type {Chunk} */
    chunk: Chunk;
    /** @type {string} */
    file: string;
}
declare namespace WebpackError {
    export { Chunk, DependencyLocation, Module };
}
type Module = any;
type DependencyLocation = any;
type Chunk = any;
