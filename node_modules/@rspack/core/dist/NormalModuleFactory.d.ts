import * as liteTapable from "./lite-tapable";
import type * as binding from "@rspack/binding";
import { ResolveData, ResourceDataWithData } from "./Module";
export type NormalModuleCreateData = binding.JsNormalModuleFactoryCreateModuleArgs & {
    settings: {};
};
export declare class NormalModuleFactory {
    hooks: {
        resolveForScheme: liteTapable.HookMap<liteTapable.AsyncSeriesBailHook<[ResourceDataWithData], true | void>>;
        beforeResolve: liteTapable.AsyncSeriesBailHook<[ResolveData], false | void>;
        afterResolve: liteTapable.AsyncSeriesBailHook<[ResolveData], false | void>;
        createModule: liteTapable.AsyncSeriesBailHook<[
            NormalModuleCreateData,
            {}
        ], void>;
    };
    constructor();
}
