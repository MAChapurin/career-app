import * as liteTapable from "./lite-tapable";
import { ResolveData } from "./Module";
export declare class ContextModuleFactory {
    hooks: {
        beforeResolve: liteTapable.AsyncSeriesBailHook<[ResolveData], false | void>;
        afterResolve: liteTapable.AsyncSeriesBailHook<[ResolveData], false | void>;
    };
    constructor();
}
