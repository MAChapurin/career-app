"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkGraph = void 0;
const binding_1 = require("@rspack/binding");
const Chunk_1 = require("./Chunk");
const Module_1 = require("./Module");
class ChunkGraph {
    constructor(compilation) {
        this.compilation = compilation;
    }
    getChunkModules(chunk) {
        return (0, binding_1.__chunk_graph_inner_get_chunk_modules)(chunk.__internal_inner_ukey(), this.compilation.__internal_getInner()).map(m => Module_1.Module.__from_binding(m));
    }
    getChunkModulesIterable(chunk) {
        return new Set((0, binding_1.__chunk_graph_inner_get_chunk_modules)(chunk.__internal_inner_ukey(), this.compilation.__internal_getInner()).map(m => Module_1.Module.__from_binding(m)));
    }
    getChunkEntryModulesIterable(chunk) {
        return new Set((0, binding_1.__chunk_graph_inner_get_chunk_entry_modules)(chunk.__internal_inner_ukey(), this.compilation.__internal_getInner()).map(m => Module_1.Module.__from_binding(m)));
    }
    getChunkEntryDependentChunksIterable(chunk) {
        return new Set((0, binding_1.__chunk_graph_inner_get_chunk_entry_dependent_chunks_iterable)(chunk.__internal_inner_ukey(), this.compilation.__internal_getInner()).map(c => Chunk_1.Chunk.__from_binding(c, this.compilation.__internal_getInner())));
    }
    getChunkModulesIterableBySourceType(chunk, sourceType) {
        return new Set((0, binding_1.__chunk_graph_inner_get_chunk_modules_iterable_by_source_type)(chunk.__internal_inner_ukey(), sourceType, this.compilation.__internal_getInner()).map(m => Module_1.Module.__from_binding(m)));
    }
}
exports.ChunkGraph = ChunkGraph;
