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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  PLUGIN_REACT_NAME: () => PLUGIN_REACT_NAME,
  pluginReact: () => pluginReact
});
module.exports = __toCommonJS(src_exports);
var import_shared3 = require("@rsbuild/shared");

// src/react.ts
var import_node_path = __toESM(require("path"));
var import_shared = require("@rsbuild/shared");
var applyBasicReactSupport = (api, options) => {
  const REACT_REFRESH_PATH = require.resolve("react-refresh");
  api.modifyBundlerChain(async (chain, { CHAIN_ID, isDev, isProd: isProd2, target }) => {
    const config = api.getNormalizedConfig();
    const usingHMR = (0, import_shared.isUsingHMR)(config, { isProd: isProd2, target });
    const reactOptions = {
      development: isDev,
      refresh: usingHMR,
      runtime: "automatic",
      ...options.swcReactOptions
    };
    (0, import_shared.modifySwcLoaderOptions)({
      chain,
      modifier: (opts) => {
        var _a;
        opts.jsc ?? (opts.jsc = {});
        (_a = opts.jsc).transform ?? (_a.transform = {});
        opts.jsc.transform.react = {
          ...opts.jsc.transform.react,
          ...reactOptions
        };
        return opts;
      }
    });
    if (!usingHMR) {
      return;
    }
    chain.resolve.alias.set("react-refresh", import_node_path.default.dirname(REACT_REFRESH_PATH));
    const { default: ReactRefreshRspackPlugin } = await import("@rspack/plugin-react-refresh");
    chain.plugin(CHAIN_ID.PLUGIN.REACT_FAST_REFRESH).use(ReactRefreshRspackPlugin, [
      {
        include: [import_shared.SCRIPT_REGEX],
        ...options.reactRefreshOptions
      }
    ]);
  });
};
var applyReactProfiler = (api) => {
  api.modifyRsbuildConfig((config, { mergeRsbuildConfig }) => {
    const enableProfilerConfig = {
      output: {
        minify: {
          jsOptions: {
            // Need to keep classnames and function names like Components for debugging purposes.
            mangle: {
              keep_classnames: true,
              keep_fnames: true
            }
          }
        }
      }
    };
    return mergeRsbuildConfig(config, enableProfilerConfig);
  });
  api.modifyBundlerChain((chain) => {
    chain.resolve.alias.set("react-dom$", "react-dom/profiling");
    chain.resolve.alias.set("scheduler/tracing", "scheduler/tracing-profiling");
  });
};

// src/splitChunks.ts
var import_shared2 = require("@rsbuild/shared");
var applySplitChunksRule = (api, options = {
  react: true,
  router: true
}) => {
  api.modifyBundlerChain((chain) => {
    const config = api.getNormalizedConfig();
    if (config.performance.chunkSplit.strategy !== "split-by-experience") {
      return;
    }
    const currentConfig = chain.optimization.splitChunks.values();
    if (!(0, import_shared2.isPlainObject)(currentConfig)) {
      return;
    }
    const extraGroups = {};
    if (options.react) {
      extraGroups.react = [
        "react",
        "react-dom",
        "scheduler",
        ...(0, import_shared2.isProd)() ? [] : ["react-refresh", /@rspack[\\/]plugin-react-refresh/]
      ];
    }
    if (options.router) {
      extraGroups.router = [
        "react-router",
        "react-router-dom",
        "history",
        /@remix-run[\\/]router/
      ];
    }
    if (!Object.keys(extraGroups).length) {
      return;
    }
    chain.optimization.splitChunks({
      ...currentConfig,
      // @ts-expect-error Rspack and Webpack uses different cacheGroups type
      cacheGroups: {
        ...currentConfig.cacheGroups,
        ...(0, import_shared2.createCacheGroups)(extraGroups)
      }
    });
  });
};

// src/index.ts
var PLUGIN_REACT_NAME = "rsbuild:react";
var pluginReact = ({
  enableProfiler = false,
  ...options
} = {}) => ({
  name: PLUGIN_REACT_NAME,
  setup(api) {
    if (api.context.bundlerType === "rspack") {
      applyBasicReactSupport(api, options);
      const isProdProfile = enableProfiler && (0, import_shared3.getNodeEnv)() === "production";
      if (isProdProfile) {
        applyReactProfiler(api);
      }
    }
    applySplitChunksRule(api, options?.splitChunks);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PLUGIN_REACT_NAME,
  pluginReact
});
