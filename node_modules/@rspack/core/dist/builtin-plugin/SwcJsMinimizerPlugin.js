"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwcJsMinimizerRspackPlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
function getRawCompressOptions(options) {
    function _inner() {
        var _a, _b, _c;
        const _default = {
            passes: (_a = options === null || options === void 0 ? void 0 : options.passes) !== null && _a !== void 0 ? _a : 1,
            pure_funcs: (_b = options === null || options === void 0 ? void 0 : options.pureFuncs) !== null && _b !== void 0 ? _b : [],
            drop_console: (_c = options === null || options === void 0 ? void 0 : options.dropConsole) !== null && _c !== void 0 ? _c : false
        };
        if ((options === null || options === void 0 ? void 0 : options.compress) === true) {
            return _default;
        }
        if ((options === null || options === void 0 ? void 0 : options.compress) === false) {
            return false;
        }
        if ((options === null || options === void 0 ? void 0 : options.compress) && typeof options.compress === "object") {
            return {
                // TODO: deprecate default merging in 0.4
                ..._default,
                ...options.compress
            };
        }
        return _default;
    }
    let inner = _inner();
    return typeof inner === "boolean" ? inner : JSON.stringify(inner);
}
function getRawMangleOptions(options) {
    function _inner() {
        var _a, _b;
        const _default = {
            keep_classnames: (_a = options === null || options === void 0 ? void 0 : options.keepClassNames) !== null && _a !== void 0 ? _a : false,
            keep_fnames: (_b = options === null || options === void 0 ? void 0 : options.keepFnNames) !== null && _b !== void 0 ? _b : false
        };
        if ((options === null || options === void 0 ? void 0 : options.mangle) === true) {
            return _default;
        }
        if ((options === null || options === void 0 ? void 0 : options.mangle) === false) {
            return false;
        }
        if ((options === null || options === void 0 ? void 0 : options.mangle) && typeof options.mangle === "object") {
            return {
                // TODO: deprecate default merging in 0.4
                ..._default,
                ...options.mangle
            };
        }
        return _default;
    }
    let inner = _inner();
    return typeof inner === "boolean" ? inner : JSON.stringify(inner);
}
function getRawFormatOptions(options) {
    function _inner() {
        var _a;
        const _default = {
            comments: (options === null || options === void 0 ? void 0 : options.comments) ? options === null || options === void 0 ? void 0 : options.comments : false,
            asciiOnly: (_a = options === null || options === void 0 ? void 0 : options.asciiOnly) !== null && _a !== void 0 ? _a : false
        };
        if ((options === null || options === void 0 ? void 0 : options.format) && typeof options.format === "object") {
            // TODO: deprecate default merging in 0.4
            return {
                ..._default,
                ...options.format
            };
        }
        return _default;
    }
    return JSON.stringify(_inner());
}
function isObject(value) {
    const type = typeof value;
    return value != null && (type === "object" || type === "function");
}
function getRawExtractCommentsOptions(extractComments) {
    const conditionStr = (condition) => {
        if (typeof condition === "undefined" || condition === true) {
            // copied from terser-webpack-plugin
            return "@preserve|@lic|@cc_on|^\\**!";
        }
        else if (condition === false) {
            throw Error("unreachable");
        }
        else {
            // FIXME: flags
            return condition.source;
        }
    };
    if (typeof extractComments === "boolean") {
        if (!extractComments) {
            return undefined;
        }
        else {
            const res = {
                condition: conditionStr(extractComments)
            };
            return res;
        }
    }
    else if (extractComments instanceof RegExp) {
        const res = {
            condition: extractComments.source
        };
        return res;
    }
    else if (isObject(extractComments)) {
        if (extractComments.condition === false) {
            return undefined;
        }
        else {
            const res = {
                condition: conditionStr(extractComments.condition),
                banner: extractComments.banner
            };
            return res;
        }
    }
    else {
        return undefined;
    }
}
exports.SwcJsMinimizerRspackPlugin = (0, base_1.create)(binding_1.BuiltinPluginName.SwcJsMinimizerRspackPlugin, (options) => {
    return {
        extractComments: getRawExtractCommentsOptions(options === null || options === void 0 ? void 0 : options.extractComments),
        compress: getRawCompressOptions(options),
        mangle: getRawMangleOptions(options),
        format: getRawFormatOptions(options),
        module: options === null || options === void 0 ? void 0 : options.module,
        test: options === null || options === void 0 ? void 0 : options.test,
        include: options === null || options === void 0 ? void 0 : options.include,
        exclude: options === null || options === void 0 ? void 0 : options.exclude
    };
}, "compilation");
