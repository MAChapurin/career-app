type FixedSizeArray<T extends number, U> = T extends 0 ? void[] : ReadonlyArray<U> & {
    0: U;
    length: T;
};
type Measure<T extends number> = T extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 ? T : never;
type Append<T extends any[], U> = {
    0: [U];
    1: [T[0], U];
    2: [T[0], T[1], U];
    3: [T[0], T[1], T[2], U];
    4: [T[0], T[1], T[2], T[3], U];
    5: [T[0], T[1], T[2], T[3], T[4], U];
    6: [T[0], T[1], T[2], T[3], T[4], T[5], U];
    7: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], U];
    8: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], U];
}[Measure<T["length"]>];
export type AsArray<T> = T extends any[] ? T : [T];
export type Fn<T, R> = (...args: AsArray<T>) => R;
export type FnWithCallback<T, R> = (...args: Append<AsArray<T>, InnerCallback<Error, R>>) => void;
declare class UnsetAdditionalOptions {
    _UnsetAdditionalOptions: true;
}
type IfSet<X> = X extends UnsetAdditionalOptions ? {} : X;
type Callback<E, T> = (error: E | null, result?: T) => void;
type InnerCallback<E, T> = (error?: E | null | false, result?: T) => void;
type FullTap = Tap & {
    type: "sync" | "async" | "promise";
    fn: Function;
};
type Tap = TapOptions & {
    name: string;
};
type TapOptions = {
    before?: string;
    stage?: number;
};
export type Options<AdditionalOptions = UnsetAdditionalOptions> = string | (Tap & IfSet<AdditionalOptions>);
export interface HookInterceptor<T, R, AdditionalOptions = UnsetAdditionalOptions> {
    name?: string;
    tap?: (tap: FullTap & IfSet<AdditionalOptions>) => void;
    call?: (...args: any[]) => void;
    loop?: (...args: any[]) => void;
    error?: (err: Error) => void;
    result?: (result: R) => void;
    done?: () => void;
    register?: (tap: FullTap & IfSet<AdditionalOptions>) => FullTap & IfSet<AdditionalOptions>;
}
type ArgumentNames<T extends any[]> = FixedSizeArray<T["length"], string>;
export declare class Hook<T, R, AdditionalOptions = UnsetAdditionalOptions> {
    args?: ArgumentNames<AsArray<T>>;
    name?: string;
    taps: (FullTap & IfSet<AdditionalOptions>)[];
    interceptors: HookInterceptor<T, R, AdditionalOptions>[];
    constructor(args?: ArgumentNames<AsArray<T>>, name?: string);
    intercept(interceptor: HookInterceptor<T, R, AdditionalOptions>): void;
    _runRegisterInterceptors(options: FullTap & IfSet<AdditionalOptions>): FullTap & IfSet<AdditionalOptions>;
    _runCallInterceptors(...args: any[]): void;
    _runErrorInterceptors(e: Error): void;
    _runTapInterceptors(tap: FullTap & IfSet<AdditionalOptions>): void;
    _runDoneInterceptors(): void;
    _runResultInterceptors(r: R): void;
    isUsed(): boolean;
    queryStageRange(stageRange: StageRange): QueriedHook<T, R, AdditionalOptions>;
    callAsyncStageRange(queried: QueriedHook<T, R, AdditionalOptions>, ...args: Append<AsArray<T>, Callback<Error, R>>): void;
    callAsync(...args: Append<AsArray<T>, Callback<Error, R>>): void;
    promiseStageRange(queried: QueriedHook<T, R, AdditionalOptions>, ...args: AsArray<T>): Promise<R>;
    promise(...args: AsArray<T>): Promise<R>;
    tap(options: Options<AdditionalOptions>, fn: Fn<T, R>): void;
    _tap(type: "sync" | "async" | "promise", options: Options<AdditionalOptions>, fn: Function): void;
    _insert(item: FullTap & IfSet<AdditionalOptions>): void;
}
export type StageRange = readonly [number, number];
export declare const minStage: number;
export declare const maxStage: number;
export declare const safeStage: (stage: number) => number;
export declare class QueriedHook<T, R, AdditionalOptions = UnsetAdditionalOptions> {
    stageRange: StageRange;
    hook: Hook<T, R, AdditionalOptions>;
    tapsInRange: (FullTap & IfSet<AdditionalOptions>)[];
    constructor(stageRange: StageRange, hook: Hook<T, R, AdditionalOptions>);
    isUsed(): boolean;
    call(...args: AsArray<T>): R;
    callAsync(...args: Append<AsArray<T>, Callback<Error, R>>): void;
    promise(...args: AsArray<T>): Promise<R>;
}
export declare class SyncHook<T, R = void, AdditionalOptions = UnsetAdditionalOptions> extends Hook<T, R, AdditionalOptions> {
    callAsyncStageRange(queried: QueriedHook<T, R, AdditionalOptions>, ...args: Append<AsArray<T>, Callback<Error, R>>): void;
    call(...args: AsArray<T>): R;
    callStageRange(queried: QueriedHook<T, R, AdditionalOptions>, ...args: AsArray<T>): R;
    tapAsync(): never;
    tapPromise(): never;
}
export declare class SyncBailHook<T, R, AdditionalOptions = UnsetAdditionalOptions> extends Hook<T, R, AdditionalOptions> {
    callAsyncStageRange(queried: QueriedHook<T, R, AdditionalOptions>, ...args: Append<AsArray<T>, Callback<Error, R>>): void;
    call(...args: AsArray<T>): R;
    callStageRange(queried: QueriedHook<T, R, AdditionalOptions>, ...args: AsArray<T>): R;
    tapAsync(): never;
    tapPromise(): never;
}
export declare class AsyncParallelHook<T, AdditionalOptions = UnsetAdditionalOptions> extends Hook<T, void, AdditionalOptions> {
    callAsyncStageRange(queried: QueriedHook<T, void, AdditionalOptions>, ...args: Append<AsArray<T>, Callback<Error, void>>): void;
    tapAsync(options: Options<AdditionalOptions>, fn: FnWithCallback<T, void>): void;
    tapPromise(options: Options<AdditionalOptions>, fn: Fn<T, void>): void;
}
export declare class AsyncSeriesHook<T, AdditionalOptions = UnsetAdditionalOptions> extends Hook<T, void, AdditionalOptions> {
    callAsyncStageRange(queried: QueriedHook<T, void, AdditionalOptions>, ...args: Append<AsArray<T>, Callback<Error, void>>): void;
    tapAsync(options: Options<AdditionalOptions>, fn: FnWithCallback<T, void>): void;
    tapPromise(options: Options<AdditionalOptions>, fn: Fn<T, void>): void;
}
export declare class AsyncSeriesBailHook<T, R, AdditionalOptions = UnsetAdditionalOptions> extends Hook<T, R, AdditionalOptions> {
    callAsyncStageRange(queried: QueriedHook<T, R, AdditionalOptions>, ...args: Append<AsArray<T>, Callback<Error, R>>): void;
    tapAsync(options: Options<AdditionalOptions>, fn: FnWithCallback<T, void>): void;
    tapPromise(options: Options<AdditionalOptions>, fn: Fn<T, void>): void;
}
export type HookMapKey = any;
export type HookFactory<H> = (key: HookMapKey, hook?: H) => H;
export interface HookMapInterceptor<H> {
    factory?: HookFactory<H>;
}
export declare class HookMap<H extends Hook<any, any, any>> {
    _map: Map<HookMapKey, H>;
    _factory: HookFactory<H>;
    name?: string;
    _interceptors: HookMapInterceptor<H>[];
    constructor(factory: HookFactory<H>, name?: string);
    get(key: HookMapKey): H | undefined;
    for(key: HookMapKey): H;
    intercept(interceptor: HookMapInterceptor<H>): void;
    isUsed(): boolean;
    queryStageRange(stageRange: StageRange): QueriedHookMap<H>;
}
export declare class QueriedHookMap<H extends Hook<any, any, any>> {
    stageRange: StageRange;
    hookMap: HookMap<H>;
    constructor(stageRange: StageRange, hookMap: HookMap<H>);
    get(key: HookMapKey): QueriedHook<any, any, any> | undefined;
    for(key: HookMapKey): QueriedHook<any, any, any>;
    isUsed(): boolean;
}
export {};
