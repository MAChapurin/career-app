"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalModuleFactory = void 0;
const liteTapable = __importStar(require("./lite-tapable"));
class NormalModuleFactory {
    constructor() {
        this.hooks = {
            // /** @type {AsyncSeriesBailHook<[ResolveData], Module | false | void>} */
            // resolve: new AsyncSeriesBailHook(["resolveData"]),
            // /** @type {HookMap<AsyncSeriesBailHook<[ResourceDataWithData, ResolveData], true | void>>} */
            resolveForScheme: new liteTapable.HookMap(() => new liteTapable.AsyncSeriesBailHook(["resourceData"])),
            // /** @type {HookMap<AsyncSeriesBailHook<[ResourceDataWithData, ResolveData], true | void>>} */
            // resolveInScheme: new HookMap(
            // 	() => new AsyncSeriesBailHook(["resourceData", "resolveData"])
            // ),
            // /** @type {AsyncSeriesBailHook<[ResolveData], Module>} */
            // factorize: new AsyncSeriesBailHook(["resolveData"]),
            // /** @type {AsyncSeriesBailHook<[ResolveData], false | void>} */
            beforeResolve: new liteTapable.AsyncSeriesBailHook(["resolveData"]),
            // /** @type {AsyncSeriesBailHook<[ResolveData], false | void>} */
            afterResolve: new liteTapable.AsyncSeriesBailHook(["resolveData"]),
            // /** @type {AsyncSeriesBailHook<[ResolveData["createData"], ResolveData], Module | void>} */
            createModule: new liteTapable.AsyncSeriesBailHook([
                "createData",
                "resolveData"
            ])
            // /** @type {SyncWaterfallHook<[Module, ResolveData["createData"], ResolveData], Module>} */
            // module: new SyncWaterfallHook(["module", "createData", "resolveData"]),
            // createParser: new HookMap(() => new SyncBailHook(["parserOptions"])),
            // parser: new HookMap(() => new SyncHook(["parser", "parserOptions"])),
            // createGenerator: new HookMap(
            // 	() => new SyncBailHook(["generatorOptions"])
            // ),
            // generator: new HookMap(
            // 	() => new SyncHook(["generator", "generatorOptions"])
            // )
        };
    }
}
exports.NormalModuleFactory = NormalModuleFactory;
