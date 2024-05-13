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
var _Chunk_inner, _Chunk_inner_compilation;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = void 0;
const binding_1 = require("@rspack/binding");
const ChunkGroup_1 = require("./ChunkGroup");
const comparators_1 = require("./util/comparators");
const _1 = require(".");
class Chunk {
    static __from_binding(chunk, compilation) {
        if (compilation instanceof _1.Compilation) {
            return new Chunk(chunk, compilation.__internal_getInner());
        }
        return new Chunk(chunk, compilation);
    }
    constructor(chunk, compilation) {
        _Chunk_inner.set(this, void 0);
        _Chunk_inner_compilation.set(this, void 0);
        __classPrivateFieldSet(this, _Chunk_inner, chunk, "f");
        __classPrivateFieldSet(this, _Chunk_inner_compilation, compilation, "f");
        this.name = chunk.name;
        this.id = chunk.id;
        this.ids = chunk.ids;
        this.idNameHints = chunk.idNameHints;
        this.filenameTemplate = chunk.filenameTemplate;
        this.cssFilenameTemplate = chunk.cssFilenameTemplate;
        this.files = chunk.files;
        this.runtime = chunk.runtime;
        this.hash = chunk.hash;
        this.contentHash = chunk.contentHash;
        this.renderedHash = chunk.renderedHash;
        this.chunkReasons = chunk.chunkReasons;
        this.auxiliaryFiles = chunk.auxiliaryFiles;
    }
    isOnlyInitial() {
        return (0, binding_1.__chunk_inner_is_only_initial)(__classPrivateFieldGet(this, _Chunk_inner, "f").__inner_ukey, __classPrivateFieldGet(this, _Chunk_inner_compilation, "f"));
    }
    canBeInitial() {
        return (0, binding_1.__chunk_inner_can_be_initial)(__classPrivateFieldGet(this, _Chunk_inner, "f").__inner_ukey, __classPrivateFieldGet(this, _Chunk_inner_compilation, "f"));
    }
    hasRuntime() {
        return (0, binding_1.__chunk_inner_has_runtime)(__classPrivateFieldGet(this, _Chunk_inner, "f").__inner_ukey, __classPrivateFieldGet(this, _Chunk_inner_compilation, "f"));
    }
    get groupsIterable() {
        const chunk_groups = __classPrivateFieldGet(this, _Chunk_inner, "f").__inner_groups.map(ukey => {
            const cg = (0, binding_1.__chunk_group_inner_get_chunk_group)(ukey, __classPrivateFieldGet(this, _Chunk_inner_compilation, "f"));
            return ChunkGroup_1.ChunkGroup.__from_binding(cg, __classPrivateFieldGet(this, _Chunk_inner_compilation, "f"));
        });
        chunk_groups.sort(comparators_1.compareChunkGroupsByIndex);
        return new Set(chunk_groups);
    }
    getAllAsyncChunks() {
        return new Set((0, binding_1.__chunk_inner_get_all_async_chunks)(__classPrivateFieldGet(this, _Chunk_inner, "f").__inner_ukey, __classPrivateFieldGet(this, _Chunk_inner_compilation, "f")).map(c => Chunk.__from_binding(c, __classPrivateFieldGet(this, _Chunk_inner_compilation, "f"))));
    }
    getAllInitialChunks() {
        return new Set((0, binding_1.__chunk_inner_get_all_initial_chunks)(__classPrivateFieldGet(this, _Chunk_inner, "f").__inner_ukey, __classPrivateFieldGet(this, _Chunk_inner_compilation, "f")).map(c => Chunk.__from_binding(c, __classPrivateFieldGet(this, _Chunk_inner_compilation, "f"))));
    }
    getAllReferencedChunks() {
        return new Set((0, binding_1.__chunk_inner_get_all_referenced_chunks)(__classPrivateFieldGet(this, _Chunk_inner, "f").__inner_ukey, __classPrivateFieldGet(this, _Chunk_inner_compilation, "f")).map(c => Chunk.__from_binding(c, __classPrivateFieldGet(this, _Chunk_inner_compilation, "f"))));
    }
    __internal_inner_ukey() {
        return __classPrivateFieldGet(this, _Chunk_inner, "f").__inner_ukey;
    }
}
exports.Chunk = Chunk;
_Chunk_inner = new WeakMap(), _Chunk_inner_compilation = new WeakMap();
