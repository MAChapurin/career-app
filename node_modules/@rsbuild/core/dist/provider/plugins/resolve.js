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
var resolve_exports = {};
__export(resolve_exports, {
  pluginResolve: () => pluginResolve
});
module.exports = __toCommonJS(resolve_exports);
var import_shared = require("@rsbuild/shared");
const pluginResolve = () => ({
  name: "rsbuild:resolve",
  setup(api) {
    (0, import_shared.applyResolvePlugin)(api);
    api.modifyRspackConfig(async (rspackConfig) => {
      const isTsProject = Boolean(api.context.tsconfigPath);
      const config = api.getNormalizedConfig();
      rspackConfig.resolve || (rspackConfig.resolve = {});
      if (isTsProject && config.source.aliasStrategy === "prefer-tsconfig") {
        rspackConfig.resolve.tsConfigPath = api.context.tsconfigPath;
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginResolve
});
