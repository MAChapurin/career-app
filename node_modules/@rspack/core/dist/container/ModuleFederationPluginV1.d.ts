import { Compiler } from "../Compiler";
import { LibraryOptions, EntryRuntime, ExternalsType } from "../config";
import { Shared } from "../sharing/SharePlugin";
import { Exposes } from "./ContainerPlugin";
import { Remotes } from "./ContainerReferencePlugin";
export interface ModuleFederationPluginV1Options {
    exposes?: Exposes;
    filename?: string;
    library?: LibraryOptions;
    name: string;
    remoteType?: ExternalsType;
    remotes?: Remotes;
    runtime?: EntryRuntime;
    shareScope?: string;
    shared?: Shared;
    enhanced?: boolean;
}
export declare class ModuleFederationPluginV1 {
    private _options;
    constructor(_options: ModuleFederationPluginV1Options);
    apply(compiler: Compiler): void;
}
