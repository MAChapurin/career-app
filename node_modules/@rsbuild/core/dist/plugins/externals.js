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
var externals_exports = {};
__export(externals_exports, {
  pluginExternals: () => pluginExternals
});
module.exports = __toCommonJS(externals_exports);
function pluginExternals() {
  return {
    name: "rsbuild:externals",
    setup(api) {
      api.modifyBundlerChain((chain) => {
        const { externals } = api.getNormalizedConfig().output;
        if (externals) {
          chain.externals(externals);
        }
      });
      api.onBeforeCreateCompiler(({ bundlerConfigs }) => {
        for (const config of bundlerConfigs) {
          const isWebWorker = Array.isArray(config.target) ? config.target.includes("webworker") : config.target === "webworker";
          if (isWebWorker && config.externals) {
            delete config.externals;
          }
        }
      });
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginExternals
});
