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
var postcssIcssExtractPlugin_exports = {};
__export(postcssIcssExtractPlugin_exports, {
  default: () => postcssIcssExtractPlugin_default
});
module.exports = __toCommonJS(postcssIcssExtractPlugin_exports);
var import_shared = require("@rsbuild/shared");
var import_icss_utils = require("@rsbuild/shared/icss-utils");
const dashesCamelCase = (str) => str.replace(/-+(\w)/g, (_match, firstLetter) => firstLetter.toUpperCase());
const getExportLocalsConvention = (name, exportLocalsConventionType) => {
  switch (exportLocalsConventionType) {
    case "camelCase": {
      const camelName = (0, import_shared.camelCase)(name);
      return camelName === name ? [name] : [name, (0, import_shared.camelCase)(name)];
    }
    case "camelCaseOnly": {
      return [(0, import_shared.camelCase)(name)];
    }
    case "dashes": {
      const dashesCamelName = dashesCamelCase(name);
      return dashesCamelName === name ? [name] : [name, dashesCamelCase(name)];
    }
    case "dashesOnly": {
      return [dashesCamelCase(name)];
    }
    default:
      return [name];
  }
};
const plugin = (options) => {
  return {
    postcssPlugin: "postcss-icss-extract",
    OnceExit(root) {
      const { icssExports } = (0, import_icss_utils.extractICSS)(root);
      const cssModuleKeys = Object.keys(icssExports).reduce(
        (total, key) => {
          total.push(
            ...getExportLocalsConvention(key, options.exportLocalsConvention)
          );
          return total;
        },
        []
      );
      options.cssModuleKeys = cssModuleKeys;
    }
  };
};
plugin.postcss = true;
var postcssIcssExtractPlugin_default = plugin;
