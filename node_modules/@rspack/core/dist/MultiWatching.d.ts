/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/blob/4b4ca3b/lib/MultiWatching.js
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
import { MultiCompiler } from "./MultiCompiler";
import { Watching } from "./Watching";
declare class MultiWatching {
    watchings: Watching[];
    compiler: MultiCompiler;
    /**
     * @param watchings - child compilers' watchers
     * @param compiler - the compiler
     */
    constructor(watchings: Watching[], compiler: MultiCompiler);
    invalidate(callback: any): void;
    /**
     * @param {Callback<void>} callback signals when the watcher is closed
     * @returns {void}
     */
    close(callback: any): void;
    suspend(): void;
    resume(): void;
}
export default MultiWatching;
