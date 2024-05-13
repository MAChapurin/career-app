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
var performance_exports = {};
__export(performance_exports, {
  pluginPerformance: () => pluginPerformance
});
module.exports = __toCommonJS(performance_exports);
function applyProfile({
  chain,
  config
}) {
  const { profile } = config.performance;
  if (!profile) {
    return;
  }
  chain.profile(profile);
}
const pluginPerformance = () => ({
  name: "rsbuild:performance",
  setup(api) {
    api.modifyRsbuildConfig((rsbuildConfig) => {
      if (rsbuildConfig.performance?.profile) {
        if (!rsbuildConfig.performance?.bundleAnalyze) {
          rsbuildConfig.performance ?? (rsbuildConfig.performance = {});
          rsbuildConfig.performance.bundleAnalyze = {
            analyzerMode: "disabled",
            generateStatsFile: true
          };
        } else {
          rsbuildConfig.performance.bundleAnalyze = {
            generateStatsFile: true,
            ...rsbuildConfig.performance.bundleAnalyze || {}
          };
        }
      }
    });
    api.modifyBundlerChain((chain) => {
      const config = api.getNormalizedConfig();
      applyProfile({ chain, config });
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginPerformance
});
