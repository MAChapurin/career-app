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
var config_exports = {};
module.exports = __toCommonJS(config_exports);
__reExport(config_exports, require("./dev"), module.exports);
__reExport(config_exports, require("./html"), module.exports);
__reExport(config_exports, require("./tools"), module.exports);
__reExport(config_exports, require("./source"), module.exports);
__reExport(config_exports, require("./server"), module.exports);
__reExport(config_exports, require("./output"), module.exports);
__reExport(config_exports, require("./security"), module.exports);
__reExport(config_exports, require("./performance"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./dev"),
  ...require("./html"),
  ...require("./tools"),
  ...require("./source"),
  ...require("./server"),
  ...require("./output"),
  ...require("./security"),
  ...require("./performance")
});
