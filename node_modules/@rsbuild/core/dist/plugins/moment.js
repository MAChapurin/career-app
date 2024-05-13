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
var moment_exports = {};
__export(moment_exports, {
  pluginMoment: () => pluginMoment
});
module.exports = __toCommonJS(moment_exports);
const pluginMoment = () => ({
  name: "rsbuild:moment",
  setup(api) {
    api.modifyBundlerChain(async (chain, { bundler }) => {
      const config = api.getNormalizedConfig();
      if (config.performance.removeMomentLocale) {
        chain.plugin("remove-moment-locale").use(bundler.IgnorePlugin, [
          {
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
          }
        ]);
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginMoment
});
