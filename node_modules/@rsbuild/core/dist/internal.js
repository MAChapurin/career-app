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
var internal_exports = {};
__export(internal_exports, {
  applyBaseCSSRule: () => import_css.applyBaseCSSRule,
  applyCSSModuleRule: () => import_css.applyCSSModuleRule,
  applySwcDecoratorConfig: () => import_swc.applySwcDecoratorConfig,
  createContext: () => import_createContext.createContext,
  createDevServer: () => import_server.createDevServer,
  createPluginManager: () => import_pluginManager.createPluginManager,
  createPublicContext: () => import_createContext.createPublicContext,
  formatStats: () => import_shared.formatStats,
  getChainUtils: () => import_rspackConfig.getChainUtils,
  getDevMiddleware: () => import_devMiddleware.getDevMiddleware,
  getHTMLPlugin: () => import_htmlUtils.getHTMLPlugin,
  getPluginAPI: () => import_initPlugins.getPluginAPI,
  getStatsOptions: () => import_shared.getStatsOptions,
  initHooks: () => import_initHooks.initHooks,
  initPlugins: () => import_pluginManager.initPlugins,
  initRsbuildConfig: () => import_initConfigs.initRsbuildConfig,
  plugins: () => import_plugins.plugins,
  rspackProvider: () => import_provider.rspackProvider,
  setHTMLPlugin: () => import_htmlUtils.setHTMLPlugin,
  startProdServer: () => import_server.startProdServer
});
module.exports = __toCommonJS(internal_exports);
var import_provider = require("./provider/provider");
var import_createContext = require("./createContext");
var import_pluginManager = require("./pluginManager");
var import_initHooks = require("./initHooks");
var import_initConfigs = require("./provider/initConfigs");
var import_initPlugins = require("./initPlugins");
var import_css = require("./provider/plugins/css");
var import_htmlUtils = require("./htmlUtils");
var import_shared = require("./provider/shared");
var import_rspackConfig = require("./provider/rspackConfig");
var import_swc = require("./provider/plugins/swc");
var import_devMiddleware = require("./server/devMiddleware");
var import_server = require("./server");
var import_plugins = require("./plugins");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyBaseCSSRule,
  applyCSSModuleRule,
  applySwcDecoratorConfig,
  createContext,
  createDevServer,
  createPluginManager,
  createPublicContext,
  formatStats,
  getChainUtils,
  getDevMiddleware,
  getHTMLPlugin,
  getPluginAPI,
  getStatsOptions,
  initHooks,
  initPlugins,
  initRsbuildConfig,
  plugins,
  rspackProvider,
  setHTMLPlugin,
  startProdServer
});
