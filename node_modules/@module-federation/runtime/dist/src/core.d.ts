import type { ModuleInfo, GlobalModuleInfo } from '@module-federation/sdk';
import { Options, PreloadAssets, PreloadOptions, PreloadRemoteArgs, RemoteEntryExports, Remote, Shared, ShareInfos, UserOptions, RemoteInfo, ShareScopeMap, InitScope, RemoteEntryInitOptions } from './type';
import { Module, ModuleOptions } from './module';
import { AsyncHook, AsyncWaterfallHook, PluginSystem, SyncHook, SyncWaterfallHook } from './utils/hooks';
import { Federation } from './global';
import { SnapshotHandler } from './plugins/snapshot/SnapshotHandler';
interface LoadRemoteMatch {
    id: string;
    pkgNameOrAlias: string;
    expose: string;
    remote: Remote;
    options: Options;
    origin: FederationHost;
    remoteInfo: RemoteInfo;
    remoteSnapshot?: ModuleInfo;
}
export declare class FederationHost {
    options: Options;
    hooks: PluginSystem<{
        beforeInit: SyncWaterfallHook<{
            userOptions: UserOptions;
            options: Options;
            origin: FederationHost;
            shareInfo: ShareInfos;
        }>;
        init: SyncHook<[{
            options: Options;
            origin: FederationHost;
        }], void>;
        beforeRequest: AsyncWaterfallHook<{
            id: string;
            options: Options;
            origin: FederationHost;
        }>;
        afterResolve: AsyncWaterfallHook<LoadRemoteMatch>;
        beforeInitContainer: AsyncWaterfallHook<{
            shareScope: ShareScopeMap[string];
            initScope: InitScope;
            remoteEntryInitOptions: RemoteEntryInitOptions;
            remoteInfo: RemoteInfo;
            origin: FederationHost;
        }>;
        initContainerShareScopeMap: AsyncWaterfallHook<{
            shareScope: ShareScopeMap[string];
            options: Options;
            origin: FederationHost;
        }>;
        initContainer: AsyncWaterfallHook<{
            shareScope: ShareScopeMap[string];
            initScope: InitScope;
            remoteEntryInitOptions: RemoteEntryInitOptions;
            remoteInfo: RemoteInfo;
            remoteEntryExports: RemoteEntryExports;
            origin: FederationHost;
        }>;
        onLoad: AsyncHook<[{
            id: string;
            expose: string;
            pkgNameOrAlias: string;
            remote: Remote;
            options: ModuleOptions;
            origin: FederationHost;
            exposeModule: any;
            exposeModuleFactory: any;
            moduleInstance: Module;
        }], void>;
        handlePreloadModule: SyncHook<{
            id: string;
            name: string;
            remote: Remote;
            remoteSnapshot: ModuleInfo;
            preloadConfig: PreloadRemoteArgs;
            origin: FederationHost;
        }, void>;
        errorLoadRemote: AsyncHook<[{
            id: string;
            error: unknown;
            from: 'build' | 'runtime';
            origin: FederationHost;
        }], unknown>;
        beforeLoadShare: AsyncWaterfallHook<{
            pkgName: string;
            shareInfo?: Shared | undefined;
            shared: Options['shared'];
            origin: FederationHost;
        }>;
        loadShare: AsyncHook<[FederationHost, string, ShareInfos], false | void | Promise<false | void>>;
        resolveShare: SyncWaterfallHook<{
            shareScopeMap: ShareScopeMap;
            scope: string;
            pkgName: string;
            version: string;
            GlobalFederation: Federation;
            resolver: () => Shared | undefined;
        }>;
        beforePreloadRemote: AsyncHook<{
            preloadOps: Array<PreloadRemoteArgs>;
            options: Options;
            origin: FederationHost;
        }, false | void | Promise<false | void>>;
        generatePreloadAssets: AsyncHook<[{
            origin: FederationHost;
            preloadOptions: PreloadOptions[number];
            remote: Remote;
            remoteInfo: RemoteInfo;
            remoteSnapshot: ModuleInfo;
            globalSnapshot: GlobalModuleInfo;
        }], Promise<PreloadAssets>>;
        afterPreloadRemote: AsyncHook<{
            preloadOps: Array<PreloadRemoteArgs>;
            options: Options;
            origin: FederationHost;
        }, false | void | Promise<false | void>>;
    }>;
    version: string;
    name: string;
    moduleCache: Map<string, Module>;
    snapshotHandler: SnapshotHandler;
    shareScopeMap: ShareScopeMap;
    loaderHook: PluginSystem<{
        getModuleInfo: SyncHook<[{
            target: Record<string, any>;
            key: any;
        }], void | {
            value: any | undefined;
            key: string;
        }>;
        createScript: SyncHook<[{
            url: string;
        }], void | HTMLScriptElement>;
        createLink: SyncHook<[{
            url: string;
        }], void | HTMLLinkElement>;
        fetch: AsyncHook<[string, RequestInit], false | void | Promise<Response>>;
    }>;
    constructor(userOptions: UserOptions);
    private _setGlobalShareScopeMap;
    initOptions(userOptions: UserOptions): Options;
    loadShare<T>(pkgName: string, extraOptions?: {
        customShareInfo?: Partial<Shared>;
        resolver?: (sharedOptions: ShareInfos[string]) => Shared;
    }): Promise<false | (() => T | undefined)>;
    loadShareSync<T>(pkgName: string, extraOptions?: {
        customShareInfo?: Partial<Shared>;
        resolver?: (sharedOptions: ShareInfos[string]) => Shared;
    }): () => T | never;
    initRawContainer(name: string, url: string, container: RemoteEntryExports): Module;
    private _getRemoteModuleAndOptions;
    loadRemote<T>(id: string, options?: {
        loadFactory?: boolean;
        from: 'build' | 'runtime';
    }): Promise<T | null>;
    preloadRemote(preloadOptions: Array<PreloadRemoteArgs>): Promise<void>;
    /**
     * This function initializes the sharing sequence (executed only once per share scope).
     * It accepts one argument, the name of the share scope.
     * If the share scope does not exist, it creates one.
     */
    initializeSharing(shareScopeName?: string, strategy?: Shared['strategy']): Array<Promise<void>>;
    initShareScopeMap(scopeName: string, shareScope: ShareScopeMap[string]): void;
    private formatOptions;
    registerPlugins(plugins: UserOptions['plugins']): void;
    private setShared;
    private removeRemote;
    private registerRemote;
    registerRemotes(remotes: Remote[], options?: {
        force?: boolean;
    }): void;
}
export {};
