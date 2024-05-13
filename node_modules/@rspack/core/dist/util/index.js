"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deprecatedWarn = exports.toJsAssetInfo = exports.asArray = exports.stringifyLoaderObject = exports.indent = exports.concatErrorMsgAndStack = exports.isJsStatsError = exports.isPromiseLike = exports.serializeObject = exports.toObject = exports.toBuffer = exports.isNil = exports.mapValues = void 0;
function mapValues(record, fn) {
    return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, fn(value)]));
}
exports.mapValues = mapValues;
function isNil(value) {
    return value === null || value === undefined;
}
exports.isNil = isNil;
const toBuffer = (bufLike) => {
    if (Buffer.isBuffer(bufLike)) {
        return bufLike;
    }
    else if (typeof bufLike === "string") {
        return Buffer.from(bufLike);
    }
    throw new Error("Buffer or string expected");
};
exports.toBuffer = toBuffer;
const toObject = (input) => {
    let s;
    if (Buffer.isBuffer(input)) {
        s = input.toString("utf8");
    }
    else if (input && typeof input === "object") {
        return input;
    }
    else if (typeof input === "string") {
        s = input;
    }
    else {
        throw new Error("Buffer or string or object expected");
    }
    return JSON.parse(s);
};
exports.toObject = toObject;
function serializeObject(map) {
    if (isNil(map)) {
        return undefined;
    }
    if (typeof map === "string") {
        if (map) {
            return (0, exports.toBuffer)(map);
        }
        return undefined;
    }
    return (0, exports.toBuffer)(JSON.stringify(map));
}
exports.serializeObject = serializeObject;
function isPromiseLike(value) {
    return (typeof value === "object" &&
        value !== null &&
        typeof value.then === "function");
}
exports.isPromiseLike = isPromiseLike;
function isJsStatsError(err) {
    return !(err instanceof Error) && err.formatted;
}
exports.isJsStatsError = isJsStatsError;
function concatErrorMsgAndStack(err) {
    // deduplicate the error if message is already shown in the stack
    //@ts-ignore
    const stackStartPrefix = err.name ? `${err.name}: ` : "Error: ";
    return isJsStatsError(err)
        ? err.formatted
        : err.stack
            ? err.stack.startsWith(`${stackStartPrefix}${err.message}`)
                ? `${err.stack}`
                : `${err.message}\n${err.stack}`
            : `${err.message}`;
}
exports.concatErrorMsgAndStack = concatErrorMsgAndStack;
function indent(str, prefix) {
    const rem = str.replace(/\n([^\n])/g, "\n" + prefix + "$1");
    return prefix + rem;
}
exports.indent = indent;
function stringifyLoaderObject(o) {
    return o.path + o.query + o.fragment;
}
exports.stringifyLoaderObject = stringifyLoaderObject;
function asArray(item) {
    return Array.isArray(item) ? item : [item];
}
exports.asArray = asArray;
function toJsAssetInfo(info) {
    return {
        immutable: false,
        minimized: false,
        development: false,
        hotModuleReplacement: false,
        related: {},
        chunkHash: [],
        contentHash: [],
        ...info
    };
}
exports.toJsAssetInfo = toJsAssetInfo;
const getDeprecationStatus = () => {
    var _a;
    const defaultEnableDeprecatedWarning = true;
    if (process.env.RSPACK_DEP_WARNINGS === "false" ||
        process.env.RSPACK_DEP_WARNINGS === "0") {
        return false;
    }
    return (((_a = process.env.RSPACK_DEP_WARNINGS) !== null && _a !== void 0 ? _a : `${defaultEnableDeprecatedWarning}`) !==
        "false");
};
const yellow = (content) => `\u001b[1m\u001b[33m${content}\u001b[39m\u001b[22m`;
const deprecatedWarn = (content, enable = getDeprecationStatus()) => {
    if (enable) {
        console.warn(yellow(content));
        console.warn(indent("Set env `RSPACK_DEP_WARNINGS` to 'false' to temporarily disable deprecation warnings.\n", "    "));
    }
};
exports.deprecatedWarn = deprecatedWarn;
