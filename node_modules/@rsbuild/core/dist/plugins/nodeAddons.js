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
var nodeAddons_exports = {};
__export(nodeAddons_exports, {
  pluginNodeAddons: () => pluginNodeAddons
});
module.exports = __toCommonJS(nodeAddons_exports);
var import_node_path = __toESM(require("node:path"));
const getFilename = (resourcePath) => {
  let basename = "";
  if (resourcePath) {
    const parsed = import_node_path.default.parse(resourcePath);
    if (parsed.dir) {
      basename = parsed.name;
    }
  }
  if (basename) {
    return `${basename}.node`;
  }
  return null;
};
const pluginNodeAddons = () => ({
  name: "rsbuild:node-addons",
  setup(api) {
    api.transform(
      { test: /\.node$/, targets: ["node"], raw: true },
      ({ code, emitFile, resourcePath }) => {
        const name = getFilename(resourcePath);
        if (name === null) {
          throw new Error(`Failed to load Node.js addon: "${resourcePath}"`);
        }
        emitFile(name, code);
        return `
try {
const path = require("path");
process.dlopen(module, path.join(__dirname, "${name}"));
} catch (error) {
throw new Error('Failed to load Node.js addon: "${name}"\\n' + error);
}
`;
      }
    );
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginNodeAddons
});
