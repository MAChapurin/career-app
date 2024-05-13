"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinePlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
exports.DefinePlugin = (0, base_1.create)(binding_1.BuiltinPluginName.DefinePlugin, (define) => {
    const entries = Object.entries(define).map(([key, value]) => {
        if (typeof value !== "string") {
            value = value === undefined ? "undefined" : JSON.stringify(value);
        }
        return [key, value];
    });
    return Object.fromEntries(entries);
}, "compilation");
