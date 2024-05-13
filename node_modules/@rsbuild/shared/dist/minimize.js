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
var minimize_exports = {};
__export(minimize_exports, {
  getHtmlMinifyOptions: () => getHtmlMinifyOptions,
  getSwcMinimizerOptions: () => getSwcMinimizerOptions,
  parseMinifyOptions: () => parseMinifyOptions
});
module.exports = __toCommonJS(minimize_exports);
var import_deepmerge = __toESM(require("../compiled/deepmerge"));
var import_utils = require("./utils");
function applyRemoveConsole(options, config) {
  const { removeConsole } = config.performance;
  const compressOptions = typeof options.compress === "boolean" ? {} : options.compress || {};
  if (removeConsole === true) {
    options.compress = {
      ...compressOptions,
      drop_console: true
    };
  } else if (Array.isArray(removeConsole)) {
    const pureFuncs = removeConsole.map((method) => `console.${method}`);
    options.compress = {
      ...compressOptions,
      pure_funcs: pureFuncs
    };
  }
  return options;
}
function getTerserMinifyOptions(config) {
  const options = {
    mangle: {
      safari10: true
    },
    format: {
      ascii_only: config.output.charset === "ascii"
    }
  };
  if (config.output.legalComments === "none") {
    options.format.comments = false;
  }
  const finalOptions = applyRemoveConsole(options, config);
  return finalOptions;
}
async function getHtmlMinifyOptions(isProd, config) {
  if (!isProd || !config.output.minify || !parseMinifyOptions(config).minifyHtml) {
    return false;
  }
  const minifyJS = getTerserMinifyOptions(config);
  const htmlMinifyDefaultOptions = {
    removeComments: false,
    useShortDoctype: true,
    keepClosingSlash: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeEmptyAttributes: true,
    minifyJS,
    minifyCSS: true,
    minifyURLs: true
  };
  const htmlMinifyOptions = parseMinifyOptions(config).htmlOptions;
  return typeof htmlMinifyOptions === "object" ? (0, import_deepmerge.default)(htmlMinifyDefaultOptions, htmlMinifyOptions) : htmlMinifyDefaultOptions;
}
const getSwcMinimizerOptions = (config) => {
  const options = {};
  const { removeConsole } = config.performance;
  if (removeConsole === true) {
    options.compress = {
      ...(0, import_utils.isObject)(options.compress) ? options.compress : {},
      drop_console: true
    };
  } else if (Array.isArray(removeConsole)) {
    const pureFuncs = removeConsole.map((method) => `console.${method}`);
    options.compress = {
      ...(0, import_utils.isObject)(options.compress) ? options.compress : {},
      pure_funcs: pureFuncs
    };
  }
  options.format || (options.format = {});
  switch (config.output.legalComments) {
    case "inline":
      options.format.comments = "some";
      options.extractComments = false;
      break;
    case "linked":
      options.extractComments = true;
      break;
    case "none":
      options.format.comments = false;
      options.extractComments = false;
      break;
    default:
      break;
  }
  options.format.asciiOnly = config.output.charset === "ascii";
  const jsOptions = parseMinifyOptions(config).jsOptions;
  if (jsOptions) {
    return (0, import_deepmerge.default)(options, jsOptions);
  }
  return options;
};
const parseMinifyOptions = (config, isProd = true) => {
  const minify = config.output.minify;
  if (minify === false || !isProd) {
    return {
      minifyJs: false,
      minifyCss: false,
      minifyHtml: false,
      jsOptions: void 0,
      htmlOptions: void 0
    };
  }
  if (minify === true) {
    return {
      minifyJs: true,
      minifyCss: true,
      minifyHtml: true,
      jsOptions: void 0,
      htmlOptions: void 0
    };
  }
  return {
    minifyJs: minify.js !== false,
    minifyCss: minify.css !== false,
    minifyHtml: minify.html !== false,
    jsOptions: minify.jsOptions,
    htmlOptions: minify.htmlOptions
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHtmlMinifyOptions,
  getSwcMinimizerOptions,
  parseMinifyOptions
});
