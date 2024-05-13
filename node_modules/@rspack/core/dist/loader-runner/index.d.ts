/**
 * The following code is modified based on
 * https://github.com/webpack/loader-runner
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/loader-runner/blob/main/LICENSE
 */
import type { JsLoaderContext, JsLoaderResult } from "@rspack/binding";
import { Compiler } from "../Compiler";
export declare function parsePathQueryFragment(str: string): {
    path: string;
    query: string;
    fragment: string;
};
export declare function runLoaders(compiler: Compiler, rawContext: JsLoaderContext): Promise<JsLoaderResult>;
