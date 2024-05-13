"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressPlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
exports.ProgressPlugin = (0, base_1.create)(binding_1.BuiltinPluginName.ProgressPlugin, (progress = {}) => {
    var _a, _b;
    return ({
        prefix: (_a = progress.prefix) !== null && _a !== void 0 ? _a : "",
        profile: (_b = progress.profile) !== null && _b !== void 0 ? _b : false
    });
});
