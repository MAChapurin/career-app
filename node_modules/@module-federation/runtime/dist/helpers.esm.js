import { o as getRegisteredShare, v as getGlobalShareScope, G as Global, J as nativeGlobal, K as resetFederationGlobalInfo, E as getGlobalFederationInstance, H as setGlobalFederationInstance, F as getGlobalFederationConstructor, C as setGlobalFederationConstructor, l as getInfoWithoutType, u as getGlobalSnapshot, L as getTargetSnapshotInfoByModuleInfo, q as getGlobalSnapshotInfoByModuleInfo, t as setGlobalSnapshotInfoByModuleInfo, r as addGlobalSnapshot, c as getRemoteEntryExports, I as registerGlobalPlugins, g as getGlobalHostPlugins, m as getPreloaded, n as setPreloaded } from './share.esm.js';

const ShareUtils = {
    getRegisteredShare,
    getGlobalShareScope
};
const GlobalUtils = {
    Global,
    nativeGlobal,
    resetFederationGlobalInfo,
    getGlobalFederationInstance,
    setGlobalFederationInstance,
    getGlobalFederationConstructor,
    setGlobalFederationConstructor,
    getInfoWithoutType,
    getGlobalSnapshot,
    getTargetSnapshotInfoByModuleInfo,
    getGlobalSnapshotInfoByModuleInfo,
    setGlobalSnapshotInfoByModuleInfo,
    addGlobalSnapshot,
    getRemoteEntryExports,
    registerGlobalPlugins,
    getGlobalHostPlugins,
    getPreloaded,
    setPreloaded
};
var helpers = {
    global: GlobalUtils,
    share: ShareUtils
};

export { helpers as default };
