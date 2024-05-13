/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/blob/4b4ca3b/lib/EntryOptionPlugin.js
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
import { Compiler, EntryDescriptionNormalized, EntryNormalized } from "..";
import { EntryOptions } from "../builtin-plugin";
export default class EntryOptionPlugin {
    apply(compiler: Compiler): void;
    static applyEntryOption(compiler: Compiler, context: string, entry: EntryNormalized): void;
    static entryDescriptionToOptions(compiler: Compiler, name: string, desc: EntryDescriptionNormalized): EntryOptions;
}
