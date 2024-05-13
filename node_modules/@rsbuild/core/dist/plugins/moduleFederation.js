"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var moduleFederation_exports = {};
__export(moduleFederation_exports, {
  pluginModuleFederation: () => pluginModuleFederation
});
module.exports = __toCommonJS(moduleFederation_exports);
var import_shared = require("@rsbuild/shared");
var import_core = require("@rspack/core");
class PatchSplitChunksPlugin {
  constructor(name) {
    __publicField(this, "name");
    this.name = name;
  }
  apply(compiler) {
    const { splitChunks } = compiler.options.optimization;
    if (!splitChunks) {
      return;
    }
    const applyPatch = (cacheGroup) => {
      if (typeof cacheGroup !== "object" || cacheGroup instanceof RegExp) {
        return;
      }
      const { chunks } = cacheGroup;
      if (!chunks) {
        return;
      }
      if (typeof chunks === "function") {
        const prevChunks = chunks;
        cacheGroup.chunks = (chunk) => {
          if (chunk.name && chunk.name === this.name) {
            return false;
          }
          return prevChunks(chunk);
        };
        return;
      }
      if (chunks === "all") {
        cacheGroup.chunks = (chunk) => {
          if (chunk.name && chunk.name === this.name) {
            return false;
          }
          return true;
        };
        return;
      }
      if (chunks === "initial") {
        cacheGroup.chunks = (chunk) => {
          if (chunk.name && chunk.name === this.name) {
            return false;
          }
          return chunk.isOnlyInitial();
        };
        return;
      }
    };
    applyPatch(splitChunks);
    const { cacheGroups } = splitChunks;
    if (!cacheGroups) {
      return;
    }
    for (const cacheGroupKey of Object.keys(cacheGroups)) {
      applyPatch(cacheGroups[cacheGroupKey]);
    }
  }
}
function pluginModuleFederation() {
  return {
    name: "rsbuild:module-federation",
    setup(api) {
      api.modifyRsbuildConfig({
        order: "post",
        handler: (config) => {
          if (config.moduleFederation?.options && config.performance?.chunkSplit?.strategy === "split-by-experience") {
            config.performance.chunkSplit = {
              ...config.performance.chunkSplit,
              strategy: "custom"
            };
          }
          return config;
        }
      });
      api.modifyBundlerChain(async (chain, { CHAIN_ID, target }) => {
        const config = api.getNormalizedConfig();
        if (!config.moduleFederation?.options || target !== "web") {
          return;
        }
        const { options } = config.moduleFederation;
        chain.plugin(CHAIN_ID.PLUGIN.MODULE_FEDERATION).use(import_core.rspack.container.ModuleFederationPlugin, [options]);
        if (options.name) {
          chain.plugin("mf-patch-split-chunks").use(PatchSplitChunksPlugin, [options.name]);
        }
        const publicPath = chain.output.get("publicPath");
        if (publicPath === import_shared.DEFAULT_ASSET_PREFIX) {
          chain.output.set("publicPath", "auto");
        }
      });
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginModuleFederation
});
