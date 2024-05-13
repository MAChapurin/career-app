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
var progress_exports = {};
__export(progress_exports, {
  pluginProgress: () => pluginProgress
});
module.exports = __toCommonJS(progress_exports);
var import_shared = require("@rsbuild/shared");
var import_core = require("@rspack/core");
const pluginProgress = () => ({
  name: "rsbuild:progress",
  setup(api) {
    api.modifyBundlerChain(async (chain, { target, CHAIN_ID }) => {
      const config = api.getNormalizedConfig();
      const options = config.dev.progressBar ?? // enable progress bar in production by default
      (0, import_shared.isProd)();
      if (!options) {
        return;
      }
      const prefix = options !== true && options.id !== void 0 ? options.id : import_shared.TARGET_ID_MAP[target];
      chain.plugin(CHAIN_ID.PLUGIN.PROGRESS).use(import_core.rspack.ProgressPlugin, [
        {
          prefix,
          ...options === true ? {} : options
        }
      ]);
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginProgress
});
