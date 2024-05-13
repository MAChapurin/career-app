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
var _ChunkGroup_inner, _ChunkGroup_inner_compilation;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkGroup = void 0;
const binding_1 = require("@rspack/binding");
class ChunkGroup {
    static __from_binding(chunk, compilation) {
        return new ChunkGroup(chunk, compilation);
    }
    constructor(inner, compilation) {
        _ChunkGroup_inner.set(this, void 0);
        _ChunkGroup_inner_compilation.set(this, void 0);
        __classPrivateFieldSet(this, _ChunkGroup_inner, inner, "f");
        __classPrivateFieldSet(this, _ChunkGroup_inner_compilation, compilation, "f");
    }
    getFiles() {
        const files = new Set();
        for (const chunk of __classPrivateFieldGet(this, _ChunkGroup_inner, "f").chunks) {
            for (const file of chunk.files) {
                files.add(file);
            }
        }
        return Array.from(files);
    }
    getParents() {
        return __classPrivateFieldGet(this, _ChunkGroup_inner, "f").__inner_parents.map(parent => {
            const cg = (0, binding_1.__chunk_group_inner_get_chunk_group)(parent, __classPrivateFieldGet(this, _ChunkGroup_inner_compilation, "f"));
            return ChunkGroup.__from_binding(cg, __classPrivateFieldGet(this, _ChunkGroup_inner_compilation, "f"));
        });
    }
    get index() {
        return __classPrivateFieldGet(this, _ChunkGroup_inner, "f").index;
    }
    get name() {
        return __classPrivateFieldGet(this, _ChunkGroup_inner, "f").name;
    }
    __internal_inner_ukey() {
        return __classPrivateFieldGet(this, _ChunkGroup_inner, "f").__inner_ukey;
    }
    __internal_inner_compilation() {
        return __classPrivateFieldGet(this, _ChunkGroup_inner_compilation, "f");
    }
}
exports.ChunkGroup = ChunkGroup;
_ChunkGroup_inner = new WeakMap(), _ChunkGroup_inner_compilation = new WeakMap();
