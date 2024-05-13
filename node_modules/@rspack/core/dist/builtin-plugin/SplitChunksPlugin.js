"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitChunksPlugin = void 0;
const assert_1 = __importDefault(require("assert"));
const base_1 = require("./base");
const binding_1 = require("@rspack/binding");
const Module_1 = require("../Module");
const Chunk_1 = require("../Chunk");
class SplitChunksPlugin extends base_1.RspackBuiltinPlugin {
    constructor(options) {
        super();
        this.options = options;
        this.name = binding_1.BuiltinPluginName.SplitChunksPlugin;
        this.affectedHooks = "thisCompilation";
    }
    raw(compiler) {
        const rawOptions = toRawSplitChunksOptions(this.options, compiler);
        (0, assert_1.default)(typeof rawOptions !== "undefined");
        return (0, base_1.createBuiltinPlugin)(this.name, rawOptions);
    }
}
exports.SplitChunksPlugin = SplitChunksPlugin;
function toRawSplitChunksOptions(sc, compiler) {
    if (!sc) {
        return;
    }
    function getName(name) {
        if (typeof name === "function") {
            return (ctx) => {
                if (typeof ctx.module === "undefined") {
                    return name(undefined);
                }
                else {
                    return name(Module_1.Module.__from_binding(ctx.module));
                }
            };
        }
        else {
            return name;
        }
    }
    function getTest(test) {
        if (typeof test === "function") {
            return (ctx) => {
                if (typeof ctx.module === "undefined") {
                    return test(undefined);
                }
                else {
                    return test(Module_1.Module.__from_binding(ctx.module));
                }
            };
        }
        else {
            return test;
        }
    }
    function getChunks(chunks) {
        if (typeof chunks === "function") {
            return (chunk) => chunks(Chunk_1.Chunk.__from_binding(chunk, compiler.compilation.__internal_getInner()));
        }
        else {
            return chunks;
        }
    }
    const { name, chunks, defaultSizeTypes, cacheGroups = {}, fallbackCacheGroup, ...passThrough } = sc;
    return {
        name: getName(name),
        chunks: getChunks(chunks),
        defaultSizeTypes: defaultSizeTypes || ["javascript", "unknown"],
        cacheGroups: Object.entries(cacheGroups)
            .filter(([_key, group]) => group !== false)
            .map(([key, group]) => {
            group = group;
            const { test, name, chunks, ...passThrough } = group;
            const rawGroup = {
                key,
                test: getTest(test),
                name: getName(name),
                chunks: getChunks(chunks),
                ...passThrough
            };
            return rawGroup;
        }),
        fallbackCacheGroup: {
            chunks: getChunks(chunks),
            ...fallbackCacheGroup
        },
        ...passThrough
    };
}
