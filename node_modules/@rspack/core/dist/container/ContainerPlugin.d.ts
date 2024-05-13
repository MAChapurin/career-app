import { BuiltinPlugin, BuiltinPluginName } from "@rspack/binding";
import { RspackBuiltinPlugin } from "../builtin-plugin/base";
import { EntryRuntime, FilenameTemplate, LibraryOptions } from "../config";
import { Compiler } from "../Compiler";
export type ContainerPluginOptions = {
    exposes: Exposes;
    filename?: FilenameTemplate;
    library?: LibraryOptions;
    name: string;
    runtime?: EntryRuntime;
    shareScope?: string;
    enhanced?: boolean;
};
export type Exposes = (ExposesItem | ExposesObject)[] | ExposesObject;
export type ExposesItem = string;
export type ExposesItems = ExposesItem[];
export type ExposesObject = {
    [k: string]: ExposesConfig | ExposesItem | ExposesItems;
};
export type ExposesConfig = {
    import: ExposesItem | ExposesItems;
    name?: string;
};
export declare class ContainerPlugin extends RspackBuiltinPlugin {
    name: BuiltinPluginName;
    _options: {
        name: string;
        shareScope: string;
        library: {
            type: string;
            amdContainer?: string | undefined;
            auxiliaryComment?: string | {
                amd?: string | undefined;
                commonjs?: string | undefined;
                commonjs2?: string | undefined;
                root?: string | undefined;
            } | undefined;
            export?: string | string[] | undefined;
            name?: string | string[] | {
                amd?: string | undefined;
                commonjs?: string | undefined;
                root?: string | string[] | undefined;
            } | undefined;
            umdNamedDefine?: boolean | undefined;
        };
        runtime: string | false | undefined;
        filename: string | undefined;
        exposes: [string, {
            import: string[];
            name: string | undefined;
        }][];
        enhanced: boolean;
    };
    constructor(options: ContainerPluginOptions);
    raw(compiler: Compiler): BuiltinPlugin;
}
