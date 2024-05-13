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
var RemoveCssSourcemapPlugin_exports = {};
__export(RemoveCssSourcemapPlugin_exports, {
  RemoveCssSourcemapPlugin: () => RemoveCssSourcemapPlugin
});
module.exports = __toCommonJS(RemoveCssSourcemapPlugin_exports);
class RemoveCssSourcemapPlugin {
  constructor() {
    __publicField(this, "name");
    this.name = "RemoveCssSourcemapPlugin";
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.name,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        },
        () => {
          for (const name of Object.keys(compilation.assets)) {
            if (name.endsWith(".css.map")) {
              compilation.deleteAsset(name);
            }
          }
        }
      );
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RemoveCssSourcemapPlugin
});
