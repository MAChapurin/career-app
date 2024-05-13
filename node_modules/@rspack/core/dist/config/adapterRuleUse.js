"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUseSimpleSourceMap = exports.isUseSourceMap = exports.createRawModuleRuleUses = void 0;
const loader_runner_1 = require("../loader-runner");
const util_1 = require("../util");
const builtin_loader_1 = require("../builtin-loader");
const BUILTIN_LOADER_PREFIX = "builtin:";
function createRawModuleRuleUses(uses, path, options) {
    const normalizeRuleSetUseItem = (item) => typeof item === "string" ? { loader: item } : item;
    const allUses = Array.isArray(uses)
        ? [...uses].map(normalizeRuleSetUseItem)
        : [normalizeRuleSetUseItem(uses)];
    return createRawModuleRuleUsesImpl(allUses, path, options);
}
exports.createRawModuleRuleUses = createRawModuleRuleUses;
const getSwcLoaderOptions = (o, options) => {
    if (o && typeof o === "object" && o.rspackExperiments) {
        let expr = o.rspackExperiments;
        const contextPath = options.context;
        const production = options.mode === "production" || !options.mode;
        if (expr.emotion) {
            expr.emotion = (0, builtin_loader_1.resolveEmotion)(expr.emotion, production);
        }
        if (expr.relay) {
            expr.relay = (0, builtin_loader_1.resolveRelay)(expr.relay, contextPath);
        }
        if (expr.import || expr.pluginImport) {
            expr.import = (0, builtin_loader_1.resolvePluginImport)(expr.import || expr.pluginImport);
        }
        if (expr.react) {
            expr.react = (0, builtin_loader_1.resolveReact)(expr.react);
        }
    }
    return o;
};
function getBuiltinLoaderOptions(identifier, o, options) {
    if (identifier.startsWith(`${BUILTIN_LOADER_PREFIX}swc-loader`)) {
        return getSwcLoaderOptions(o, options);
    }
    return o;
}
function createRawModuleRuleUsesImpl(uses, path, options) {
    if (!uses.length) {
        return [];
    }
    return uses.map((use, index) => {
        let o;
        if (use.loader.startsWith(BUILTIN_LOADER_PREFIX)) {
            o = getBuiltinLoaderOptions(use.loader, use.options, options);
            o = (0, util_1.isNil)(o) ? undefined : typeof o === "string" ? o : JSON.stringify(o);
        }
        return {
            loader: resolveStringifyLoaders(use, `${path}[${index}]`, options.compiler),
            options: o
        };
    });
}
function resolveStringifyLoaders(use, path, compiler) {
    const obj = (0, loader_runner_1.parsePathQueryFragment)(use.loader);
    let ident = null;
    if (use.options === null) {
    }
    else if (use.options === undefined) {
    }
    else if (typeof use.options === "string")
        obj.query = "?" + use.options;
    else if (use.ident)
        obj.query = "??" + (ident = use.ident);
    else if (typeof use.options === "object" && use.options.ident)
        obj.query = "??" + (ident = use.options.ident);
    else if (typeof use.options === "object")
        obj.query = "??" + (ident = path);
    else
        obj.query = "?" + JSON.stringify(use.options);
    if (use.options && typeof use.options === "object") {
        if (!ident)
            ident = "[[missing ident]]";
        compiler.ruleSet.references.set(ident, use.options);
    }
    return obj.path + obj.query + obj.fragment;
}
function isUseSourceMap(devtool) {
    return (devtool.includes("source-map") &&
        (devtool.includes("module") || !devtool.includes("cheap")));
}
exports.isUseSourceMap = isUseSourceMap;
function isUseSimpleSourceMap(devtool) {
    return devtool.includes("source-map") && !isUseSourceMap(devtool);
}
exports.isUseSimpleSourceMap = isUseSimpleSourceMap;
