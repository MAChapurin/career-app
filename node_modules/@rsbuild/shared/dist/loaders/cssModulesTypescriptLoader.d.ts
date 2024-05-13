/**
 * The following code is modified based on
 * https://github.com/seek-oss/css-modules-typescript-loader
 *
 * only generator .d.ts for css modules file
 *
 * MIT Licensed
 * Author mattcompiles
 * Copyright 2018 SEEK
 * https://github.com/seek-oss/css-modules-typescript-loader/blob/master/LICENSE
 */
import type { LoaderContext } from '@rspack/core';
import { type CssLoaderModules } from '../css';
export declare function wrapQuotes(key: string): string;
export default function (this: LoaderContext<{
    mode: string;
    modules: CssLoaderModules;
}> & {
    cssModuleKeys?: string[];
}, content: string, ...rest: any[]): any;
