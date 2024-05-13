"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvalSourceMapDevToolPlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
exports.EvalSourceMapDevToolPlugin = (0, base_1.create)(binding_1.BuiltinPluginName.EvalSourceMapDevToolPlugin, (options) => {
    var _a, _b, _c;
    return {
        filename: options.filename || undefined,
        append: options.append,
        namespace: (_a = options.namespace) !== null && _a !== void 0 ? _a : "",
        columns: (_b = options.columns) !== null && _b !== void 0 ? _b : true,
        noSources: (_c = options.noSources) !== null && _c !== void 0 ? _c : false,
        publicPath: options.publicPath,
        module: options.module
    };
}, "compilation");
