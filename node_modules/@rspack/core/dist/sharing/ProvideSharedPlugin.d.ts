import { BuiltinPlugin, BuiltinPluginName } from "@rspack/binding";
import { RspackBuiltinPlugin } from "../builtin-plugin/base";
import { Compiler } from "../Compiler";
export type ProvideSharedPluginOptions = {
    provides: Provides;
    shareScope?: string;
    enhanced?: boolean;
};
export type Provides = (ProvidesItem | ProvidesObject)[] | ProvidesObject;
export type ProvidesItem = string;
export type ProvidesObject = {
    [k: string]: ProvidesConfig | ProvidesItem;
};
export type ProvidesConfig = {
    eager?: boolean;
    shareKey: string;
    shareScope?: string;
    version?: false | string;
};
export declare class ProvideSharedPlugin extends RspackBuiltinPlugin {
    name: BuiltinPluginName;
    _options: {
        provides: [string, {
            shareKey: string;
            version: string | false | undefined;
            shareScope: string;
            eager: boolean;
        }][];
        enhanced: boolean;
    };
    constructor(options: ProvideSharedPluginOptions);
    raw(compiler: Compiler): BuiltinPlugin;
}
