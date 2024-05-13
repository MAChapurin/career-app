'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var share = require('./share.cjs.js');
var sdk = require('@module-federation/sdk');

// Function to match a remote with its name and expose
// id: pkgName(@federation/app1) + expose(button) = @federation/app1/button
// id: alias(app1) + expose(button) = app1/button
// id: alias(app1/utils) + expose(loadash/sort) = app1/utils/loadash/sort
function matchRemoteWithNameAndExpose(remotes, id) {
    for (const remote of remotes){
        // match pkgName
        const isNameMatched = id.startsWith(remote.name);
        let expose = id.replace(remote.name, '');
        if (isNameMatched) {
            if (expose.startsWith('/')) {
                const pkgNameOrAlias = remote.name;
                expose = `.${expose}`;
                return {
                    pkgNameOrAlias,
                    expose,
                    remote
                };
            } else if (expose === '') {
                return {
                    pkgNameOrAlias: remote.name,
                    expose: '.',
                    remote
                };
            }
        }
        // match alias
        const isAliasMatched = remote.alias && id.startsWith(remote.alias);
        let exposeWithAlias = remote.alias && id.replace(remote.alias, '');
        if (remote.alias && isAliasMatched) {
            if (exposeWithAlias && exposeWithAlias.startsWith('/')) {
                const pkgNameOrAlias = remote.alias;
                exposeWithAlias = `.${exposeWithAlias}`;
                return {
                    pkgNameOrAlias,
                    expose: exposeWithAlias,
                    remote
                };
            } else if (exposeWithAlias === '') {
                return {
                    pkgNameOrAlias: remote.alias,
                    expose: '.',
                    remote
                };
            }
        }
    }
    return;
}
// Function to match a remote with its name or alias
function matchRemote(remotes, nameOrAlias) {
    for (const remote of remotes){
        const isNameMatched = nameOrAlias === remote.name;
        if (isNameMatched) {
            return remote;
        }
        const isAliasMatched = remote.alias && nameOrAlias === remote.alias;
        if (isAliasMatched) {
            return remote;
        }
    }
    return;
}

function registerPlugins$1(plugins, hookInstances) {
    const globalPlugins = share.getGlobalHostPlugins();
    // Incorporate global plugins
    if (globalPlugins.length > 0) {
        globalPlugins.forEach((plugin)=>{
            if (plugins == null ? void 0 : plugins.find((item)=>item.name !== plugin.name)) {
                plugins.push(plugin);
            }
        });
    }
    if (plugins && plugins.length > 0) {
        plugins.forEach((plugin)=>{
            hookInstances.forEach((hookInstance)=>{
                hookInstance.applyPlugin(plugin);
            });
        });
    }
    return plugins;
}

function _extends$5() {
    _extends$5 = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends$5.apply(this, arguments);
}
async function loadEsmEntry({ entry, remoteEntryExports }) {
    return new Promise((resolve, reject)=>{
        try {
            if (!remoteEntryExports) {
                // eslint-disable-next-line no-eval
                new Function('callbacks', `import("${entry}").then(callbacks[0]).catch(callbacks[1])`)([
                    resolve,
                    reject
                ]);
            } else {
                resolve(remoteEntryExports);
            }
        } catch (e) {
            reject(e);
        }
    });
}
async function loadEntryScript({ name, globalName, entry, createScriptHook }) {
    const { entryExports: remoteEntryExports } = share.getRemoteEntryExports(name, globalName);
    if (remoteEntryExports) {
        return remoteEntryExports;
    }
    if (typeof document === 'undefined') {
        return sdk.loadScriptNode(entry, {
            attrs: {
                name,
                globalName
            },
            createScriptHook
        }).then(()=>{
            const { remoteEntryKey, entryExports } = share.getRemoteEntryExports(name, globalName);
            share.assert(entryExports, `
        Unable to use the ${name}'s '${entry}' URL with ${remoteEntryKey}'s globalName to get remoteEntry exports.
        Possible reasons could be:\n
        1. '${entry}' is not the correct URL, or the remoteEntry resource or name is incorrect.\n
        2. ${remoteEntryKey} cannot be used to get remoteEntry exports in the window object.
      `);
            return entryExports;
        }).catch((e)=>{
            return e;
        });
    }
    return sdk.loadScript(entry, {
        attrs: {},
        createScriptHook
    }).then(()=>{
        const { remoteEntryKey, entryExports } = share.getRemoteEntryExports(name, globalName);
        share.assert(entryExports, `
      Unable to use the ${name}'s '${entry}' URL with ${remoteEntryKey}'s globalName to get remoteEntry exports.
      Possible reasons could be:\n
      1. '${entry}' is not the correct URL, or the remoteEntry resource or name is incorrect.\n
      2. ${remoteEntryKey} cannot be used to get remoteEntry exports in the window object.
    `);
        return entryExports;
    }).catch((e)=>{
        return e;
    });
}
function getRemoteEntryUniqueKey(remoteInfo) {
    const { entry, name } = remoteInfo;
    return sdk.composeKeyWithSeparator(name, entry);
}
async function getRemoteEntry({ remoteEntryExports, remoteInfo, createScriptHook }) {
    const { entry, name, type, entryGlobalName } = remoteInfo;
    const uniqueKey = getRemoteEntryUniqueKey(remoteInfo);
    if (remoteEntryExports) {
        return remoteEntryExports;
    }
    if (!share.globalLoading[uniqueKey]) {
        if (type === 'esm') {
            share.globalLoading[uniqueKey] = loadEsmEntry({
                entry,
                remoteEntryExports
            });
        } else {
            share.globalLoading[uniqueKey] = loadEntryScript({
                name,
                globalName: entryGlobalName,
                entry,
                createScriptHook
            });
        }
    }
    return share.globalLoading[uniqueKey];
}
function getRemoteInfo(remote) {
    return _extends$5({}, remote, {
        entry: 'entry' in remote ? remote.entry : '',
        type: remote.type || share.DEFAULT_REMOTE_TYPE,
        entryGlobalName: remote.entryGlobalName || remote.name,
        shareScope: remote.shareScope || share.DEFAULT_SCOPE
    });
}

function _extends$4() {
    _extends$4 = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends$4.apply(this, arguments);
}
let Module = class Module {
    async getEntry() {
        if (this.remoteEntryExports) {
            return this.remoteEntryExports;
        }
        // Get remoteEntry.js
        const remoteEntryExports = await getRemoteEntry({
            remoteInfo: this.remoteInfo,
            remoteEntryExports: this.remoteEntryExports,
            createScriptHook: (url)=>{
                const res = this.host.loaderHook.lifecycle.createScript.emit({
                    url
                });
                if (typeof document === 'undefined') {
                    //todo: needs real fix
                    return res;
                }
                if (res instanceof HTMLScriptElement) {
                    return res;
                }
                return;
            }
        });
        share.assert(remoteEntryExports, `remoteEntryExports is undefined \n ${share.safeToString(this.remoteInfo)}`);
        this.remoteEntryExports = remoteEntryExports;
        return this.remoteEntryExports;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async get(expose, options) {
        const { loadFactory = true } = options || {
            loadFactory: true
        };
        // Get remoteEntry.js
        const remoteEntryExports = await this.getEntry();
        if (!this.inited) {
            const localShareScopeMap = this.host.shareScopeMap;
            const remoteShareScope = this.remoteInfo.shareScope || 'default';
            if (!localShareScopeMap[remoteShareScope]) {
                localShareScopeMap[remoteShareScope] = {};
            }
            const shareScope = localShareScopeMap[remoteShareScope];
            const initScope = [];
            const remoteEntryInitOptions = {
                version: this.remoteInfo.version || ''
            };
            // Help to find host instance
            Object.defineProperty(remoteEntryInitOptions, 'hostId', {
                value: this.host.options.id || this.host.name,
                // remoteEntryInitOptions will be traversed and assigned during container init, ,so this attribute is not allowed to be traversed
                enumerable: false
            });
            const initContainerOptions = await this.host.hooks.lifecycle.beforeInitContainer.emit({
                shareScope,
                // @ts-ignore hostId will be set by Object.defineProperty
                remoteEntryInitOptions,
                initScope,
                remoteInfo: this.remoteInfo,
                origin: this.host
            });
            await remoteEntryExports.init(initContainerOptions.shareScope, initContainerOptions.initScope, initContainerOptions.remoteEntryInitOptions);
            await this.host.hooks.lifecycle.initContainer.emit(_extends$4({}, initContainerOptions, {
                remoteEntryExports
            }));
        }
        this.lib = remoteEntryExports;
        this.inited = true;
        // get exposeGetter
        const moduleFactory = await remoteEntryExports.get(expose);
        share.assert(moduleFactory, `${share.getFMId(this.remoteInfo)} remote don't export ${expose}.`);
        if (!loadFactory) {
            return moduleFactory;
        }
        const exposeContent = await moduleFactory();
        return exposeContent;
    }
    constructor({ remoteInfo, host }){
        this.inited = false;
        this.lib = undefined;
        this.remoteInfo = remoteInfo;
        this.host = host;
    }
};

class SyncHook {
    on(fn) {
        if (typeof fn === 'function') {
            this.listeners.add(fn);
        }
    }
    once(fn) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        this.on(function wrapper(...args) {
            self.remove(wrapper);
            // eslint-disable-next-line prefer-spread
            return fn.apply(null, args);
        });
    }
    emit(...data) {
        let result;
        if (this.listeners.size > 0) {
            // eslint-disable-next-line prefer-spread
            this.listeners.forEach((fn)=>{
                result = fn(...data);
            });
        }
        return result;
    }
    remove(fn) {
        this.listeners.delete(fn);
    }
    removeAll() {
        this.listeners.clear();
    }
    constructor(type){
        this.type = '';
        this.listeners = new Set();
        if (type) {
            this.type = type;
        }
    }
}

class AsyncHook extends SyncHook {
    emit(...data) {
        let result;
        const ls = Array.from(this.listeners);
        if (ls.length > 0) {
            let i = 0;
            const call = (prev)=>{
                if (prev === false) {
                    return false; // Abort process
                } else if (i < ls.length) {
                    return Promise.resolve(ls[i++].apply(null, data)).then(call);
                } else {
                    return prev;
                }
            };
            result = call();
        }
        return Promise.resolve(result);
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function checkReturnData(originalData, returnedData) {
    if (!share.isObject(returnedData)) {
        return false;
    }
    if (originalData !== returnedData) {
        // eslint-disable-next-line no-restricted-syntax
        for(const key in originalData){
            if (!(key in returnedData)) {
                return false;
            }
        }
    }
    return true;
}
class SyncWaterfallHook extends SyncHook {
    emit(data) {
        if (!share.isObject(data)) {
            share.error(`The data for the "${this.type}" hook should be an object.`);
        }
        for (const fn of this.listeners){
            try {
                const tempData = fn(data);
                if (checkReturnData(data, tempData)) {
                    data = tempData;
                } else {
                    this.onerror(`A plugin returned an unacceptable value for the "${this.type}" type.`);
                    break;
                }
            } catch (e) {
                share.warn(e);
                this.onerror(e);
            }
        }
        return data;
    }
    constructor(type){
        super();
        this.onerror = share.error;
        this.type = type;
    }
}

class AsyncWaterfallHook extends SyncHook {
    emit(data) {
        if (!share.isObject(data)) {
            share.error(`The response data for the "${this.type}" hook must be an object.`);
        }
        const ls = Array.from(this.listeners);
        if (ls.length > 0) {
            let i = 0;
            const processError = (e)=>{
                share.warn(e);
                this.onerror(e);
                return data;
            };
            const call = (prevData)=>{
                if (checkReturnData(data, prevData)) {
                    data = prevData;
                    if (i < ls.length) {
                        try {
                            return Promise.resolve(ls[i++](data)).then(call, processError);
                        } catch (e) {
                            return processError(e);
                        }
                    }
                } else {
                    this.onerror(`A plugin returned an incorrect value for the "${this.type}" type.`);
                }
                return data;
            };
            return Promise.resolve(call(data));
        }
        return Promise.resolve(data);
    }
    constructor(type){
        super();
        this.onerror = share.error;
        this.type = type;
    }
}

class PluginSystem {
    applyPlugin(plugin) {
        share.assert(share.isPlainObject(plugin), 'Plugin configuration is invalid.');
        // The plugin's name is mandatory and must be unique
        const pluginName = plugin.name;
        share.assert(pluginName, 'A name must be provided by the plugin.');
        if (!this.registerPlugins[pluginName]) {
            this.registerPlugins[pluginName] = plugin;
            Object.keys(this.lifecycle).forEach((key)=>{
                const pluginLife = plugin[key];
                if (pluginLife) {
                    this.lifecycle[key].on(pluginLife);
                }
            });
        }
    }
    removePlugin(pluginName) {
        share.assert(pluginName, 'A name is required.');
        const plugin = this.registerPlugins[pluginName];
        share.assert(plugin, `The plugin "${pluginName}" is not registered.`);
        Object.keys(plugin).forEach((key)=>{
            if (key !== 'name') {
                this.lifecycle[key].remove(plugin[key]);
            }
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    inherit({ lifecycle, registerPlugins }) {
        Object.keys(lifecycle).forEach((hookName)=>{
            share.assert(!this.lifecycle[hookName], `The hook "${hookName}" has a conflict and cannot be inherited.`);
            this.lifecycle[hookName] = lifecycle[hookName];
        });
        Object.keys(registerPlugins).forEach((pluginName)=>{
            share.assert(!this.registerPlugins[pluginName], `The plugin "${pluginName}" has a conflict and cannot be inherited.`);
            this.applyPlugin(registerPlugins[pluginName]);
        });
    }
    constructor(lifecycle){
        this.registerPlugins = {};
        this.lifecycle = lifecycle;
        this.lifecycleKeys = Object.keys(lifecycle);
    }
}

function _extends$3() {
    _extends$3 = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends$3.apply(this, arguments);
}
function defaultPreloadArgs(preloadConfig) {
    return _extends$3({
        resourceCategory: 'sync',
        share: true,
        depsRemote: true,
        prefetchInterface: false
    }, preloadConfig);
}
function formatPreloadArgs(remotes, preloadArgs) {
    return preloadArgs.map((args)=>{
        const remoteInfo = matchRemote(remotes, args.nameOrAlias);
        share.assert(remoteInfo, `Unable to preload ${args.nameOrAlias} as it is not included in ${!remoteInfo && share.safeToString({
            remoteInfo,
            remotes
        })}`);
        return {
            remote: remoteInfo,
            preloadConfig: defaultPreloadArgs(args)
        };
    });
}
function normalizePreloadExposes(exposes) {
    if (!exposes) {
        return [];
    }
    return exposes.map((expose)=>{
        if (expose === '.') {
            return expose;
        }
        if (expose.startsWith('./')) {
            return expose.replace('./', '');
        }
        return expose;
    });
}
function preloadAssets(remoteInfo, host, assets) {
    const { cssAssets, jsAssetsWithoutEntry, entryAssets } = assets;
    if (host.options.inBrowser) {
        entryAssets.forEach((asset)=>{
            const { moduleInfo } = asset;
            const module = host.moduleCache.get(remoteInfo.name);
            if (module) {
                getRemoteEntry({
                    remoteInfo: moduleInfo,
                    remoteEntryExports: module.remoteEntryExports,
                    createScriptHook: (url)=>{
                        const res = host.loaderHook.lifecycle.createScript.emit({
                            url
                        });
                        if (res instanceof HTMLScriptElement) {
                            return res;
                        }
                        return;
                    }
                });
            } else {
                getRemoteEntry({
                    remoteInfo: moduleInfo,
                    remoteEntryExports: undefined,
                    createScriptHook: (url)=>{
                        const res = host.loaderHook.lifecycle.createScript.emit({
                            url
                        });
                        if (res instanceof HTMLScriptElement) {
                            return res;
                        }
                        return;
                    }
                });
            }
        });
        const fragment = document.createDocumentFragment();
        cssAssets.forEach((cssUrl)=>{
            const { link: cssEl, needAttach } = sdk.createLink(cssUrl, ()=>{}, {
                rel: 'preload',
                as: 'style'
            }, (url)=>{
                const res = host.loaderHook.lifecycle.createLink.emit({
                    url
                });
                if (res instanceof HTMLLinkElement) {
                    return res;
                }
                return;
            });
            needAttach && fragment.appendChild(cssEl);
        });
        jsAssetsWithoutEntry.forEach((jsUrl)=>{
            const { link: linkEl, needAttach } = sdk.createLink(jsUrl, ()=>{
            // noop
            }, {
                rel: 'preload',
                as: 'script'
            }, (url)=>{
                const res = host.loaderHook.lifecycle.createLink.emit({
                    url
                });
                if (res instanceof HTMLLinkElement) {
                    return res;
                }
                return;
            });
            needAttach && document.head.appendChild(linkEl);
        });
        document.head.appendChild(fragment);
    }
}

function _extends$2() {
    _extends$2 = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends$2.apply(this, arguments);
}
function assignRemoteInfo(remoteInfo, remoteSnapshot) {
    if (!('remoteEntry' in remoteSnapshot) || !remoteSnapshot.remoteEntry) {
        share.error(`The attribute remoteEntry of ${name} must not be undefined.`);
    }
    const { remoteEntry } = remoteSnapshot;
    const entryUrl = sdk.getResourceUrl(remoteSnapshot, remoteEntry);
    remoteInfo.type = remoteSnapshot.remoteEntryType;
    remoteInfo.entryGlobalName = remoteSnapshot.globalName;
    remoteInfo.entry = entryUrl;
    remoteInfo.version = remoteSnapshot.version;
    remoteInfo.buildVersion = remoteSnapshot.buildVersion;
}
function snapshotPlugin() {
    return {
        name: 'snapshot-plugin',
        async afterResolve (args) {
            const { remote, pkgNameOrAlias, expose, origin, remoteInfo } = args;
            if (!share.isRemoteInfoWithEntry(remote) || !share.isPureRemoteEntry(remote)) {
                const { remoteSnapshot, globalSnapshot } = await origin.snapshotHandler.loadRemoteSnapshotInfo(remote);
                assignRemoteInfo(remoteInfo, remoteSnapshot);
                // preloading assets
                const preloadOptions = {
                    remote,
                    preloadConfig: {
                        nameOrAlias: pkgNameOrAlias,
                        exposes: [
                            expose
                        ],
                        resourceCategory: 'sync',
                        share: false,
                        depsRemote: false
                    }
                };
                const assets = await origin.hooks.lifecycle.generatePreloadAssets.emit({
                    origin,
                    preloadOptions,
                    remoteInfo,
                    remote,
                    remoteSnapshot,
                    globalSnapshot
                });
                if (assets) {
                    preloadAssets(remoteInfo, origin, assets);
                }
                return _extends$2({}, args, {
                    remoteSnapshot
                });
            }
            return args;
        }
    };
}

// name
// name:version
function splitId(id) {
    const splitInfo = id.split(':');
    if (splitInfo.length === 1) {
        return {
            name: splitInfo[0],
            version: undefined
        };
    } else if (splitInfo.length === 2) {
        return {
            name: splitInfo[0],
            version: splitInfo[1]
        };
    } else {
        return {
            name: splitInfo[1],
            version: splitInfo[2]
        };
    }
}
// Traverse all nodes in moduleInfo and traverse the entire snapshot
function traverseModuleInfo(globalSnapshot, remoteInfo, traverse, isRoot, memo = {}, remoteSnapshot) {
    const id = share.getFMId(remoteInfo);
    const { value: snapshotValue } = share.getInfoWithoutType(globalSnapshot, id);
    const effectiveRemoteSnapshot = remoteSnapshot || snapshotValue;
    if (effectiveRemoteSnapshot && !sdk.isManifestProvider(effectiveRemoteSnapshot)) {
        traverse(effectiveRemoteSnapshot, remoteInfo, isRoot);
        if (effectiveRemoteSnapshot.remotesInfo) {
            const remoteKeys = Object.keys(effectiveRemoteSnapshot.remotesInfo);
            for (const key of remoteKeys){
                if (memo[key]) {
                    continue;
                }
                memo[key] = true;
                const subRemoteInfo = splitId(key);
                const remoteValue = effectiveRemoteSnapshot.remotesInfo[key];
                traverseModuleInfo(globalSnapshot, {
                    name: subRemoteInfo.name,
                    version: remoteValue.matchedVersion
                }, traverse, false, memo, undefined);
            }
        }
    }
}
// eslint-disable-next-line max-lines-per-function
function generatePreloadAssets(origin, preloadOptions, remote, globalSnapshot, remoteSnapshot) {
    const cssAssets = [];
    const jsAssets = [];
    const entryAssets = [];
    const loadedSharedJsAssets = new Set();
    const loadedSharedCssAssets = new Set();
    const { options } = origin;
    const { preloadConfig: rootPreloadConfig } = preloadOptions;
    const { depsRemote } = rootPreloadConfig;
    const memo = {};
    traverseModuleInfo(globalSnapshot, remote, (moduleInfoSnapshot, remoteInfo, isRoot)=>{
        let preloadConfig;
        if (isRoot) {
            preloadConfig = rootPreloadConfig;
        } else {
            if (Array.isArray(depsRemote)) {
                // eslint-disable-next-line array-callback-return
                const findPreloadConfig = depsRemote.find((remoteConfig)=>{
                    if (remoteConfig.nameOrAlias === remoteInfo.name || remoteConfig.nameOrAlias === remoteInfo.alias) {
                        return true;
                    }
                    return false;
                });
                if (!findPreloadConfig) {
                    return;
                }
                preloadConfig = defaultPreloadArgs(findPreloadConfig);
            } else if (depsRemote === true) {
                preloadConfig = rootPreloadConfig;
            } else {
                return;
            }
        }
        const remoteEntryUrl = sdk.getResourceUrl(moduleInfoSnapshot, 'remoteEntry' in moduleInfoSnapshot ? moduleInfoSnapshot.remoteEntry : '');
        if (remoteEntryUrl) {
            entryAssets.push({
                name: remoteInfo.name,
                moduleInfo: {
                    name: remoteInfo.name,
                    entry: remoteEntryUrl,
                    type: 'remoteEntryType' in moduleInfoSnapshot ? moduleInfoSnapshot.remoteEntryType : 'global',
                    entryGlobalName: 'globalName' in moduleInfoSnapshot ? moduleInfoSnapshot.globalName : remoteInfo.name,
                    shareScope: '',
                    version: 'version' in moduleInfoSnapshot ? moduleInfoSnapshot.version : undefined
                },
                url: remoteEntryUrl
            });
        }
        let moduleAssetsInfo = 'modules' in moduleInfoSnapshot ? moduleInfoSnapshot.modules : [];
        const normalizedPreloadExposes = normalizePreloadExposes(preloadConfig.exposes);
        if (normalizedPreloadExposes.length && 'modules' in moduleInfoSnapshot) {
            var _moduleInfoSnapshot_modules;
            moduleAssetsInfo = moduleInfoSnapshot == null ? void 0 : (_moduleInfoSnapshot_modules = moduleInfoSnapshot.modules) == null ? void 0 : _moduleInfoSnapshot_modules.reduce((assets, moduleAssetInfo)=>{
                if ((normalizedPreloadExposes == null ? void 0 : normalizedPreloadExposes.indexOf(moduleAssetInfo.moduleName)) !== -1) {
                    assets.push(moduleAssetInfo);
                }
                return assets;
            }, []);
        }
        function handleAssets(assets) {
            const assetsRes = assets.map((asset)=>sdk.getResourceUrl(moduleInfoSnapshot, asset));
            if (preloadConfig.filter) {
                return assetsRes.filter(preloadConfig.filter);
            }
            return assetsRes;
        }
        if (moduleAssetsInfo) {
            const assetsLength = moduleAssetsInfo.length;
            for(let index = 0; index < assetsLength; index++){
                const assetsInfo = moduleAssetsInfo[index];
                const exposeFullPath = `${remoteInfo.name}/${assetsInfo.moduleName}`;
                origin.hooks.lifecycle.handlePreloadModule.emit({
                    id: assetsInfo.moduleName === '.' ? remoteInfo.name : exposeFullPath,
                    name: remoteInfo.name,
                    remoteSnapshot: moduleInfoSnapshot,
                    preloadConfig,
                    remote: remoteInfo,
                    origin
                });
                const preloaded = share.getPreloaded(exposeFullPath);
                if (preloaded) {
                    continue;
                }
                if (preloadConfig.resourceCategory === 'all') {
                    cssAssets.push(...handleAssets(assetsInfo.assets.css.async));
                    cssAssets.push(...handleAssets(assetsInfo.assets.css.sync));
                    jsAssets.push(...handleAssets(assetsInfo.assets.js.async));
                    jsAssets.push(...handleAssets(assetsInfo.assets.js.sync));
                // eslint-disable-next-line no-constant-condition
                } else if (preloadConfig.resourceCategory = 'sync') {
                    cssAssets.push(...handleAssets(assetsInfo.assets.css.sync));
                    jsAssets.push(...handleAssets(assetsInfo.assets.js.sync));
                }
                share.setPreloaded(exposeFullPath);
            }
        }
    }, true, memo, remoteSnapshot);
    if (remoteSnapshot.shared) {
        const collectSharedAssets = (shareInfo, snapshotShared)=>{
            const registeredShared = share.getRegisteredShare(origin.shareScopeMap, snapshotShared.sharedName, shareInfo, origin.hooks.lifecycle.resolveShare);
            // If the global share does not exist, or the lib function does not exist, it means that the shared has not been loaded yet and can be preloaded.
            if (registeredShared && typeof registeredShared.lib === 'function') {
                snapshotShared.assets.js.sync.forEach((asset)=>{
                    loadedSharedJsAssets.add(asset);
                });
                snapshotShared.assets.css.sync.forEach((asset)=>{
                    loadedSharedCssAssets.add(asset);
                });
            }
        };
        remoteSnapshot.shared.forEach((shared)=>{
            var _options_shared;
            const shareInfos = (_options_shared = options.shared) == null ? void 0 : _options_shared[shared.sharedName];
            if (!shareInfos) {
                return;
            }
            // if no version, preload all shared
            const sharedOptions = shared.version ? shareInfos.find((s)=>s.version === shared.version) : shareInfos;
            if (!sharedOptions) {
                return;
            }
            const arrayShareInfo = share.arrayOptions(sharedOptions);
            arrayShareInfo.forEach((s)=>{
                collectSharedAssets(s, shared);
            });
        });
    }
    const needPreloadJsAssets = jsAssets.filter((asset)=>!loadedSharedJsAssets.has(asset));
    const needPreloadCssAssets = cssAssets.filter((asset)=>!loadedSharedCssAssets.has(asset));
    return {
        cssAssets: needPreloadCssAssets,
        jsAssetsWithoutEntry: needPreloadJsAssets,
        entryAssets
    };
}
const generatePreloadAssetsPlugin = function() {
    return {
        name: 'generate-preload-assets-plugin',
        async generatePreloadAssets (args) {
            const { origin, preloadOptions, remoteInfo, remote, globalSnapshot, remoteSnapshot } = args;
            if (share.isRemoteInfoWithEntry(remote) && share.isPureRemoteEntry(remote)) {
                return {
                    cssAssets: [],
                    jsAssetsWithoutEntry: [],
                    entryAssets: [
                        {
                            name: remote.name,
                            url: remote.entry,
                            moduleInfo: {
                                name: remoteInfo.name,
                                entry: remote.entry,
                                type: 'global',
                                entryGlobalName: '',
                                shareScope: ''
                            }
                        }
                    ]
                };
            }
            assignRemoteInfo(remoteInfo, remoteSnapshot);
            const assets = generatePreloadAssets(origin, preloadOptions, remoteInfo, globalSnapshot, remoteSnapshot);
            return assets;
        }
    };
};

function _extends$1() {
    _extends$1 = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends$1.apply(this, arguments);
}
class SnapshotHandler {
    async loadSnapshot(moduleInfo) {
        const { options } = this.HostInstance;
        const { hostGlobalSnapshot, remoteSnapshot, globalSnapshot } = this.getGlobalRemoteInfo(moduleInfo);
        const { remoteSnapshot: globalRemoteSnapshot, globalSnapshot: globalSnapshotRes } = await this.hooks.lifecycle.loadSnapshot.emit({
            options,
            moduleInfo,
            hostGlobalSnapshot,
            remoteSnapshot,
            globalSnapshot
        });
        return {
            remoteSnapshot: globalRemoteSnapshot,
            globalSnapshot: globalSnapshotRes
        };
    }
    // eslint-disable-next-line max-lines-per-function
    async loadRemoteSnapshotInfo(moduleInfo) {
        const { options } = this.HostInstance;
        await this.hooks.lifecycle.beforeLoadRemoteSnapshot.emit({
            options,
            moduleInfo
        });
        let hostSnapshot = share.getGlobalSnapshotInfoByModuleInfo({
            name: this.HostInstance.options.name,
            version: this.HostInstance.options.version
        });
        if (!hostSnapshot) {
            hostSnapshot = {
                version: this.HostInstance.options.version || '',
                remoteEntry: '',
                remotesInfo: {}
            };
            share.addGlobalSnapshot({
                [this.HostInstance.options.name]: hostSnapshot
            });
        }
        // In dynamic loadRemote scenarios, incomplete remotesInfo delivery may occur. In such cases, the remotesInfo in the host needs to be completed in the snapshot at runtime.
        // This ensures the snapshot's integrity and helps the chrome plugin correctly identify all producer modules, ensuring that proxyable producer modules will not be missing.
        if (hostSnapshot && 'remotesInfo' in hostSnapshot && !share.getInfoWithoutType(hostSnapshot.remotesInfo, moduleInfo.name).value) {
            if ('version' in moduleInfo || 'entry' in moduleInfo) {
                hostSnapshot.remotesInfo = _extends$1({}, hostSnapshot == null ? void 0 : hostSnapshot.remotesInfo, {
                    [moduleInfo.name]: {
                        matchedVersion: 'version' in moduleInfo ? moduleInfo.version : moduleInfo.entry
                    }
                });
            }
        }
        const { hostGlobalSnapshot, remoteSnapshot, globalSnapshot } = this.getGlobalRemoteInfo(moduleInfo);
        const { remoteSnapshot: globalRemoteSnapshot, globalSnapshot: globalSnapshotRes } = await this.hooks.lifecycle.loadSnapshot.emit({
            options,
            moduleInfo,
            hostGlobalSnapshot,
            remoteSnapshot,
            globalSnapshot
        });
        // global snapshot includes manifest or module info includes manifest
        if (globalRemoteSnapshot) {
            if (sdk.isManifestProvider(globalRemoteSnapshot)) {
                const moduleSnapshot = await this.getManifestJson(globalRemoteSnapshot.remoteEntry, moduleInfo, {});
                // eslint-disable-next-line @typescript-eslint/no-shadow
                const globalSnapshotRes = share.setGlobalSnapshotInfoByModuleInfo(_extends$1({}, moduleInfo, {
                    // The global remote may be overridden
                    // Therefore, set the snapshot key to the global address of the actual request
                    entry: globalRemoteSnapshot.remoteEntry
                }), moduleSnapshot);
                return {
                    remoteSnapshot: moduleSnapshot,
                    globalSnapshot: globalSnapshotRes
                };
            } else {
                const { remoteSnapshot: remoteSnapshotRes } = await this.hooks.lifecycle.loadRemoteSnapshot.emit({
                    options: this.HostInstance.options,
                    moduleInfo,
                    remoteSnapshot: globalRemoteSnapshot,
                    from: 'global'
                });
                return {
                    remoteSnapshot: remoteSnapshotRes,
                    globalSnapshot: globalSnapshotRes
                };
            }
        } else {
            if (share.isRemoteInfoWithEntry(moduleInfo)) {
                // get from manifest.json and merge remote info from remote server
                const moduleSnapshot = await this.getManifestJson(moduleInfo.entry, moduleInfo, {});
                // eslint-disable-next-line @typescript-eslint/no-shadow
                const globalSnapshotRes = share.setGlobalSnapshotInfoByModuleInfo(moduleInfo, moduleSnapshot);
                const { remoteSnapshot: remoteSnapshotRes } = await this.hooks.lifecycle.loadRemoteSnapshot.emit({
                    options: this.HostInstance.options,
                    moduleInfo,
                    remoteSnapshot: moduleSnapshot,
                    from: 'global'
                });
                return {
                    remoteSnapshot: remoteSnapshotRes,
                    globalSnapshot: globalSnapshotRes
                };
            } else {
                share.error(`
          Cannot get remoteSnapshot with the name: '${moduleInfo.name}', version: '${moduleInfo.version}' from __FEDERATION__.moduleInfo. The following reasons may be causing the problem:\n
          1. The Deploy platform did not deliver the correct data. You can use __FEDERATION__.moduleInfo to check the remoteInfo.\n
          2. The remote '${moduleInfo.name}' version '${moduleInfo.version}' is not released.\n
          The transformed module info: ${JSON.stringify(globalSnapshotRes)}
        `);
            }
        }
    }
    getGlobalRemoteInfo(moduleInfo) {
        const hostGlobalSnapshot = share.getGlobalSnapshotInfoByModuleInfo({
            name: this.HostInstance.options.name,
            version: this.HostInstance.options.version
        });
        // get remote detail info from global
        const globalRemoteInfo = hostGlobalSnapshot && 'remotesInfo' in hostGlobalSnapshot && hostGlobalSnapshot.remotesInfo && share.getInfoWithoutType(hostGlobalSnapshot.remotesInfo, moduleInfo.name).value;
        if (globalRemoteInfo && globalRemoteInfo.matchedVersion) {
            return {
                hostGlobalSnapshot,
                globalSnapshot: share.getGlobalSnapshot(),
                remoteSnapshot: share.getGlobalSnapshotInfoByModuleInfo({
                    name: moduleInfo.name,
                    version: globalRemoteInfo.matchedVersion
                })
            };
        }
        return {
            hostGlobalSnapshot: undefined,
            globalSnapshot: share.getGlobalSnapshot(),
            remoteSnapshot: share.getGlobalSnapshotInfoByModuleInfo({
                name: moduleInfo.name,
                version: 'version' in moduleInfo ? moduleInfo.version : undefined
            })
        };
    }
    async getManifestJson(manifestUrl, moduleInfo, extraOptions) {
        const getManifest = async ()=>{
            let manifestJson = this.manifestCache.get(manifestUrl);
            if (manifestJson) {
                return manifestJson;
            }
            try {
                let res = await this.loaderHook.lifecycle.fetch.emit(manifestUrl, {});
                if (!res || !(res instanceof Response)) {
                    res = await fetch(manifestUrl, {});
                }
                manifestJson = await res.json();
                share.assert(manifestJson.metaData && manifestJson.exposes && manifestJson.shared, `${manifestUrl} is not a federation manifest`);
                this.manifestCache.set(manifestUrl, manifestJson);
                return manifestJson;
            } catch (err) {
                share.error(`Failed to get manifestJson for ${moduleInfo.name}. The manifest URL is ${manifestUrl}. Please ensure that the manifestUrl is accessible.
          \n Error message:
          \n ${err}`);
            }
        };
        const asyncLoadProcess = async ()=>{
            const manifestJson = await getManifest();
            const remoteSnapshot = sdk.generateSnapshotFromManifest(manifestJson, {
                version: manifestUrl
            });
            const { remoteSnapshot: remoteSnapshotRes } = await this.hooks.lifecycle.loadRemoteSnapshot.emit({
                options: this.HostInstance.options,
                moduleInfo,
                manifestJson,
                remoteSnapshot,
                manifestUrl,
                from: 'manifest'
            });
            return remoteSnapshotRes;
        };
        if (!this.manifestLoading[manifestUrl]) {
            this.manifestLoading[manifestUrl] = asyncLoadProcess().then((res)=>res);
        }
        return this.manifestLoading[manifestUrl];
    }
    constructor(HostInstance){
        this.loadingHostSnapshot = null;
        this.manifestCache = new Map();
        this.hooks = new PluginSystem({
            beforeLoadRemoteSnapshot: new AsyncHook('beforeLoadRemoteSnapshot'),
            loadSnapshot: new AsyncWaterfallHook('loadGlobalSnapshot'),
            loadRemoteSnapshot: new AsyncWaterfallHook('loadRemoteSnapshot')
        });
        this.manifestLoading = share.Global.__FEDERATION__.__MANIFEST_LOADING__;
        this.HostInstance = HostInstance;
        this.loaderHook = HostInstance.loaderHook;
    }
}

function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
class FederationHost {
    _setGlobalShareScopeMap() {
        const globalShareScopeMap = share.getGlobalShareScope();
        const identifier = this.options.id || this.options.name;
        if (identifier && !globalShareScopeMap[identifier]) {
            globalShareScopeMap[identifier] = this.shareScopeMap;
        }
    }
    initOptions(userOptions) {
        this.registerPlugins(userOptions.plugins);
        const options = this.formatOptions(this.options, userOptions);
        this.options = options;
        return options;
    }
    async loadShare(pkgName, extraOptions) {
        // This function performs the following steps:
        // 1. Checks if the currently loaded share already exists, if not, it throws an error
        // 2. Searches globally for a matching share, if found, it uses it directly
        // 3. If not found, it retrieves it from the current share and stores the obtained share globally.
        const shareInfo = share.getTargetSharedOptions({
            pkgName,
            extraOptions,
            shareInfos: this.options.shared
        });
        if (shareInfo == null ? void 0 : shareInfo.scope) {
            await Promise.all(shareInfo.scope.map(async (shareScope)=>{
                await Promise.all(this.initializeSharing(shareScope, shareInfo.strategy));
                return;
            }));
        }
        const loadShareRes = await this.hooks.lifecycle.beforeLoadShare.emit({
            pkgName,
            shareInfo,
            shared: this.options.shared,
            origin: this
        });
        const { shareInfo: shareInfoRes } = loadShareRes;
        // Assert that shareInfoRes exists, if not, throw an error
        share.assert(shareInfoRes, `Cannot find ${pkgName} Share in the ${this.options.name}. Please ensure that the ${pkgName} Share parameters have been injected`);
        // Retrieve from cache
        const registeredShared = share.getRegisteredShare(this.shareScopeMap, pkgName, shareInfoRes, this.hooks.lifecycle.resolveShare);
        const addUseIn = (shared)=>{
            if (!shared.useIn) {
                shared.useIn = [];
            }
            share.addUniqueItem(shared.useIn, this.options.name);
        };
        if (registeredShared && registeredShared.lib) {
            addUseIn(registeredShared);
            return registeredShared.lib;
        } else if (registeredShared && registeredShared.loading && !registeredShared.loaded) {
            const factory = await registeredShared.loading;
            registeredShared.loaded = true;
            if (!registeredShared.lib) {
                registeredShared.lib = factory;
            }
            addUseIn(registeredShared);
            return factory;
        } else if (registeredShared) {
            const asyncLoadProcess = async ()=>{
                const factory = await registeredShared.get();
                shareInfoRes.lib = factory;
                shareInfoRes.loaded = true;
                addUseIn(shareInfoRes);
                const gShared = share.getRegisteredShare(this.shareScopeMap, pkgName, shareInfoRes, this.hooks.lifecycle.resolveShare);
                if (gShared) {
                    gShared.lib = factory;
                    gShared.loaded = true;
                }
                return factory;
            };
            const loading = asyncLoadProcess();
            this.setShared({
                pkgName,
                loaded: false,
                shared: registeredShared,
                from: this.options.name,
                lib: null,
                loading
            });
            return loading;
        } else {
            if (extraOptions == null ? void 0 : extraOptions.customShareInfo) {
                return false;
            }
            const asyncLoadProcess = async ()=>{
                const factory = await shareInfoRes.get();
                shareInfoRes.lib = factory;
                shareInfoRes.loaded = true;
                addUseIn(shareInfoRes);
                const gShared = share.getRegisteredShare(this.shareScopeMap, pkgName, shareInfoRes, this.hooks.lifecycle.resolveShare);
                if (gShared) {
                    gShared.lib = factory;
                    gShared.loaded = true;
                }
                return factory;
            };
            const loading = asyncLoadProcess();
            this.setShared({
                pkgName,
                loaded: false,
                shared: shareInfoRes,
                from: this.options.name,
                lib: null,
                loading
            });
            return loading;
        }
    }
    // The lib function will only be available if the shared set by eager or runtime init is set or the shared is successfully loaded.
    // 1. If the loaded shared already exists globally, then it will be reused
    // 2. If lib exists in local shared, it will be used directly
    // 3. If the local get returns something other than Promise, then it will be used directly
    loadShareSync(pkgName, extraOptions) {
        const shareInfo = share.getTargetSharedOptions({
            pkgName,
            extraOptions,
            shareInfos: this.options.shared
        });
        if (shareInfo == null ? void 0 : shareInfo.scope) {
            shareInfo.scope.forEach((shareScope)=>{
                this.initializeSharing(shareScope, shareInfo.strategy);
            });
        }
        const registeredShared = share.getRegisteredShare(this.shareScopeMap, pkgName, shareInfo, this.hooks.lifecycle.resolveShare);
        const addUseIn = (shared)=>{
            if (!shared.useIn) {
                shared.useIn = [];
            }
            share.addUniqueItem(shared.useIn, this.options.name);
        };
        if (registeredShared) {
            if (typeof registeredShared.lib === 'function') {
                addUseIn(registeredShared);
                if (!registeredShared.loaded) {
                    registeredShared.loaded = true;
                    if (registeredShared.from === this.options.name) {
                        shareInfo.loaded = true;
                    }
                }
                return registeredShared.lib;
            }
            if (typeof registeredShared.get === 'function') {
                const module = registeredShared.get();
                if (!(module instanceof Promise)) {
                    addUseIn(registeredShared);
                    this.setShared({
                        pkgName,
                        loaded: true,
                        from: this.options.name,
                        lib: module,
                        shared: registeredShared
                    });
                    return module;
                }
            }
        }
        if (shareInfo.lib) {
            if (!shareInfo.loaded) {
                shareInfo.loaded = true;
            }
            return shareInfo.lib;
        }
        if (shareInfo.get) {
            const module = shareInfo.get();
            if (module instanceof Promise) {
                throw new Error(`
        The loadShareSync function was unable to load ${pkgName}. The ${pkgName} could not be found in ${this.options.name}.
        Possible reasons for failure: \n
        1. The ${pkgName} share was registered with the 'get' attribute, but loadShare was not used beforehand.\n
        2. The ${pkgName} share was not registered with the 'lib' attribute.\n
      `);
            }
            shareInfo.lib = module;
            this.setShared({
                pkgName,
                loaded: true,
                from: this.options.name,
                lib: shareInfo.lib,
                shared: shareInfo
            });
            return shareInfo.lib;
        }
        throw new Error(`
        The loadShareSync function was unable to load ${pkgName}. The ${pkgName} could not be found in ${this.options.name}.
        Possible reasons for failure: \n
        1. The ${pkgName} share was registered with the 'get' attribute, but loadShare was not used beforehand.\n
        2. The ${pkgName} share was not registered with the 'lib' attribute.\n
      `);
    }
    initRawContainer(name, url, container) {
        const remoteInfo = getRemoteInfo({
            name,
            entry: url
        });
        const module = new Module({
            host: this,
            remoteInfo
        });
        module.remoteEntryExports = container;
        this.moduleCache.set(name, module);
        return module;
    }
    async _getRemoteModuleAndOptions(id) {
        const loadRemoteArgs = await this.hooks.lifecycle.beforeRequest.emit({
            id,
            options: this.options,
            origin: this
        });
        const { id: idRes } = loadRemoteArgs;
        const remoteSplitInfo = matchRemoteWithNameAndExpose(this.options.remotes, idRes);
        share.assert(remoteSplitInfo, `
        Unable to locate ${idRes} in ${this.options.name}. Potential reasons for failure include:\n
        1. ${idRes} was not included in the 'remotes' parameter of ${this.options.name || 'the host'}.\n
        2. ${idRes} could not be found in the 'remotes' of ${this.options.name} with either 'name' or 'alias' attributes.
        3. ${idRes} is not online, injected, or loaded.
        4. ${idRes}  cannot be accessed on the expected.
        5. The 'beforeRequest' hook was provided but did not return the correct 'remoteInfo' when attempting to load ${idRes}.
      `);
        const { remote: rawRemote } = remoteSplitInfo;
        const remoteInfo = getRemoteInfo(rawRemote);
        const matchInfo = await this.hooks.lifecycle.afterResolve.emit(_extends({
            id: idRes
        }, remoteSplitInfo, {
            options: this.options,
            origin: this,
            remoteInfo
        }));
        const { remote, expose } = matchInfo;
        share.assert(remote && expose, `The 'beforeRequest' hook was executed, but it failed to return the correct 'remote' and 'expose' values while loading ${idRes}.`);
        let module = this.moduleCache.get(remote.name);
        const moduleOptions = {
            host: this,
            remoteInfo
        };
        if (!module) {
            module = new Module(moduleOptions);
            this.moduleCache.set(remote.name, module);
        }
        return {
            module,
            moduleOptions,
            remoteMatchInfo: matchInfo
        };
    }
    // eslint-disable-next-line max-lines-per-function
    // eslint-disable-next-line @typescript-eslint/member-ordering
    async loadRemote(id, options) {
        try {
            const { loadFactory = true } = options || {
                loadFactory: true
            };
            // 1. Validate the parameters of the retrieved module. There are two module request methods: pkgName + expose and alias + expose.
            // 2. Request the snapshot information of the current host and globally store the obtained snapshot information. The retrieved module information is partially offline and partially online. The online module information will retrieve the modules used online.
            // 3. Retrieve the detailed information of the current module from global (remoteEntry address, expose resource address)
            // 4. After retrieving remoteEntry, call the init of the module, and then retrieve the exported content of the module through get
            // id: pkgName(@federation/app1) + expose(button) = @federation/app1/button
            // id: alias(app1) + expose(button) = app1/button
            // id: alias(app1/utils) + expose(loadash/sort) = app1/utils/loadash/sort
            const { module, moduleOptions, remoteMatchInfo } = await this._getRemoteModuleAndOptions(id);
            const { pkgNameOrAlias, remote, expose, id: idRes } = remoteMatchInfo;
            const moduleOrFactory = await module.get(expose, options);
            const moduleWrapper = await this.hooks.lifecycle.onLoad.emit({
                id: idRes,
                pkgNameOrAlias,
                expose,
                exposeModule: loadFactory ? moduleOrFactory : undefined,
                exposeModuleFactory: loadFactory ? undefined : moduleOrFactory,
                remote,
                options: moduleOptions,
                moduleInstance: module,
                origin: this
            });
            if (typeof moduleWrapper === 'function') {
                return moduleWrapper;
            }
            return moduleOrFactory;
        } catch (error) {
            const { from = 'runtime' } = options || {
                from: 'runtime'
            };
            const failOver = await this.hooks.lifecycle.errorLoadRemote.emit({
                id,
                error,
                from,
                origin: this
            });
            if (!failOver) {
                throw error;
            }
            return failOver;
        }
    }
    // eslint-disable-next-line @typescript-eslint/member-ordering
    async preloadRemote(preloadOptions) {
        await this.hooks.lifecycle.beforePreloadRemote.emit({
            preloadOptions,
            options: this.options,
            origin: this
        });
        const preloadOps = formatPreloadArgs(this.options.remotes, preloadOptions);
        await Promise.all(preloadOps.map(async (ops)=>{
            const { remote } = ops;
            const remoteInfo = getRemoteInfo(remote);
            const { globalSnapshot, remoteSnapshot } = await this.snapshotHandler.loadRemoteSnapshotInfo(remote);
            const assets = await this.hooks.lifecycle.generatePreloadAssets.emit({
                origin: this,
                preloadOptions: ops,
                remote,
                remoteInfo,
                globalSnapshot,
                remoteSnapshot
            });
            if (!assets) {
                return;
            }
            preloadAssets(remoteInfo, this, assets);
        }));
    }
    /**
   * This function initializes the sharing sequence (executed only once per share scope).
   * It accepts one argument, the name of the share scope.
   * If the share scope does not exist, it creates one.
   */ // eslint-disable-next-line @typescript-eslint/member-ordering
    initializeSharing(shareScopeName = share.DEFAULT_SCOPE, strategy) {
        const shareScope = this.shareScopeMap;
        const hostName = this.options.name;
        // Creates a new share scope if necessary
        if (!shareScope[shareScopeName]) {
            shareScope[shareScopeName] = {};
        }
        // Executes all initialization snippets from all accessible modules
        const scope = shareScope[shareScopeName];
        const register = (name, shared)=>{
            var _activeVersion_shareConfig;
            const { version, eager } = shared;
            scope[name] = scope[name] || {};
            const versions = scope[name];
            const activeVersion = versions[version];
            const activeVersionEager = Boolean(activeVersion && (activeVersion.eager || ((_activeVersion_shareConfig = activeVersion.shareConfig) == null ? void 0 : _activeVersion_shareConfig.eager)));
            if (!activeVersion || activeVersion.strategy !== 'loaded-first' && !activeVersion.loaded && (Boolean(!eager) !== !activeVersionEager ? eager : hostName > activeVersion.from)) {
                versions[version] = shared;
            }
        };
        const promises = [];
        const initFn = (mod)=>mod && mod.init && mod.init(shareScope[shareScopeName]);
        const initRemoteModule = async (key)=>{
            const { module } = await this._getRemoteModuleAndOptions(key);
            if (module.getEntry) {
                const entry = await module.getEntry();
                if (!module.inited) {
                    initFn(entry);
                    module.inited = true;
                }
            }
        };
        Object.keys(this.options.shared).forEach((shareName)=>{
            const sharedArr = this.options.shared[shareName];
            sharedArr.forEach((shared)=>{
                if (shared.scope.includes(shareScopeName)) {
                    register(shareName, shared);
                }
            });
        });
        if (strategy === 'version-first') {
            this.options.remotes.forEach((remote)=>{
                if (remote.shareScope === shareScopeName) {
                    promises.push(initRemoteModule(remote.name));
                }
            });
        }
        return promises;
    }
    initShareScopeMap(scopeName, shareScope) {
        this.shareScopeMap[scopeName] = shareScope;
        this.hooks.lifecycle.initContainerShareScopeMap.emit({
            shareScope,
            options: this.options,
            origin: this
        });
    }
    formatOptions(globalOptions, userOptions) {
        const formatShareOptions = share.formatShareConfigs(userOptions.shared || {}, userOptions.name);
        const shared = _extends({}, globalOptions.shared);
        Object.keys(formatShareOptions).forEach((shareKey)=>{
            if (!shared[shareKey]) {
                shared[shareKey] = formatShareOptions[shareKey];
            } else {
                formatShareOptions[shareKey].forEach((newUserSharedOptions)=>{
                    const isSameVersion = shared[shareKey].find((sharedVal)=>sharedVal.version === newUserSharedOptions.version);
                    if (!isSameVersion) {
                        shared[shareKey].push(newUserSharedOptions);
                    }
                });
            }
        });
        const { userOptions: userOptionsRes, options: globalOptionsRes } = this.hooks.lifecycle.beforeInit.emit({
            origin: this,
            userOptions,
            options: globalOptions,
            shareInfo: shared
        });
        const userRemotes = userOptionsRes.remotes || [];
        const remotes = userRemotes.reduce((res, remote)=>{
            this.registerRemote(remote, res, {
                force: false
            });
            return res;
        }, globalOptionsRes.remotes);
        // register shared in shareScopeMap
        const sharedKeys = Object.keys(formatShareOptions);
        sharedKeys.forEach((sharedKey)=>{
            const sharedVals = formatShareOptions[sharedKey];
            sharedVals.forEach((sharedVal)=>{
                const registeredShared = share.getRegisteredShare(this.shareScopeMap, sharedKey, sharedVal, this.hooks.lifecycle.resolveShare);
                if (!registeredShared && sharedVal && sharedVal.lib) {
                    this.setShared({
                        pkgName: sharedKey,
                        lib: sharedVal.lib,
                        get: sharedVal.get,
                        loaded: true,
                        shared: sharedVal,
                        from: userOptions.name
                    });
                }
            });
        });
        const plugins = [
            ...globalOptionsRes.plugins
        ];
        if (userOptionsRes.plugins) {
            userOptionsRes.plugins.forEach((plugin)=>{
                if (!plugins.includes(plugin)) {
                    plugins.push(plugin);
                }
            });
        }
        const optionsRes = _extends({}, globalOptions, userOptions, {
            plugins,
            remotes,
            shared
        });
        this.hooks.lifecycle.init.emit({
            origin: this,
            options: optionsRes
        });
        return optionsRes;
    }
    registerPlugins(plugins) {
        const pluginRes = registerPlugins$1(plugins, [
            this.hooks,
            this.snapshotHandler.hooks,
            this.loaderHook
        ]);
        // Merge plugin
        this.options.plugins = this.options.plugins.reduce((res, plugin)=>{
            if (res && !res.find((item)=>item.name === plugin.name)) {
                res.push(plugin);
            }
            return res;
        }, pluginRes || []);
    }
    setShared({ pkgName, shared, from, lib, loading, loaded, get }) {
        const { version, scope = 'default' } = shared, shareInfo = _object_without_properties_loose(shared, [
            "version",
            "scope"
        ]);
        const scopes = Array.isArray(scope) ? scope : [
            scope
        ];
        scopes.forEach((sc)=>{
            if (!this.shareScopeMap[sc]) {
                this.shareScopeMap[sc] = {};
            }
            if (!this.shareScopeMap[sc][pkgName]) {
                this.shareScopeMap[sc][pkgName] = {};
            }
            if (this.shareScopeMap[sc][pkgName][version]) {
                return;
            }
            this.shareScopeMap[sc][pkgName][version] = _extends({
                version,
                scope: [
                    'default'
                ]
            }, shareInfo, {
                lib,
                loaded,
                loading
            });
            if (get) {
                this.shareScopeMap[sc][pkgName][version].get = get;
            }
        });
    }
    removeRemote(remote) {
        const { name } = remote;
        const remoteIndex = this.options.remotes.findIndex((item)=>item.name === name);
        if (remoteIndex !== -1) {
            this.options.remotes.splice(remoteIndex, 1);
        }
        const loadedModule = this.moduleCache.get(remote.name);
        if (loadedModule) {
            const key = loadedModule.remoteInfo.entryGlobalName;
            if (globalThis[key]) {
                delete globalThis[key];
            }
            const remoteEntryUniqueKey = getRemoteEntryUniqueKey(loadedModule.remoteInfo);
            if (share.globalLoading[remoteEntryUniqueKey]) {
                delete share.globalLoading[remoteEntryUniqueKey];
            }
            this.moduleCache.delete(remote.name);
        }
    }
    registerRemote(remote, targetRemotes, options) {
        const normalizeRemote = ()=>{
            if (remote.alias) {
                // Validate if alias equals the prefix of remote.name and remote.alias, if so, throw an error
                // As multi-level path references cannot guarantee unique names, alias being a prefix of remote.name is not supported
                const findEqual = targetRemotes.find((item)=>{
                    var _item_alias;
                    return remote.alias && (item.name.startsWith(remote.alias) || ((_item_alias = item.alias) == null ? void 0 : _item_alias.startsWith(remote.alias)));
                });
                share.assert(!findEqual, `The alias ${remote.alias} of remote ${remote.name} is not allowed to be the prefix of ${findEqual && findEqual.name} name or alias`);
            }
            // Set the remote entry to a complete path
            if ('entry' in remote) {
                if (share.isBrowserEnv() && !remote.entry.startsWith('http')) {
                    remote.entry = new URL(remote.entry, window.location.origin).href;
                }
            }
            if (!remote.shareScope) {
                remote.shareScope = share.DEFAULT_SCOPE;
            }
            if (!remote.type) {
                remote.type = share.DEFAULT_REMOTE_TYPE;
            }
        };
        const registeredRemote = targetRemotes.find((item)=>item.name === remote.name);
        if (!registeredRemote) {
            normalizeRemote();
            targetRemotes.push(remote);
        } else {
            const messages = [
                `The remote "${remote.name}" is already registered.`,
                (options == null ? void 0 : options.force) ? 'Hope you have known that OVERRIDE it may have some unexpected errors' : 'If you want to merge the remote, you can set "force: true".'
            ];
            if (options == null ? void 0 : options.force) {
                // remove registered remote
                this.removeRemote(registeredRemote);
                normalizeRemote();
                targetRemotes.push(remote);
            }
            share.warn(messages.join(' '));
        }
    }
    registerRemotes(remotes, options) {
        remotes.forEach((remote)=>{
            this.registerRemote(remote, this.options.remotes, {
                force: options == null ? void 0 : options.force
            });
        });
    }
    constructor(userOptions){
        this.hooks = new PluginSystem({
            beforeInit: new SyncWaterfallHook('beforeInit'),
            init: new SyncHook(),
            beforeRequest: new AsyncWaterfallHook('beforeRequest'),
            afterResolve: new AsyncWaterfallHook('afterResolve'),
            // maybe will change, temporarily for internal use only
            beforeInitContainer: new AsyncWaterfallHook('beforeInitContainer'),
            // maybe will change, temporarily for internal use only
            initContainerShareScopeMap: new AsyncWaterfallHook('initContainer'),
            // maybe will change, temporarily for internal use only
            initContainer: new AsyncWaterfallHook('initContainer'),
            onLoad: new AsyncHook('onLoad'),
            handlePreloadModule: new SyncHook('handlePreloadModule'),
            errorLoadRemote: new AsyncHook('errorLoadRemote'),
            beforeLoadShare: new AsyncWaterfallHook('beforeLoadShare'),
            // not used yet
            loadShare: new AsyncHook(),
            resolveShare: new SyncWaterfallHook('resolveShare'),
            beforePreloadRemote: new AsyncHook(),
            generatePreloadAssets: new AsyncHook('generatePreloadAssets'),
            // not used yet
            afterPreloadRemote: new AsyncHook()
        });
        this.version = "0.1.6";
        this.moduleCache = new Map();
        this.loaderHook = new PluginSystem({
            // FIXME: may not be suitable , not open to the public yet
            getModuleInfo: new SyncHook(),
            createScript: new SyncHook(),
            createLink: new SyncHook(),
            // only work for manifest , so not open to the public yet
            fetch: new AsyncHook('fetch')
        });
        // TODO: Validate the details of the options
        // Initialize options with default values
        const defaultOptions = {
            id: share.getBuilderId(),
            name: userOptions.name,
            plugins: [
                snapshotPlugin(),
                generatePreloadAssetsPlugin()
            ],
            remotes: [],
            shared: {},
            inBrowser: share.isBrowserEnv()
        };
        this.name = userOptions.name;
        this.options = defaultOptions;
        this.shareScopeMap = {};
        this._setGlobalShareScopeMap();
        this.snapshotHandler = new SnapshotHandler(this);
        this.registerPlugins([
            ...defaultOptions.plugins,
            ...userOptions.plugins || []
        ]);
        this.options = this.formatOptions(defaultOptions, userOptions);
    }
}

let FederationInstance = null;
function init(options) {
    // Retrieve the same instance with the same name
    const instance = share.getGlobalFederationInstance(options.name, options.version);
    if (!instance) {
        // Retrieve debug constructor
        const FederationConstructor = share.getGlobalFederationConstructor() || FederationHost;
        FederationInstance = new FederationConstructor(options);
        share.setGlobalFederationInstance(FederationInstance);
        return FederationInstance;
    } else {
        // Merge options
        instance.initOptions(options);
        if (!FederationInstance) {
            FederationInstance = instance;
        }
        return instance;
    }
}
function loadRemote(...args) {
    share.assert(FederationInstance, 'Please call init first');
    // eslint-disable-next-line prefer-spread
    return FederationInstance.loadRemote.apply(FederationInstance, args);
}
function loadShare(...args) {
    share.assert(FederationInstance, 'Please call init first');
    // eslint-disable-next-line prefer-spread
    return FederationInstance.loadShare.apply(FederationInstance, args);
}
function loadShareSync(...args) {
    share.assert(FederationInstance, 'Please call init first');
    // eslint-disable-next-line prefer-spread
    return FederationInstance.loadShareSync.apply(FederationInstance, args);
}
function preloadRemote(...args) {
    share.assert(FederationInstance, 'Please call init first');
    // eslint-disable-next-line prefer-spread
    return FederationInstance.preloadRemote.apply(FederationInstance, args);
}
function registerRemotes(...args) {
    share.assert(FederationInstance, 'Please call init first');
    // eslint-disable-next-line prefer-spread
    return FederationInstance.registerRemotes.apply(FederationInstance, args);
}
function registerPlugins(...args) {
    share.assert(FederationInstance, 'Please call init first');
    // eslint-disable-next-line prefer-spread
    return FederationInstance.registerPlugins.apply(FederationInstance, args);
}
// Inject for debug
share.setGlobalFederationConstructor(FederationHost);

exports.registerGlobalPlugins = share.registerGlobalPlugins;
Object.defineProperty(exports, 'loadScript', {
  enumerable: true,
  get: function () { return sdk.loadScript; }
});
Object.defineProperty(exports, 'loadScriptNode', {
  enumerable: true,
  get: function () { return sdk.loadScriptNode; }
});
exports.FederationHost = FederationHost;
exports.getRemoteEntry = getRemoteEntry;
exports.getRemoteInfo = getRemoteInfo;
exports.init = init;
exports.loadRemote = loadRemote;
exports.loadShare = loadShare;
exports.loadShareSync = loadShareSync;
exports.preloadRemote = preloadRemote;
exports.registerPlugins = registerPlugins;
exports.registerRemotes = registerRemotes;
