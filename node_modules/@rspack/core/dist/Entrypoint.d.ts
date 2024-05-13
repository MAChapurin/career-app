import { type JsChunkGroup, type JsCompilation } from "@rspack/binding";
import { ChunkGroup } from "./ChunkGroup";
import { Chunk } from "./Chunk";
export declare class Entrypoint extends ChunkGroup {
    static __from_binding(chunk: JsChunkGroup, compilation: JsCompilation): Entrypoint;
    protected constructor(inner: JsChunkGroup, compilation: JsCompilation);
    getRuntimeChunk(): Chunk | null;
}
