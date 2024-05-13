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
var getLoaderOptions_exports = {};
__export(getLoaderOptions_exports, {
  getLessLoaderOptions: () => getLessLoaderOptions,
  getSassLoaderOptions: () => getSassLoaderOptions
});
module.exports = __toCommonJS(getLoaderOptions_exports);
var import_node_path = __toESM(require("node:path"));
var import_mergeChainedOptions = require("./mergeChainedOptions");
var import_utils = require("./utils");
const getSassLoaderOptions = (rsbuildSassConfig, isUseCssSourceMap) => {
  const excludes = [];
  const addExcludes = (items) => {
    excludes.push(...(0, import_utils.castArray)(items));
  };
  const mergeFn = (defaults, userOptions) => {
    const getSassOptions = () => {
      if (defaults.sassOptions && userOptions.sassOptions) {
        return (0, import_utils.deepmerge)(
          defaults.sassOptions,
          userOptions.sassOptions
        );
      }
      return userOptions.sassOptions || defaults.sassOptions;
    };
    return {
      ...defaults,
      ...userOptions,
      sassOptions: getSassOptions()
    };
  };
  const mergedOptions = (0, import_mergeChainedOptions.mergeChainedOptions)({
    defaults: {
      sourceMap: isUseCssSourceMap,
      implementation: (0, import_utils.getSharedPkgCompiledPath)("sass")
    },
    options: rsbuildSassConfig,
    utils: { addExcludes },
    mergeFn
  });
  return {
    options: mergedOptions,
    excludes
  };
};
const getLessLoaderOptions = (rsbuildLessConfig, isUseCssSourceMap, rootPath) => {
  const excludes = [];
  const addExcludes = (items) => {
    excludes.push(...(0, import_utils.castArray)(items));
  };
  const defaultLessLoaderOptions = {
    lessOptions: {
      javascriptEnabled: true,
      // let less resolve from node_modules in the current root directory,
      // Avoid resolving from wrong node_modules.
      paths: [import_node_path.default.join(rootPath, "node_modules")]
    },
    sourceMap: isUseCssSourceMap,
    implementation: (0, import_utils.getSharedPkgCompiledPath)("less")
  };
  const mergeFn = (defaults, userOptions) => {
    const getLessOptions = () => {
      if (defaults.lessOptions && userOptions.lessOptions) {
        return (0, import_utils.deepmerge)(defaults.lessOptions, userOptions.lessOptions);
      }
      return userOptions.lessOptions || defaults.lessOptions;
    };
    return {
      ...defaults,
      ...userOptions,
      lessOptions: getLessOptions()
    };
  };
  const mergedOptions = (0, import_mergeChainedOptions.mergeChainedOptions)({
    defaults: defaultLessLoaderOptions,
    options: rsbuildLessConfig,
    utils: { addExcludes },
    mergeFn
  });
  return {
    options: mergedOptions,
    excludes
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getLessLoaderOptions,
  getSassLoaderOptions
});
