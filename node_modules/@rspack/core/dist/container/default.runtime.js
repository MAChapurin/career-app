"use strict";
// @ts-nocheck
var __module_federation_bundler_runtime__, __module_federation_runtime_plugins__, __module_federation_remote_infos__, __module_federation_container_name__;
module.exports = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if ((__webpack_require__.initializeSharingData ||
        __webpack_require__.initializeExposesData) &&
        __webpack_require__.federation) {
        const override = (obj, key, value) => {
            if (!obj)
                return;
            if (obj[key])
                obj[key] = value;
        };
        const merge = (obj, key, fn) => {
            var _a, _b;
            const value = fn();
            if (Array.isArray(value)) {
                (_a = obj[key]) !== null && _a !== void 0 ? _a : (obj[key] = []);
                obj[key].push(...value);
            }
            else if (typeof value === "object" && value !== null) {
                (_b = obj[key]) !== null && _b !== void 0 ? _b : (obj[key] = {});
                Object.assign(obj[key], value);
            }
        };
        const early = (obj, key, initial) => {
            var _a;
            (_a = obj[key]) !== null && _a !== void 0 ? _a : (obj[key] = initial());
        };
        const remotesLoadingChunkMapping = (_b = (_a = __webpack_require__.remotesLoadingData) === null || _a === void 0 ? void 0 : _a.chunkMapping) !== null && _b !== void 0 ? _b : {};
        const remotesLoadingModuleIdToRemoteDataMapping = (_d = (_c = __webpack_require__.remotesLoadingData) === null || _c === void 0 ? void 0 : _c.moduleIdToRemoteDataMapping) !== null && _d !== void 0 ? _d : {};
        const initializeSharingScopeToInitDataMapping = (_f = (_e = __webpack_require__.initializeSharingData) === null || _e === void 0 ? void 0 : _e.scopeToSharingDataMapping) !== null && _f !== void 0 ? _f : {};
        const consumesLoadingChunkMapping = (_h = (_g = __webpack_require__.consumesLoadingData) === null || _g === void 0 ? void 0 : _g.chunkMapping) !== null && _h !== void 0 ? _h : {};
        const consumesLoadingModuleToConsumeDataMapping = (_k = (_j = __webpack_require__.consumesLoadingData) === null || _j === void 0 ? void 0 : _j.moduleIdToConsumeDataMapping) !== null && _k !== void 0 ? _k : {};
        const consumesLoadinginstalledModules = {};
        const initializeSharingInitPromises = [];
        const initializeSharingInitTokens = [];
        const containerShareScope = (_l = __webpack_require__.initializeExposesData) === null || _l === void 0 ? void 0 : _l.shareScope;
        for (const key in __module_federation_bundler_runtime__) {
            __webpack_require__.federation[key] =
                __module_federation_bundler_runtime__[key];
        }
        early(__webpack_require__.federation, "consumesLoadingModuleToHandlerMapping", () => {
            const consumesLoadingModuleToHandlerMapping = {};
            for (let [moduleId, data] of Object.entries(consumesLoadingModuleToConsumeDataMapping)) {
                consumesLoadingModuleToHandlerMapping[moduleId] = {
                    getter: data.fallback,
                    shareInfo: {
                        shareConfig: {
                            fixedDependencies: false,
                            requiredVersion: data.requiredVersion,
                            strictVersion: data.strictVersion,
                            singleton: data.singleton,
                            eager: data.eager
                        },
                        scope: [data.shareScope]
                    },
                    shareKey: data.shareKey
                };
            }
            return consumesLoadingModuleToHandlerMapping;
        });
        early(__webpack_require__.federation, "initOptions", () => ({}));
        early(__webpack_require__.federation.initOptions, "name", () => __module_federation_container_name__);
        early(__webpack_require__.federation.initOptions, "shared", () => {
            const shared = {};
            for (let [scope, stages] of Object.entries(initializeSharingScopeToInitDataMapping)) {
                for (let stage of stages) {
                    if (typeof stage === "object" && stage !== null) {
                        const { name, version, factory, eager } = stage;
                        const options = { version, scope: [scope], get: factory };
                        if (shared[name]) {
                            shared[name].push(options);
                        }
                        else {
                            shared[name] = [options];
                        }
                    }
                }
            }
            return shared;
        });
        merge(__webpack_require__.federation.initOptions, "remotes", () => Object.values(__module_federation_remote_infos__)
            .flat()
            .filter(remote => remote.externalType === "script"));
        merge(__webpack_require__.federation.initOptions, "plugins", () => __module_federation_runtime_plugins__);
        early(__webpack_require__.federation, "bundlerRuntimeOptions", () => ({}));
        early(__webpack_require__.federation.bundlerRuntimeOptions, "remotes", () => ({}));
        early(__webpack_require__.federation.bundlerRuntimeOptions.remotes, "chunkMapping", () => remotesLoadingChunkMapping);
        early(__webpack_require__.federation.bundlerRuntimeOptions.remotes, "idToExternalAndNameMapping", () => {
            const remotesLoadingIdToExternalAndNameMappingMapping = {};
            for (let [moduleId, data] of Object.entries(remotesLoadingModuleIdToRemoteDataMapping)) {
                remotesLoadingIdToExternalAndNameMappingMapping[moduleId] = [
                    data.shareScope,
                    data.name,
                    data.externalModuleId,
                    data.remoteName
                ];
            }
            return remotesLoadingIdToExternalAndNameMappingMapping;
        });
        early(__webpack_require__.federation.bundlerRuntimeOptions.remotes, "webpackRequire", () => __webpack_require__);
        merge(__webpack_require__.federation.bundlerRuntimeOptions.remotes, "idToRemoteMap", () => {
            const idToRemoteMap = {};
            for (let [id, remoteData] of Object.entries(remotesLoadingModuleIdToRemoteDataMapping)) {
                const info = __module_federation_remote_infos__[remoteData.remoteName];
                if (info)
                    idToRemoteMap[id] = info;
            }
            return idToRemoteMap;
        });
        override(__webpack_require__, "S", __webpack_require__.federation.bundlerRuntime.S);
        if (__webpack_require__.federation.attachShareScopeMap) {
            __webpack_require__.federation.attachShareScopeMap(__webpack_require__);
        }
        override(__webpack_require__.f, "remotes", (chunkId, promises) => __webpack_require__.federation.bundlerRuntime.remotes({
            chunkId,
            promises,
            chunkMapping: remotesLoadingChunkMapping,
            idToExternalAndNameMapping: __webpack_require__.federation.bundlerRuntimeOptions.remotes
                .idToExternalAndNameMapping,
            idToRemoteMap: __webpack_require__.federation.bundlerRuntimeOptions.remotes
                .idToRemoteMap,
            webpackRequire: __webpack_require__
        }));
        override(__webpack_require__.f, "consumes", (chunkId, promises) => __webpack_require__.federation.bundlerRuntime.consumes({
            chunkId,
            promises,
            chunkMapping: consumesLoadingChunkMapping,
            moduleToHandlerMapping: __webpack_require__.federation.consumesLoadingModuleToHandlerMapping,
            installedModules: consumesLoadinginstalledModules,
            webpackRequire: __webpack_require__
        }));
        override(__webpack_require__, "I", (name, initScope) => __webpack_require__.federation.bundlerRuntime.I({
            shareScopeName: name,
            initScope,
            initPromises: initializeSharingInitPromises,
            initTokens: initializeSharingInitTokens,
            webpackRequire: __webpack_require__
        }));
        override(__webpack_require__, "initContainer", (shareScope, initScope, remoteEntryInitOptions) => __webpack_require__.federation.bundlerRuntime.initContainerEntry({
            shareScope,
            initScope,
            remoteEntryInitOptions,
            shareScopeKey: containerShareScope,
            webpackRequire: __webpack_require__
        }));
        override(__webpack_require__, "getContainer", (module, getScope) => {
            var moduleMap = __webpack_require__.initializeExposesData.moduleMap;
            __webpack_require__.R = getScope;
            getScope = Object.prototype.hasOwnProperty.call(moduleMap, module)
                ? moduleMap[module]()
                : Promise.resolve().then(() => {
                    throw new Error('Module "' + module + '" does not exist in container.');
                });
            __webpack_require__.R = undefined;
            return getScope;
        });
        __webpack_require__.federation.instance =
            __webpack_require__.federation.runtime.init(__webpack_require__.federation.initOptions);
        if ((_m = __webpack_require__.consumesLoadingData) === null || _m === void 0 ? void 0 : _m.initialConsumes) {
            __webpack_require__.federation.bundlerRuntime.installInitialConsumes({
                webpackRequire: __webpack_require__,
                installedModules: consumesLoadinginstalledModules,
                initialConsumes: __webpack_require__.consumesLoadingData.initialConsumes,
                moduleToHandlerMapping: __webpack_require__.federation.consumesLoadingModuleToHandlerMapping
            });
        }
    }
};
