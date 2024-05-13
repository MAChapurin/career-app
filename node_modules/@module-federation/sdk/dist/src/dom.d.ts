export declare function safeWrapper<T extends (...args: Array<any>) => any>(callback: T, disableWarn?: boolean): Promise<ReturnType<T> | undefined>;
export declare function isStaticResourcesEqual(url1: string, url2: string): boolean;
export declare function createScript(url: string, cb: (value: void | PromiseLike<void>) => void, attrs?: Record<string, any>, createScriptHook?: (url: string) => HTMLScriptElement | void): {
    script: HTMLScriptElement;
    needAttach: boolean;
};
export declare function createLink(url: string, cb: (value: void | PromiseLike<void>) => void, attrs?: Record<string, string>, createLinkHook?: (url: string) => HTMLLinkElement | void): {
    link: HTMLLinkElement;
    needAttach: boolean;
};
export declare function loadScript(url: string, info: {
    attrs?: Record<string, any>;
    createScriptHook?: (url: string) => HTMLScriptElement | void;
}): Promise<void>;
