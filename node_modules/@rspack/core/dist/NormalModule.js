"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalModule = void 0;
const tapable_1 = require("tapable");
const util_1 = __importDefault(require("util"));
const Compilation_1 = require("./Compilation");
const compilationHooksMap = new WeakMap();
const createFakeHook = (fakeHook, message, code) => {
    if (message && code) {
        fakeHook = deprecateAllProperties(fakeHook, message, code);
    }
    return Object.freeze(Object.assign(fakeHook, { _fakeHook: true }));
};
const deprecateAllProperties = (obj, message, code) => {
    const newObj = {};
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    for (const name of Object.keys(descriptors)) {
        const descriptor = descriptors[name];
        if (typeof descriptor.value === "function") {
            Object.defineProperty(newObj, name, {
                ...descriptor,
                value: util_1.default.deprecate(descriptor.value, message, code)
            });
        }
        else if (descriptor.get || descriptor.set) {
            Object.defineProperty(newObj, name, {
                ...descriptor,
                get: descriptor.get && util_1.default.deprecate(descriptor.get, message, code),
                set: descriptor.set && util_1.default.deprecate(descriptor.set, message, code)
            });
        }
        else {
            let value = descriptor.value;
            Object.defineProperty(newObj, name, {
                configurable: descriptor.configurable,
                enumerable: descriptor.enumerable,
                get: util_1.default.deprecate(() => value, message, code),
                set: descriptor.writable
                    ? util_1.default.deprecate((v) => (value = v), message, code)
                    : undefined
            });
        }
    }
    return newObj;
};
// Actually it is just a NormalModule proxy, used for hooks api alignment
// Maybe we can 1:1 align to webpack NormalModule once we found a better way to reduce communicate overhead between rust and js
class NormalModule {
    constructor() { }
    static getCompilationHooks(compilation) {
        if (!(compilation instanceof Compilation_1.Compilation)) {
            throw new TypeError("The 'compilation' argument must be an instance of Compilation");
        }
        let hooks = compilationHooksMap.get(compilation);
        if (hooks === undefined) {
            hooks = {
                loader: new tapable_1.SyncHook(["loaderContext"]),
                // beforeLoaders: new SyncHook(["loaders", "module", "loaderContext"]),
                // beforeParse: new SyncHook(["module"]),
                // beforeSnapshot: new SyncHook(["module"]),
                // TODO webpack 6 deprecate
                readResourceForScheme: new tapable_1.HookMap(scheme => {
                    const hook = hooks.readResource.for(scheme);
                    return createFakeHook({
                        tap: (options, fn) => hook.tap(options, (loaderContext) => fn(loaderContext.resource)),
                        tapAsync: (options, fn) => hook.tapAsync(options, (loaderContext, callback) => fn(loaderContext.resource, callback)),
                        tapPromise: (options, fn) => hook.tapPromise(options, (loaderContext) => fn(loaderContext.resource))
                    });
                }),
                readResource: new tapable_1.HookMap(() => new tapable_1.AsyncSeriesBailHook(["loaderContext"]))
                // needBuild: new AsyncSeriesBailHook(["module", "context"])
            };
            compilationHooksMap.set(compilation, hooks);
        }
        return hooks;
    }
}
exports.NormalModule = NormalModule;
