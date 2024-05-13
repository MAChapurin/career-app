"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var HtmlAppIconPlugin_exports = {};
__export(HtmlAppIconPlugin_exports, {
  HtmlAppIconPlugin: () => HtmlAppIconPlugin
});
module.exports = __toCommonJS(HtmlAppIconPlugin_exports);
var import_node_fs = __toESM(require("node:fs"));
var import_node_path = require("node:path");
var import_shared = require("@rsbuild/shared");
var import_htmlUtils = require("../htmlUtils");
class HtmlAppIconPlugin {
  constructor(options) {
    __publicField(this, "name");
    __publicField(this, "distDir");
    __publicField(this, "iconPath");
    this.name = "HtmlAppIconPlugin";
    this.distDir = options.distDir;
    this.iconPath = options.iconPath;
  }
  apply(compiler) {
    if (!import_node_fs.default.existsSync(this.iconPath)) {
      throw new Error(
        `[${this.name}] Can not find the app icon, please check if the '${this.iconPath}' file exists'.`
      );
    }
    const iconRelativePath = import_node_path.posix.join(this.distDir, (0, import_node_path.basename)(this.iconPath));
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      (0, import_htmlUtils.getHTMLPlugin)().getHooks(compilation).alterAssetTagGroups.tap(this.name, (data) => {
        const publicPath = (0, import_shared.getPublicPathFromCompiler)(compiler);
        data.headTags.unshift({
          tagName: "link",
          voidTag: true,
          attributes: {
            rel: "apple-touch-icon",
            sizes: "180*180",
            href: (0, import_shared.withPublicPath)(iconRelativePath, publicPath)
          },
          meta: {}
        });
        return data;
      });
    });
    compiler.hooks.thisCompilation.tap(
      this.name,
      (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: this.name,
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS
          },
          () => {
            const source = import_node_fs.default.readFileSync(this.iconPath);
            compilation.emitAsset(
              iconRelativePath,
              new compiler.webpack.sources.RawSource(source, false)
            );
          }
        );
      }
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HtmlAppIconPlugin
});
