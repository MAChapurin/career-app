import { BuiltinPlugin, BuiltinPluginName } from "@rspack/binding";
import { RspackBuiltinPlugin } from "./base";
import { ChunkLoading, OutputModule, WasmLoading, WorkerPublicPath } from "../config";
import { Compiler } from "../Compiler";
export declare class WorkerPlugin extends RspackBuiltinPlugin {
    private chunkLoading;
    private wasmLoading;
    private module;
    private workerPublicPath;
    name: BuiltinPluginName;
    constructor(chunkLoading: ChunkLoading, wasmLoading: WasmLoading, module: OutputModule, workerPublicPath: WorkerPublicPath);
    raw(compiler: Compiler): BuiltinPlugin;
}
