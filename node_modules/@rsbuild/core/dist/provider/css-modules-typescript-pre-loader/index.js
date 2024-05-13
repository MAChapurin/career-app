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
var css_modules_typescript_pre_loader_exports = {};
__export(css_modules_typescript_pre_loader_exports, {
  default: () => css_modules_typescript_pre_loader_default
});
module.exports = __toCommonJS(css_modules_typescript_pre_loader_exports);
var import_shared = require("@rsbuild/shared");
var import_css_modules_typescript_loader = __toESM(require("@rsbuild/shared/css-modules-typescript-loader"));
async function processCss(inputSource, {
  exportLocalsConvention
}) {
  const { default: postcss } = await Promise.resolve().then(() => __toESM(require("postcss")));
  const { default: localByDefault } = await Promise.resolve().then(() => __toESM(require("@rsbuild/shared/postcss-modules-local-by-default")));
  const { default: modulesScope } = await Promise.resolve().then(() => __toESM(require("@rsbuild/shared/postcss-modules-scope")));
  const { default: postcssICSSExtractPlugin } = await Promise.resolve().then(() => __toESM(require("./postcssIcssExtractPlugin")));
  const { default: extractImports } = await Promise.resolve().then(() => __toESM(require("@rsbuild/shared/postcss-modules-extract-imports")));
  const { default: modulesValues } = await Promise.resolve().then(() => __toESM(require("@rsbuild/shared/postcss-modules-values")));
  const parserOptions = {
    exportLocalsConvention
  };
  const pipeline = postcss([
    localByDefault({
      mode: "local"
    }),
    extractImports(),
    modulesValues,
    modulesScope({
      // scopedName is not important in this scenario
      generateScopedName: (exportName) => exportName,
      exportGlobals: false
    }),
    postcssICSSExtractPlugin(parserOptions)
  ]);
  await pipeline.process(inputSource, {
    from: "/fake-css-modules-loader",
    to: void 0
  });
  return {
    cssModuleKeys: parserOptions.cssModuleKeys
  };
}
async function css_modules_typescript_pre_loader_default(content, ...input) {
  if (this.cacheable) {
    this.cacheable();
  }
  const filename = this.resourcePath;
  const { modules } = this.getOptions() || {};
  const callback = this.async();
  if (!(0, import_shared.isCssModules)(filename, modules) || (0, import_shared.isInNodeModules)(filename)) {
    return callback(null, content, ...input);
  }
  const { cssModuleKeys } = await processCss(content, {
    exportLocalsConvention: modules.exportLocalsConvention
  });
  this.cssModuleKeys = cssModuleKeys;
  return import_css_modules_typescript_loader.default.call(this, content, ...input);
}
