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
var minimize_exports = {};
__export(minimize_exports, {
  pluginMinimize: () => pluginMinimize
});
module.exports = __toCommonJS(minimize_exports);
var import_shared = require("@rsbuild/shared");
var import_core = require("@rspack/core");
const pluginMinimize = () => ({
  name: "rsbuild:minimize",
  setup(api) {
    api.modifyBundlerChain(async (chain, { isProd }) => {
      const config = api.getNormalizedConfig();
      const isMinimize = isProd && config.output.minify !== false;
      if (!isMinimize) {
        return;
      }
      const { SwcJsMinimizerRspackPlugin, SwcCssMinimizerRspackPlugin } = import_core.rspack;
      const { minifyJs, minifyCss } = (0, import_shared.parseMinifyOptions)(config);
      if (minifyJs) {
        chain.optimization.minimizer(import_shared.CHAIN_ID.MINIMIZER.JS).use(SwcJsMinimizerRspackPlugin, [(0, import_shared.getSwcMinimizerOptions)(config)]).end();
      }
      if (minifyCss) {
        chain.optimization.minimizer(import_shared.CHAIN_ID.MINIMIZER.CSS).use(SwcCssMinimizerRspackPlugin, []).end();
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginMinimize
});
