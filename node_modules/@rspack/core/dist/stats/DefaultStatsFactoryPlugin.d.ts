import type { Compiler } from "../Compiler";
/**
 * only support below factories:
 * - compilation
 * - compilation.assets
 * - compilation.assets[].asset
 * - compilation.chunks
 * - compilation.chunks[].chunk
 * - compilation.modules
 * - compilation.modules[].module
 */
export declare class DefaultStatsFactoryPlugin {
    apply(compiler: Compiler): void;
}
