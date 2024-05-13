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
var fs_exports = {};
__export(fs_exports, {
  findExists: () => findExists,
  findUp: () => findUp,
  fse: () => import_fs_extra.default,
  getDistPath: () => getDistPath,
  getFilename: () => getFilename,
  isFileExists: () => isFileExists,
  isFileSync: () => isFileSync
});
module.exports = __toCommonJS(fs_exports);
var import_node_fs = require("node:fs");
var import_node_path = __toESM(require("node:path"));
var import_fs_extra = __toESM(require("../compiled/fs-extra"));
const getDistPath = (config, type) => {
  const { distPath } = config.output || {};
  const ret = distPath?.[type];
  if (typeof ret !== "string") {
    if (type === "jsAsync") {
      const jsPath = getDistPath(config, "js");
      return jsPath ? `${jsPath}/async` : "async";
    }
    if (type === "cssAsync") {
      const cssPath = getDistPath(config, "css");
      return cssPath ? `${cssPath}/async` : "async";
    }
    throw new Error(`unknown key ${type} in "output.distPath"`);
  }
  return ret;
};
async function isFileExists(file) {
  return import_node_fs.promises.access(file, import_node_fs.constants.F_OK).then(() => true).catch(() => false);
}
const isFileSync = (filePath) => {
  try {
    return (0, import_node_fs.statSync)(filePath, { throwIfNoEntry: false })?.isFile();
  } catch (_) {
    return false;
  }
};
const findExists = (files) => {
  for (const file of files) {
    if (isFileSync(file)) {
      return file;
    }
  }
  return false;
};
const getFilename = (config, type, isProd) => {
  const { filename, filenameHash } = config.output;
  const getHash = () => {
    if (typeof filenameHash === "string") {
      return filenameHash ? `.[${filenameHash}]` : "";
    }
    return filenameHash ? ".[contenthash:8]" : "";
  };
  const hash = getHash();
  switch (type) {
    case "js":
      return filename.js ?? `[name]${isProd ? hash : ""}.js`;
    case "css":
      return filename.css ?? `[name]${isProd ? hash : ""}.css`;
    case "svg":
      return filename.svg ?? `[name]${hash}.svg`;
    case "font":
      return filename.font ?? `[name]${hash}[ext]`;
    case "image":
      return filename.image ?? `[name]${hash}[ext]`;
    case "media":
      return filename.media ?? `[name]${hash}[ext]`;
    default:
      throw new Error(`unknown key ${type} in "output.filename"`);
  }
};
async function findUp({
  filename,
  cwd = process.cwd()
}) {
  const { root } = import_node_path.default.parse(cwd);
  let dir = cwd;
  while (dir && dir !== root) {
    const filePath = import_node_path.default.join(dir, filename);
    try {
      const stats = await import_node_fs.promises.stat(filePath);
      if (stats?.isFile()) {
        return filePath;
      }
    } catch {
    }
    dir = import_node_path.default.dirname(dir);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findExists,
  findUp,
  fse,
  getDistPath,
  getFilename,
  isFileExists,
  isFileSync
});
