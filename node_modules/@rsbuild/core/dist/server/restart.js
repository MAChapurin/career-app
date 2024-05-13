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
var restart_exports = {};
__export(restart_exports, {
  onBeforeRestartServer: () => onBeforeRestartServer,
  restartDevServer: () => restartDevServer
});
module.exports = __toCommonJS(restart_exports);
var import_node_path = __toESM(require("node:path"));
var import_shared = require("@rsbuild/shared");
var import_init = require("../cli/init");
let cleaners = [];
const onBeforeRestartServer = (cleaner) => {
  cleaners.push(cleaner);
};
const clearConsole = () => {
  if (process.stdout.isTTY && !process.env.DEBUG) {
    process.stdout.write("\x1B[H\x1B[2J");
  }
};
const restartDevServer = async ({ filePath }) => {
  clearConsole();
  const filename = import_node_path.default.basename(filePath);
  import_shared.logger.info(`Restart because ${import_shared.color.yellow(filename)} is changed.
`);
  for (const cleaner of cleaners) {
    await cleaner();
    cleaners = [];
  }
  const rsbuild = await (0, import_init.init)({ isRestart: true });
  if (!rsbuild) {
    return;
  }
  await rsbuild.startDevServer();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  onBeforeRestartServer,
  restartDevServer
});
