"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyRspackPlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
exports.CopyRspackPlugin = (0, base_1.create)(binding_1.BuiltinPluginName.CopyRspackPlugin, (copy) => {
    const ret = {
        patterns: []
    };
    ret.patterns = (copy.patterns || []).map(pattern => {
        var _a, _b, _c, _d;
        if (typeof pattern === "string") {
            pattern = { from: pattern };
        }
        (_a = pattern.force) !== null && _a !== void 0 ? _a : (pattern.force = false);
        (_b = pattern.noErrorOnMissing) !== null && _b !== void 0 ? _b : (pattern.noErrorOnMissing = false);
        (_c = pattern.priority) !== null && _c !== void 0 ? _c : (pattern.priority = 0);
        (_d = pattern.globOptions) !== null && _d !== void 0 ? _d : (pattern.globOptions = {});
        return pattern;
    });
    return ret;
});
