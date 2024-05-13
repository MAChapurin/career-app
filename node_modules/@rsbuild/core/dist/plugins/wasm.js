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
var wasm_exports = {};
__export(wasm_exports, {
  pluginWasm: () => pluginWasm
});
module.exports = __toCommonJS(wasm_exports);
var import_node_path = require("node:path");
var import_shared = require("@rsbuild/shared");
const pluginWasm = () => ({
  name: "rsbuild:wasm",
  setup(api) {
    api.modifyBundlerChain(async (chain, { CHAIN_ID }) => {
      const config = api.getNormalizedConfig();
      const distPath = (0, import_shared.getDistPath)(config, "wasm");
      chain.experiments({
        ...chain.get("experiments"),
        asyncWebAssembly: true
      });
      const wasmFilename = import_node_path.posix.join(distPath, "[hash].module.wasm");
      chain.output.merge({
        webassemblyModuleFilename: wasmFilename
      });
      chain.module.rule(CHAIN_ID.RULE.WASM).test(/\.wasm$/).merge({
        dependency: "url"
      }).type("asset/resource").set("generator", {
        filename: wasmFilename
      });
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginWasm
});
