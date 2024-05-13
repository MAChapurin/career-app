"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entrypoint = void 0;
const binding_1 = require("@rspack/binding");
const ChunkGroup_1 = require("./ChunkGroup");
const Chunk_1 = require("./Chunk");
class Entrypoint extends ChunkGroup_1.ChunkGroup {
    static __from_binding(chunk, compilation) {
        return new Entrypoint(chunk, compilation);
    }
    constructor(inner, compilation) {
        super(inner, compilation);
    }
    getRuntimeChunk() {
        const c = (0, binding_1.__entrypoint_inner_get_runtime_chunk)(this.__internal_inner_ukey(), this.__internal_inner_compilation());
        if (c)
            return Chunk_1.Chunk.__from_binding(c, this.__internal_inner_compilation());
        return null;
    }
}
exports.Entrypoint = Entrypoint;
