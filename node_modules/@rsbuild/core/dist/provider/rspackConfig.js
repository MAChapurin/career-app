"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var rspackConfig_exports = {};
__export(rspackConfig_exports, {
  generateRspackConfig: () => generateRspackConfig,
  getChainUtils: () => getChainUtils
});
module.exports = __toCommonJS(rspackConfig_exports);
var import_shared = require("@rsbuild/shared");
var import_core = require("@rspack/core");
var import_htmlUtils = require("../htmlUtils");
var import_shared2 = require("./shared");
async function modifyRspackConfig(context, rspackConfig, utils) {
  (0, import_shared.debug)("modify Rspack config");
  let [modifiedConfig] = await context.hooks.modifyRspackConfig.call(
    rspackConfig,
    utils
  );
  if (context.config.tools?.rspack) {
    modifiedConfig = (0, import_shared.mergeChainedOptions)({
      defaults: modifiedConfig,
      options: context.config.tools.rspack,
      utils,
      mergeFn: utils.mergeConfig
    });
  }
  (0, import_shared.debug)("modify Rspack config done");
  return modifiedConfig;
}
async function getConfigUtils(config, chainUtils) {
  const { merge } = await Promise.resolve().then(() => __toESM(require("@rsbuild/shared/webpack-merge")));
  return {
    ...chainUtils,
    rspack: import_core.rspack,
    mergeConfig: merge,
    addRules(rules) {
      const ruleArr = (0, import_shared.castArray)(rules);
      if (!config.module) {
        config.module = {};
      }
      if (!config.module.rules) {
        config.module.rules = [];
      }
      config.module.rules.unshift(...ruleArr);
    },
    prependPlugins(plugins) {
      const pluginArr = (0, import_shared.castArray)(plugins);
      if (!config.plugins) {
        config.plugins = [];
      }
      config.plugins.unshift(...pluginArr);
    },
    appendPlugins(plugins) {
      const pluginArr = (0, import_shared.castArray)(plugins);
      if (!config.plugins) {
        config.plugins = [];
      }
      config.plugins.push(...pluginArr);
    },
    removePlugin(pluginName) {
      if (config.plugins) {
        config.plugins = config.plugins.filter(
          (p) => p && p.name !== pluginName
        );
      }
    }
  };
}
function getChainUtils(target) {
  const nodeEnv = (0, import_shared.getNodeEnv)();
  return {
    env: nodeEnv,
    target,
    isDev: nodeEnv === "development",
    isProd: nodeEnv === "production",
    isServer: target === "node",
    isWebWorker: target === "web-worker",
    isServiceWorker: target === "service-worker",
    getCompiledPath: import_shared2.getCompiledPath,
    CHAIN_ID: import_shared.CHAIN_ID,
    HtmlPlugin: (0, import_htmlUtils.getHTMLPlugin)()
  };
}
async function generateRspackConfig({
  target,
  context
}) {
  const chainUtils = getChainUtils(target);
  const {
    BannerPlugin,
    DefinePlugin,
    IgnorePlugin,
    ProvidePlugin,
    HotModuleReplacementPlugin
  } = import_core.rspack;
  const chain = await (0, import_shared.modifyBundlerChain)(context, {
    ...chainUtils,
    bundler: {
      BannerPlugin,
      DefinePlugin,
      IgnorePlugin,
      ProvidePlugin,
      HotModuleReplacementPlugin
    }
  });
  let rspackConfig = (0, import_shared.chainToConfig)(chain);
  rspackConfig = await modifyRspackConfig(
    context,
    rspackConfig,
    await getConfigUtils(rspackConfig, chainUtils)
  );
  return rspackConfig;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateRspackConfig,
  getChainUtils
});
