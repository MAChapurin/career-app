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
var define_exports = {};
__export(define_exports, {
  pluginDefine: () => pluginDefine
});
module.exports = __toCommonJS(define_exports);
var import_shared = require("@rsbuild/shared");
const pluginDefine = () => ({
  name: "rsbuild:define",
  setup(api) {
    api.modifyBundlerChain((chain, { CHAIN_ID, bundler }) => {
      const config = api.getNormalizedConfig();
      const builtinVars = {
        "process.env.NODE_ENV": JSON.stringify((0, import_shared.getNodeEnv)()),
        "process.env.ASSET_PREFIX": JSON.stringify(
          (0, import_shared.getPublicPathFromChain)(chain, false)
        )
      };
      chain.plugin(CHAIN_ID.PLUGIN.DEFINE).use(bundler.DefinePlugin, [
        { ...builtinVars, ...config.source.define }
      ]);
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginDefine
});
