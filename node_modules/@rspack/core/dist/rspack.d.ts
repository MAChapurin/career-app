/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/blob/4b4ca3b/lib
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
import { RspackOptions } from "./config";
import { Compiler } from "./Compiler";
import { Stats } from "./Stats";
import { MultiCompiler, MultiRspackOptions } from "./MultiCompiler";
import { Callback } from "tapable";
import MultiStats from "./MultiStats";
declare function createMultiCompiler(options: MultiRspackOptions): MultiCompiler;
declare function createCompiler(userOptions: RspackOptions): Compiler;
declare function rspack(options: MultiRspackOptions): MultiCompiler;
declare function rspack(options: RspackOptions): Compiler;
declare function rspack(options: MultiRspackOptions | RspackOptions): MultiCompiler | Compiler;
declare function rspack(options: MultiRspackOptions, callback?: Callback<Error, MultiStats>): null | MultiCompiler;
declare function rspack(options: RspackOptions, callback?: Callback<Error, Stats>): null | Compiler;
declare function rspack(options: MultiRspackOptions | RspackOptions, callback?: Callback<Error, MultiStats | Stats>): null | MultiCompiler | Compiler;
export { rspack, createCompiler, createMultiCompiler, Stats, MultiStats };
export default rspack;
