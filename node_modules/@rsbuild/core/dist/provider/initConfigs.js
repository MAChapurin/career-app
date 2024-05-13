"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var initConfigs_exports = {};
__export(initConfigs_exports, {
  initConfigs: () => initConfigs,
  initRsbuildConfig: () => initRsbuildConfig
});
module.exports = __toCommonJS(initConfigs_exports);
var import_shared = require("@rsbuild/shared");
var import_config = require("../config");
var import_createContext = require("../createContext");
var import_mergeConfig = require("../mergeConfig");
var import_pluginManager = require("../pluginManager");
var import_inspectConfig = require("./inspectConfig");
var import_rspackConfig = require("./rspackConfig");
async function modifyRsbuildConfig(context) {
  (0, import_shared.debug)("modify Rsbuild config");
  const [modified] = await context.hooks.modifyRsbuildConfig.call(
    context.config,
    { mergeRsbuildConfig: import_mergeConfig.mergeRsbuildConfig }
  );
  context.config = modified;
  (0, import_shared.debug)("modify Rsbuild config done");
}
async function initRsbuildConfig({
  context,
  pluginManager
}) {
  if (context.normalizedConfig) {
    return context.normalizedConfig;
  }
  await (0, import_pluginManager.initPlugins)({
    pluginAPI: context.pluginAPI,
    pluginManager
  });
  await modifyRsbuildConfig(context);
  context.normalizedConfig = (0, import_config.normalizeConfig)(context.config);
  (0, import_createContext.updateContextByNormalizedConfig)(context, context.normalizedConfig);
  return context.normalizedConfig;
}
async function initConfigs({
  context,
  pluginManager,
  rsbuildOptions
}) {
  const normalizedConfig = await initRsbuildConfig({ context, pluginManager });
  const { targets } = normalizedConfig.output;
  const rspackConfigs = await Promise.all(
    targets.map((target) => (0, import_rspackConfig.generateRspackConfig)({ target, context }))
  );
  if ((0, import_shared.isDebug)()) {
    const inspect = () => {
      const inspectOptions = {
        verbose: true,
        writeToDisk: true
      };
      (0, import_inspectConfig.inspectConfig)({
        context,
        pluginManager,
        inspectOptions,
        rsbuildOptions,
        bundlerConfigs: rspackConfigs
      });
    };
    context.hooks.onBeforeBuild.tap(inspect);
    context.hooks.onAfterStartDevServer.tap(inspect);
  }
  return {
    rspackConfigs
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initConfigs,
  initRsbuildConfig
});
