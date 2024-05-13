"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var splitChunks_exports = {};
__export(splitChunks_exports, {
  MODULE_PATH_REGEX: () => MODULE_PATH_REGEX,
  getPackageNameFromModulePath: () => getPackageNameFromModulePath,
  pluginSplitChunks: () => pluginSplitChunks
});
module.exports = __toCommonJS(splitChunks_exports);
var import_node_assert = __toESM(require("node:assert"));
var import_shared = require("@rsbuild/shared");
function getUserDefinedCacheGroups(forceSplitting) {
  const cacheGroups = {};
  const pairs = Array.isArray(forceSplitting) ? forceSplitting.map(
    (regexp, index) => [`force-split-${index}`, regexp]
  ) : Object.entries(forceSplitting);
  for (const [key, regexp] of pairs) {
    cacheGroups[key] = {
      test: regexp,
      name: key,
      chunks: "all",
      // Ignore minimum size, minimum chunks and maximum requests and always create chunks for user defined cache group.
      enforce: true
    };
  }
  return cacheGroups;
}
function splitByExperience(ctx) {
  const { override, polyfill, defaultConfig, userDefinedCacheGroups } = ctx;
  const experienceCacheGroup = {};
  const packageRegExps = {
    lodash: (0, import_shared.createDependenciesRegExp)("lodash", "lodash-es"),
    axios: (0, import_shared.createDependenciesRegExp)("axios", /axios-.+/)
  };
  if (polyfill === "entry" || polyfill === "usage") {
    packageRegExps.polyfill = (0, import_shared.createDependenciesRegExp)(
      "tslib",
      "core-js",
      "@babel/runtime",
      "@swc/helpers"
    );
  }
  for (const [name, test] of Object.entries(packageRegExps)) {
    const key = `lib-${name}`;
    experienceCacheGroup[key] = {
      test,
      priority: 0,
      name: key,
      reuseExistingChunk: true
    };
  }
  return {
    ...defaultConfig,
    ...override,
    cacheGroups: {
      ...defaultConfig.cacheGroups,
      ...experienceCacheGroup,
      ...userDefinedCacheGroups,
      ...override.cacheGroups
    }
  };
}
const MODULE_PATH_REGEX = /.*[\\/]node_modules[\\/](?!\.pnpm[\\/])(?:(@[^\\/]+)[\\/])?([^\\/]+)/;
function getPackageNameFromModulePath(modulePath) {
  const handleModuleContext = modulePath?.match(MODULE_PATH_REGEX);
  if (!handleModuleContext) {
    return void 0;
  }
  const [, scope, name] = handleModuleContext;
  const packageName = ["npm", (scope ?? "").replace("@", ""), name].filter(Boolean).join(".");
  return packageName;
}
function splitByModule(ctx) {
  const { override, userDefinedCacheGroups, defaultConfig } = ctx;
  return {
    ...defaultConfig,
    minSize: 0,
    maxInitialRequests: Number.POSITIVE_INFINITY,
    ...override,
    cacheGroups: {
      ...defaultConfig.cacheGroups,
      ...userDefinedCacheGroups,
      // Core group
      vendors: {
        priority: -10,
        test: import_shared.NODE_MODULES_REGEX,
        name(module2) {
          return module2 ? getPackageNameFromModulePath(module2.context) : void 0;
        }
      },
      ...override.cacheGroups
    }
  };
}
function splitBySize(ctx) {
  const { override, userDefinedCacheGroups, defaultConfig, userConfig } = ctx;
  (0, import_node_assert.default)(userConfig.strategy === "split-by-size");
  return {
    ...defaultConfig,
    minSize: userConfig.minSize ?? 0,
    maxSize: userConfig.maxSize ?? Number.POSITIVE_INFINITY,
    ...override,
    cacheGroups: {
      ...defaultConfig.cacheGroups,
      ...userDefinedCacheGroups,
      ...override.cacheGroups
    }
  };
}
function splitCustom(ctx) {
  const { override, userDefinedCacheGroups, defaultConfig } = ctx;
  return {
    ...defaultConfig,
    ...override,
    cacheGroups: {
      ...defaultConfig.cacheGroups,
      ...userDefinedCacheGroups,
      ...override.cacheGroups
    }
  };
}
function allInOne(_ctx) {
  return false;
}
function singleVendor(ctx) {
  const { override, defaultConfig, userDefinedCacheGroups } = ctx;
  const singleVendorCacheGroup = {
    singleVendor: {
      test: import_shared.NODE_MODULES_REGEX,
      priority: 0,
      chunks: "all",
      name: "vendor",
      enforce: true,
      reuseExistingChunk: true
    }
  };
  return {
    ...defaultConfig,
    ...override,
    cacheGroups: {
      ...defaultConfig.cacheGroups,
      ...singleVendorCacheGroup,
      ...userDefinedCacheGroups,
      ...override.cacheGroups
    }
  };
}
const SPLIT_STRATEGY_DISPATCHER = {
  "split-by-experience": splitByExperience,
  "split-by-module": splitByModule,
  "split-by-size": splitBySize,
  custom: splitCustom,
  "all-in-one": allInOne,
  "single-vendor": singleVendor
};
const pluginSplitChunks = () => ({
  name: "rsbuild:split-chunks",
  setup(api) {
    api.modifyBundlerChain(
      async (chain, { isServer, isWebWorker, isServiceWorker }) => {
        if (isServer || isWebWorker || isServiceWorker) {
          chain.optimization.splitChunks(false);
          if (isWebWorker || isServiceWorker) {
            chain.module.parser.merge({
              javascript: {
                dynamicImportMode: "eager"
              }
            });
          }
          return;
        }
        const config = api.getNormalizedConfig();
        const defaultConfig = {
          // Optimize both `initial` and `async` chunks
          chunks: "all",
          // When chunk size >= 50000 bytes, split it into separate chunk
          // @ts-expect-error Rspack type missing
          enforceSizeThreshold: 5e4,
          cacheGroups: {}
        };
        const { chunkSplit } = config.performance;
        let userDefinedCacheGroups = {};
        if (chunkSplit.forceSplitting) {
          userDefinedCacheGroups = getUserDefinedCacheGroups(
            chunkSplit.forceSplitting
          );
        }
        const override = chunkSplit.strategy === "custom" ? chunkSplit.splitChunks ?? chunkSplit.override : chunkSplit.override;
        const splitChunksOptions = await SPLIT_STRATEGY_DISPATCHER[chunkSplit.strategy || "split-by-experience"]({
          defaultConfig,
          override: override || {},
          userDefinedCacheGroups,
          userConfig: chunkSplit,
          rootPath: api.context.rootPath,
          polyfill: config.output.polyfill
        });
        chain.optimization.splitChunks(
          // @ts-expect-error splitChunks type mismatch
          splitChunksOptions
        );
      }
    );
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MODULE_PATH_REGEX,
  getPackageNameFromModulePath,
  pluginSplitChunks
});
