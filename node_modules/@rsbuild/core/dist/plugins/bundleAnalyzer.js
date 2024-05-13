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
var bundleAnalyzer_exports = {};
__export(bundleAnalyzer_exports, {
  pluginBundleAnalyzer: () => pluginBundleAnalyzer
});
module.exports = __toCommonJS(bundleAnalyzer_exports);
var import_shared = require("@rsbuild/shared");
const isUseAnalyzer = (config) => process.env.BUNDLE_ANALYZE || config.performance?.bundleAnalyze;
function pluginBundleAnalyzer() {
  return {
    name: "rsbuild:bundle-analyzer",
    setup(api) {
      api.modifyRsbuildConfig((config) => {
        if ((0, import_shared.isProd)() || !isUseAnalyzer(config)) {
          return;
        }
        config.dev || (config.dev = {});
        config.dev.writeToDisk = true;
        return config;
      });
      api.modifyBundlerChain(async (chain, { CHAIN_ID, target }) => {
        const config = api.getNormalizedConfig();
        if (!isUseAnalyzer(config)) {
          return;
        }
        const { default: BundleAnalyzer } = await Promise.resolve().then(() => __toESM(require("@rsbuild/shared/webpack-bundle-analyzer")));
        chain.plugin(CHAIN_ID.PLUGIN.BUNDLE_ANALYZER).use(BundleAnalyzer.BundleAnalyzerPlugin, [
          {
            analyzerMode: "static",
            openAnalyzer: false,
            reportFilename: `report-${target}.html`,
            ...config.performance.bundleAnalyze || {}
          }
        ]);
      });
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginBundleAnalyzer
});
