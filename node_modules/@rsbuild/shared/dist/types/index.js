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
var types_exports = {};
module.exports = __toCommonJS(types_exports);
__reExport(types_exports, require("./rspack"), module.exports);
__reExport(types_exports, require("./rsbuild"), module.exports);
__reExport(types_exports, require("./context"), module.exports);
__reExport(types_exports, require("./utils"), module.exports);
__reExport(types_exports, require("./plugin"), module.exports);
__reExport(types_exports, require("./provider"), module.exports);
__reExport(types_exports, require("./config"), module.exports);
__reExport(types_exports, require("./stats"), module.exports);
__reExport(types_exports, require("./hooks"), module.exports);
__reExport(types_exports, require("./bundlerConfig"), module.exports);
__reExport(types_exports, require("./thirdParty"), module.exports);
__reExport(types_exports, require("./server"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./rspack"),
  ...require("./rsbuild"),
  ...require("./context"),
  ...require("./utils"),
  ...require("./plugin"),
  ...require("./provider"),
  ...require("./config"),
  ...require("./stats"),
  ...require("./hooks"),
  ...require("./bundlerConfig"),
  ...require("./thirdParty"),
  ...require("./server")
});
