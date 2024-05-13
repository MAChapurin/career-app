import { type JsChunkGroup, type JsCompilation } from "@rspack/binding";
export declare class ChunkGroup {
    #private;
    static __from_binding(chunk: JsChunkGroup, compilation: JsCompilation): ChunkGroup;
    protected constructor(inner: JsChunkGroup, compilation: JsCompilation);
    getFiles(): string[];
    getParents(): ChunkGroup[];
    get index(): number | undefined;
    get name(): string | undefined;
    __internal_inner_ukey(): number;
    __internal_inner_compilation(): JsCompilation;
}
