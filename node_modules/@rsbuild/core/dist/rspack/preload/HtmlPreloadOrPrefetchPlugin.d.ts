/**
 * @license
 * Copyright 2018 Google Inc.
 * https://github.com/vuejs/preload-webpack-plugin/blob/master/src/index.js
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { type PreloadOrPreFetchOption } from '@rsbuild/shared';
import type { Compiler, RspackPluginInstance } from '@rspack/core';
import type HtmlWebpackPlugin from 'html-webpack-plugin';
type LinkType = 'preload' | 'prefetch';
export declare class HtmlPreloadOrPrefetchPlugin implements RspackPluginInstance {
    readonly options: PreloadOrPreFetchOption;
    resourceHints: HtmlWebpackPlugin.HtmlTagObject[];
    type: LinkType;
    HTMLCount: number;
    constructor(options: true | PreloadOrPreFetchOption, type: LinkType, HTMLCount: number);
    apply(compiler: Compiler): void;
}
export {};
