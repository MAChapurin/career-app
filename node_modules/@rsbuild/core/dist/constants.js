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
var constants_exports = {};
__export(constants_exports, {
  PLUGIN_CSS_NAME: () => PLUGIN_CSS_NAME,
  PLUGIN_LESS_NAME: () => PLUGIN_LESS_NAME,
  PLUGIN_SASS_NAME: () => PLUGIN_SASS_NAME,
  PLUGIN_STYLUS_NAME: () => PLUGIN_STYLUS_NAME,
  PLUGIN_SWC_NAME: () => PLUGIN_SWC_NAME
});
module.exports = __toCommonJS(constants_exports);
const PLUGIN_SWC_NAME = "rsbuild:swc";
const PLUGIN_CSS_NAME = "rsbuild:css";
const PLUGIN_LESS_NAME = "rsbuild:less";
const PLUGIN_SASS_NAME = "rsbuild:sass";
const PLUGIN_STYLUS_NAME = "rsbuild:stylus";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PLUGIN_CSS_NAME,
  PLUGIN_LESS_NAME,
  PLUGIN_SASS_NAME,
  PLUGIN_STYLUS_NAME,
  PLUGIN_SWC_NAME
});
