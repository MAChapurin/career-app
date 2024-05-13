import { BuiltinPlugin, BuiltinPluginName } from "@rspack/binding";
import { RspackBuiltinPlugin } from "./base";
import { Compiler, LibraryType } from "..";
export declare class EnableLibraryPlugin extends RspackBuiltinPlugin {
    private type;
    name: BuiltinPluginName;
    constructor(type: LibraryType);
    static setEnabled(compiler: Compiler, type: LibraryType): void;
    static checkEnabled(compiler: Compiler, type: LibraryType): void;
    raw(compiler: Compiler): BuiltinPlugin | undefined;
}
