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
var css_exports = {};
__export(css_exports, {
  applyAutoprefixer: () => applyAutoprefixer,
  getCssLoaderOptions: () => getCssLoaderOptions,
  getCssModuleLocalIdentName: () => getCssModuleLocalIdentName,
  getPostcssLoaderOptions: () => getPostcssLoaderOptions,
  getResolveUrlJoinFn: () => getResolveUrlJoinFn,
  isCssModules: () => isCssModules,
  isInNodeModules: () => isInNodeModules,
  isUseCssExtract: () => isUseCssExtract,
  normalizeCssLoaderOptions: () => normalizeCssLoaderOptions
});
module.exports = __toCommonJS(css_exports);
var import_deepmerge = __toESM(require("../compiled/deepmerge"));
var import_constants = require("./constants");
var import_mergeChainedOptions = require("./mergeChainedOptions");
var import_utils = require("./utils");
const getCssModuleLocalIdentName = (config, isProd) => config.output.cssModules.localIdentName || // Using shorter classname in production to reduce bundle size
(isProd ? "[local]-[hash:base64:6]" : "[path][name]__[local]-[hash:base64:6]");
const isInNodeModules = (path) => import_constants.NODE_MODULES_REGEX.test(path);
const isCssModules = (filename, modules) => {
  if (typeof modules === "boolean") {
    return modules;
  }
  if (typeof modules === "string") {
    return modules !== "global";
  }
  const { auto } = modules;
  if (typeof auto === "boolean") {
    return auto && import_constants.CSS_MODULES_REGEX.test(filename);
  }
  if (auto instanceof RegExp) {
    return auto.test(filename);
  }
  if (typeof auto === "function") {
    return auto(filename);
  }
  return true;
};
const userPostcssrcCache = /* @__PURE__ */ new Map();
async function loadUserPostcssrc(root) {
  const cached = userPostcssrcCache.get(root);
  if (cached) {
    return cached;
  }
  const { default: postcssrc } = await Promise.resolve().then(() => __toESM(require("../compiled/postcss-load-config")));
  const promise = postcssrc({}, root).catch((err) => {
    if (err.message?.includes("No PostCSS Config found")) {
      return {};
    }
    throw err;
  });
  userPostcssrcCache.set(root, promise);
  promise.then((config) => {
    userPostcssrcCache.set(root, config);
  });
  return promise;
}
const applyAutoprefixer = async (plugins, browserslist, config) => {
  const pluginObjects = plugins.map(
    (plugin) => (0, import_utils.isFunction)(plugin) ? plugin({}) : plugin
  );
  const hasAutoprefixer = pluginObjects.some((pluginObject) => {
    if ((0, import_utils.isPlainObject)(pluginObject) && "postcssPlugin" in pluginObject) {
      return pluginObject.postcssPlugin === "autoprefixer";
    }
    return false;
  });
  if (!hasAutoprefixer) {
    const { default: autoprefixer } = await Promise.resolve().then(() => __toESM(require("../compiled/autoprefixer")));
    const autoprefixerOptions = (0, import_mergeChainedOptions.mergeChainedOptions)({
      defaults: {
        flexbox: "no-2009",
        overrideBrowserslist: browserslist
      },
      options: config.tools.autoprefixer
    });
    pluginObjects.push(autoprefixer(autoprefixerOptions));
  }
  return pluginObjects;
};
const getPostcssLoaderOptions = async ({
  browserslist,
  config,
  root
}) => {
  const extraPlugins = [];
  const utils = {
    addPlugins(plugins) {
      if (Array.isArray(plugins)) {
        extraPlugins.push(...plugins);
      } else {
        extraPlugins.push(plugins);
      }
    }
  };
  const userPostcssConfig = await loadUserPostcssrc(root);
  let postcssPlugins = userPostcssConfig.plugins?.slice() || [];
  postcssPlugins = await applyAutoprefixer(
    postcssPlugins,
    browserslist,
    config
  );
  const defaultPostcssConfig = {
    postcssOptions: {
      ...userPostcssConfig,
      plugins: postcssPlugins
    },
    sourceMap: config.output.sourceMap.css
  };
  const mergedConfig = (0, import_mergeChainedOptions.mergeChainedOptions)({
    defaults: defaultPostcssConfig,
    options: config.tools.postcss,
    utils
  });
  if (extraPlugins.length) {
    mergedConfig?.postcssOptions?.plugins.push(...extraPlugins);
  }
  mergedConfig.postcssOptions || (mergedConfig.postcssOptions = {});
  mergedConfig.postcssOptions.config = false;
  return mergedConfig;
};
const normalizeCssLoaderOptions = (options, exportOnlyLocals) => {
  if (options.modules && exportOnlyLocals) {
    let { modules } = options;
    if (modules === true) {
      modules = { exportOnlyLocals: true };
    } else if (typeof modules === "string") {
      modules = { mode: modules, exportOnlyLocals: true };
    } else {
      modules = {
        ...modules,
        exportOnlyLocals: true
      };
    }
    return {
      ...options,
      modules
    };
  }
  return options;
};
const getCssLoaderOptions = ({
  config,
  importLoaders,
  isServer,
  isWebWorker,
  localIdentName
}) => {
  const { cssModules } = config.output;
  const defaultOptions = {
    importLoaders,
    modules: {
      auto: cssModules.auto,
      namedExport: false,
      exportLocalsConvention: cssModules.exportLocalsConvention,
      localIdentName
    },
    sourceMap: config.output.sourceMap.css
  };
  const mergedCssLoaderOptions = (0, import_mergeChainedOptions.mergeChainedOptions)({
    defaults: defaultOptions,
    options: config.tools.cssLoader,
    mergeFn: import_deepmerge.default
  });
  const cssLoaderOptions = normalizeCssLoaderOptions(
    mergedCssLoaderOptions,
    isServer || isWebWorker
  );
  return cssLoaderOptions;
};
const isUseCssExtract = (config, target) => !config.output.injectStyles && target !== "node" && target !== "web-worker";
const getResolveUrlJoinFn = async () => {
  const {
    createJoinFunction,
    asGenerator,
    createJoinImplementation,
    defaultJoinGenerator
  } = await Promise.resolve().then(() => __toESM(require("../compiled/resolve-url-loader")));
  const rsbuildGenerator = asGenerator((item, ...rest) => {
    if (!item.uri.startsWith(".")) {
      return [null];
    }
    return defaultJoinGenerator(item, ...rest);
  });
  return createJoinFunction(
    "rsbuild-resolve-join-fn",
    createJoinImplementation(rsbuildGenerator)
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyAutoprefixer,
  getCssLoaderOptions,
  getCssModuleLocalIdentName,
  getPostcssLoaderOptions,
  getResolveUrlJoinFn,
  isCssModules,
  isInNodeModules,
  isUseCssExtract,
  normalizeCssLoaderOptions
});
