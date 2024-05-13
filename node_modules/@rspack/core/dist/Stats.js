"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Stats_instances, _Stats_inner, _Stats_innerMap, _Stats_getInnerByCompilation;
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsOrFallback = exports.normalizeFilter = exports.normalizeStatsPreset = exports.Stats = void 0;
class Stats {
    constructor(compilation) {
        _Stats_instances.add(this);
        _Stats_inner.set(this, void 0);
        _Stats_innerMap.set(this, void 0);
        __classPrivateFieldSet(this, _Stats_inner, compilation.__internal_getInner().getStats(), "f");
        this.compilation = compilation;
        __classPrivateFieldSet(this, _Stats_innerMap, new WeakMap([[this.compilation, __classPrivateFieldGet(this, _Stats_inner, "f")]]), "f");
    }
    get hash() {
        return this.compilation.hash;
    }
    hasErrors() {
        return __classPrivateFieldGet(this, _Stats_inner, "f").getErrors().length > 0;
    }
    hasWarnings() {
        return __classPrivateFieldGet(this, _Stats_inner, "f").getWarnings().length > 0;
    }
    toJson(opts, forToString) {
        const options = this.compilation.createStatsOptions(opts, {
            forToString
        });
        const statsFactory = this.compilation.createStatsFactory(options);
        // FIXME: This is a really ugly workaround for avoid panic for accessing previous compilation.
        // Modern.js dev server will detect whether the returned stats is available.
        // So this does not do harm to these frameworks.
        // Modern.js: https://github.com/web-infra-dev/modern.js/blob/63f916f882f7d16096949e264e119218c0ab8d7d/packages/server/server/src/dev-tools/dev-middleware/socketServer.ts#L172
        let stats = null;
        try {
            stats = statsFactory.create("compilation", this.compilation, {
                compilation: this.compilation,
                getInner: __classPrivateFieldGet(this, _Stats_instances, "m", _Stats_getInnerByCompilation).bind(this)
            });
        }
        catch (e) {
            console.warn("Failed to get stats. " +
                "Are you trying to access the stats from the previous compilation?");
        }
        return stats;
    }
    toString(opts) {
        const options = this.compilation.createStatsOptions(opts, {
            forToString: true
        });
        const statsFactory = this.compilation.createStatsFactory(options);
        const statsPrinter = this.compilation.createStatsPrinter(options);
        // FIXME: This is a really ugly workaround for avoid panic for accessing previous compilation.
        // Modern.js dev server will detect whether the returned stats is available.
        // So this does not do harm to these frameworks.
        // Modern.js: https://github.com/web-infra-dev/modern.js/blob/63f916f882f7d16096949e264e119218c0ab8d7d/packages/server/server/src/dev-tools/dev-middleware/socketServer.ts#L172
        let stats = null;
        try {
            stats = statsFactory.create("compilation", this.compilation, {
                compilation: this.compilation,
                getInner: __classPrivateFieldGet(this, _Stats_instances, "m", _Stats_getInnerByCompilation).bind(this)
            });
        }
        catch (e) {
            console.warn("Failed to get stats. " +
                "Are you trying to access the stats from the previous compilation?");
        }
        if (!stats) {
            return "";
        }
        const result = statsPrinter.print("compilation", stats);
        return result === undefined ? "" : result;
    }
}
exports.Stats = Stats;
_Stats_inner = new WeakMap(), _Stats_innerMap = new WeakMap(), _Stats_instances = new WeakSet(), _Stats_getInnerByCompilation = function _Stats_getInnerByCompilation(compilation) {
    if (__classPrivateFieldGet(this, _Stats_innerMap, "f").has(compilation)) {
        return __classPrivateFieldGet(this, _Stats_innerMap, "f").get(compilation);
    }
    const inner = compilation.__internal_getInner().getStats();
    __classPrivateFieldGet(this, _Stats_innerMap, "f").set(compilation, inner);
    return inner;
};
function normalizeStatsPreset(options) {
    if (typeof options === "boolean" || typeof options === "string")
        return presetToOptions(options);
    else if (!options)
        return {};
    else {
        let obj = { ...presetToOptions(options.preset), ...options };
        delete obj.preset;
        return obj;
    }
}
exports.normalizeStatsPreset = normalizeStatsPreset;
function presetToOptions(name) {
    const preset = (typeof name === "string" && name.toLowerCase()) || name;
    switch (preset) {
        case "none":
            return {
                all: false
            };
        case "verbose":
            return {
                all: true,
                modulesSpace: Infinity
            };
        case "errors-only":
            return {
                all: false,
                errors: true,
                errorsCount: true,
                logging: "error"
                // TODO: moduleTrace: true,
            };
        case "errors-warnings":
            return {
                all: false,
                errors: true,
                errorsCount: true,
                warnings: true,
                warningsCount: true,
                logging: "warn"
            };
        default:
            return {};
    }
}
const normalizeFilter = (item) => {
    if (typeof item === "string") {
        const regExp = new RegExp(`[\\\\/]${item.replace(
        // eslint-disable-next-line no-useless-escape
        /[-[\]{}()*+?.\\^$|]/g, "\\$&")}([\\\\/]|$|!|\\?)`);
        return (ident) => regExp.test(ident);
    }
    if (item && typeof item === "object" && typeof item.test === "function") {
        return (ident) => item.test(ident);
    }
    if (typeof item === "function") {
        return item;
    }
    if (typeof item === "boolean") {
        return () => item;
    }
    throw new Error(`unreachable: typeof ${item} should be one of string | RegExp | ((value: string) => boolean)`);
};
exports.normalizeFilter = normalizeFilter;
const optionsOrFallback = (...args) => {
    let optionValues = [];
    optionValues.push(...args);
    return optionValues.find(optionValue => optionValue !== undefined);
};
exports.optionsOrFallback = optionsOrFallback;
