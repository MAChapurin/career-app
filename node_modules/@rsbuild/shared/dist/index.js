"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
module.exports = __toCommonJS(src_exports);
__reExport(src_exports, require("./constants"), module.exports);
__reExport(src_exports, require("./utils"), module.exports);
__reExport(src_exports, require("./fs"), module.exports);
__reExport(src_exports, require("./getBrowserslist"), module.exports);
__reExport(src_exports, require("./logger"), module.exports);
__reExport(src_exports, require("./mergeChainedOptions"), module.exports);
__reExport(src_exports, require("./types"), module.exports);
__reExport(src_exports, require("./config"), module.exports);
__reExport(src_exports, require("./chain"), module.exports);
__reExport(src_exports, require("./getLoaderOptions"), module.exports);
__reExport(src_exports, require("./patch"), module.exports);
__reExport(src_exports, require("./css"), module.exports);
__reExport(src_exports, require("./minimize"), module.exports);
__reExport(src_exports, require("./url"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./constants"),
  ...require("./utils"),
  ...require("./fs"),
  ...require("./getBrowserslist"),
  ...require("./logger"),
  ...require("./mergeChainedOptions"),
  ...require("./types"),
  ...require("./config"),
  ...require("./chain"),
  ...require("./getLoaderOptions"),
  ...require("./patch"),
  ...require("./css"),
  ...require("./minimize"),
  ...require("./url")
});
