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
var _Module_inner, _CodeGenerationResult_inner, _CodeGenerationResults_inner;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGenerationResults = exports.CodeGenerationResult = exports.Module = void 0;
const createSource_1 = require("./util/createSource");
class Module {
    static __from_binding(module) {
        return new Module(module);
    }
    constructor(module) {
        _Module_inner.set(this, void 0);
        __classPrivateFieldSet(this, _Module_inner, module, "f");
        this.rawRequest = module.rawRequest;
    }
    get context() {
        return __classPrivateFieldGet(this, _Module_inner, "f").context;
    }
    get resource() {
        return __classPrivateFieldGet(this, _Module_inner, "f").resource;
    }
    get originalSource() {
        if (this._originalSource)
            return this._originalSource;
        if (__classPrivateFieldGet(this, _Module_inner, "f").originalSource) {
            this._originalSource = (0, createSource_1.createSourceFromRaw)(__classPrivateFieldGet(this, _Module_inner, "f").originalSource);
            return this._originalSource;
        }
        else {
            return null;
        }
    }
    identifier() {
        return __classPrivateFieldGet(this, _Module_inner, "f").moduleIdentifier;
    }
    nameForCondition() {
        if (typeof __classPrivateFieldGet(this, _Module_inner, "f").nameForCondition === "string") {
            return __classPrivateFieldGet(this, _Module_inner, "f").nameForCondition;
        }
        else {
            return null;
        }
    }
}
exports.Module = Module;
_Module_inner = new WeakMap();
class CodeGenerationResult {
    constructor(result) {
        _CodeGenerationResult_inner.set(this, void 0);
        __classPrivateFieldSet(this, _CodeGenerationResult_inner, result, "f");
    }
    get(sourceType) {
        return __classPrivateFieldGet(this, _CodeGenerationResult_inner, "f").sources[sourceType];
    }
}
exports.CodeGenerationResult = CodeGenerationResult;
_CodeGenerationResult_inner = new WeakMap();
class CodeGenerationResults {
    constructor(result) {
        _CodeGenerationResults_inner.set(this, void 0);
        __classPrivateFieldSet(this, _CodeGenerationResults_inner, result, "f");
    }
}
exports.CodeGenerationResults = CodeGenerationResults;
_CodeGenerationResults_inner = new WeakMap();
