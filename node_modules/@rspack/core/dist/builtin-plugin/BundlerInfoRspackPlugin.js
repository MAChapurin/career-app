"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundlerInfoRspackPlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
exports.BundlerInfoRspackPlugin = (0, base_1.create)(binding_1.BuiltinPluginName.BundlerInfoRspackPlugin, (options) => {
    var _a;
    return {
        version: options.version || "unknown",
        force: (_a = options.force) !== null && _a !== void 0 ? _a : false
    };
});
