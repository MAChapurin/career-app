"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvideSharedPlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("../builtin-plugin/base");
const options_1 = require("../container/options");
const ShareRuntimePlugin_1 = require("./ShareRuntimePlugin");
class ProvideSharedPlugin extends base_1.RspackBuiltinPlugin {
    constructor(options) {
        var _a;
        super();
        this.name = binding_1.BuiltinPluginName.ProvideSharedPlugin;
        this._options = {
            provides: (0, options_1.parseOptions)(options.provides, item => {
                if (Array.isArray(item))
                    throw new Error("Unexpected array of provides");
                const result = {
                    shareKey: item,
                    version: undefined,
                    shareScope: options.shareScope || "default",
                    eager: false
                };
                return result;
            }, item => ({
                shareKey: item.shareKey,
                version: item.version,
                shareScope: item.shareScope || options.shareScope || "default",
                eager: !!item.eager
            })),
            enhanced: (_a = options.enhanced) !== null && _a !== void 0 ? _a : false
        };
    }
    raw(compiler) {
        new ShareRuntimePlugin_1.ShareRuntimePlugin(this._options.enhanced).apply(compiler);
        const rawOptions = this._options.provides.map(([key, v]) => ({
            key,
            ...v
        }));
        return (0, base_1.createBuiltinPlugin)(this.name, rawOptions);
    }
}
exports.ProvideSharedPlugin = ProvideSharedPlugin;
