import type { ChainedConfig, ChainedConfigCombineUtils, ChainedConfigWithUtils, Falsy } from './types';
export declare function mergeChainedOptions<T, U = unknown, F = Falsy>(params: {
    defaults: T;
    options?: ChainedConfig<T> | F;
    mergeFn?: typeof Object.assign;
    isFalsy?: (v: T | ChainedConfig<T> | F) => v is F;
}): T;
export declare function mergeChainedOptions<T, U, F = Falsy>(params: {
    defaults: T;
    options: ChainedConfigWithUtils<T, U> | F;
    utils: U;
    mergeFn?: typeof Object.assign;
    isFalsy?: (v: T | ChainedConfigWithUtils<T, U> | F) => v is F;
}): T;
export declare function mergeChainedOptions<T, U, F = Falsy>(params: {
    defaults: T;
    options: ChainedConfigCombineUtils<T, U> | F;
    utils: U;
    mergeFn?: typeof Object.assign;
    useObjectParam?: true;
    isFalsy?: (v: T | ChainedConfigCombineUtils<T, U> | F) => v is F;
}): T;
