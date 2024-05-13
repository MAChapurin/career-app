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
var createRsbuild_exports = {};
__export(createRsbuild_exports, {
  createRsbuild: () => createRsbuild
});
module.exports = __toCommonJS(createRsbuild_exports);
var import_shared = require("@rsbuild/shared");
var import_pluginManager = require("./pluginManager");
const getRspackProvider = async () => {
  const { rspackProvider } = await Promise.resolve().then(() => __toESM(require("./provider/provider")));
  return rspackProvider;
};
async function createRsbuild(options = {}) {
  const { rsbuildConfig = {} } = options;
  const provider = rsbuildConfig.provider || await getRspackProvider();
  const rsbuildOptions = {
    cwd: process.cwd(),
    rsbuildConfig,
    ...options
  };
  const pluginManager = (0, import_pluginManager.createPluginManager)();
  const {
    build,
    preview,
    pluginAPI,
    publicContext,
    initConfigs,
    inspectConfig,
    createCompiler,
    createDevServer,
    startDevServer,
    applyDefaultPlugins
  } = await provider({
    pluginManager,
    rsbuildOptions
  });
  (0, import_shared.debug)("add default plugins");
  await applyDefaultPlugins(pluginManager);
  (0, import_shared.debug)("add default plugins done");
  const rsbuild = {
    ...(0, import_shared.pick)(pluginManager, ["addPlugins", "removePlugins", "isPluginExists"]),
    ...(0, import_shared.pick)(pluginAPI, [
      "onBeforeBuild",
      "onBeforeCreateCompiler",
      "onBeforeStartDevServer",
      "onBeforeStartProdServer",
      "onAfterBuild",
      "onAfterCreateCompiler",
      "onAfterStartDevServer",
      "onAfterStartProdServer",
      "onCloseDevServer",
      "onDevCompileDone",
      "onExit",
      "getHTMLPaths",
      "getRsbuildConfig",
      "getNormalizedConfig"
    ]),
    build,
    preview,
    createCompiler,
    initConfigs,
    inspectConfig,
    createDevServer,
    startDevServer,
    context: publicContext
  };
  if (rsbuildConfig.plugins) {
    const plugins = await Promise.all(rsbuildConfig.plugins);
    rsbuild.addPlugins(plugins);
  }
  return rsbuild;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRsbuild
});
