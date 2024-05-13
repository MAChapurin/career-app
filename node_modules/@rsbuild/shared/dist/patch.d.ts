import type { CompilerTapFn } from './types';
declare const GLOBAL_PATCHED_SYMBOL: unique symbol;
declare global {
    interface Location {
        [GLOBAL_PATCHED_SYMBOL]?: true;
    }
}
export declare function patchCompilerGlobalLocation(compiler: {
    hooks: {
        run: CompilerTapFn;
        watchRun: CompilerTapFn;
        watchClose: CompilerTapFn;
        done: CompilerTapFn;
    };
}): void;
export {};
