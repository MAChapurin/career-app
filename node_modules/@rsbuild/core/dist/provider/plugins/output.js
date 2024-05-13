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
var output_exports = {};
__export(output_exports, {
  pluginOutput: () => pluginOutput
});
module.exports = __toCommonJS(output_exports);
var import_node_path = require("node:path");
var import_shared = require("@rsbuild/shared");
var import_core = require("@rspack/core");
const pluginOutput = () => ({
  name: "rsbuild:output",
  setup(api) {
    (0, import_shared.applyOutputPlugin)(api);
    api.modifyBundlerChain(async (chain, { CHAIN_ID }) => {
      const config = api.getNormalizedConfig();
      if (config.output.copy) {
        const { copy } = config.output;
        const options = Array.isArray(copy) ? { patterns: copy } : copy;
        chain.plugin(CHAIN_ID.PLUGIN.COPY).use(import_core.rspack.CopyRspackPlugin, [options]);
      }
    });
    api.modifyRspackConfig(async (rspackConfig, { isProd }) => {
      const config = api.getNormalizedConfig();
      const cssPath = (0, import_shared.getDistPath)(config, "css");
      const cssAsyncPath = (0, import_shared.getDistPath)(config, "cssAsync");
      const cssFilename = (0, import_shared.getFilename)(config, "css", isProd);
      rspackConfig.output || (rspackConfig.output = {});
      rspackConfig.output.cssFilename = import_node_path.posix.join(cssPath, cssFilename);
      rspackConfig.output.cssChunkFilename = import_node_path.posix.join(
        cssAsyncPath,
        cssFilename
      );
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginOutput
});
