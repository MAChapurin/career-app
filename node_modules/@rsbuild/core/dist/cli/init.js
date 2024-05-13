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
var init_exports = {};
__export(init_exports, {
  init: () => init
});
module.exports = __toCommonJS(init_exports);
var import_shared = require("@rsbuild/shared");
var import_config = require("../config");
var import_loadEnv = require("../loadEnv");
var import_restart = require("../server/restart");
let commonOpts = {};
async function init({
  cliOptions,
  isRestart
}) {
  if (cliOptions) {
    commonOpts = cliOptions;
  }
  try {
    const root = process.cwd();
    const envs = (0, import_loadEnv.loadEnv)({
      cwd: root,
      mode: cliOptions?.envMode
    });
    if ((0, import_shared.isDev)()) {
      (0, import_restart.onBeforeRestartServer)(envs.cleanup);
    }
    const { content: config, filePath: configFilePath } = await (0, import_config.loadConfig)({
      cwd: root,
      path: commonOpts.config,
      envMode: commonOpts.envMode
    });
    const command = process.argv[2];
    if (command === "dev") {
      const files = [...envs.filePaths];
      if (configFilePath) {
        files.push(configFilePath);
      }
      (0, import_config.watchFiles)(files);
    }
    const { createRsbuild } = await Promise.resolve().then(() => __toESM(require("../createRsbuild")));
    config.source || (config.source = {});
    config.source.define = {
      ...envs.publicVars,
      ...config.source.define
    };
    if (commonOpts.open && !config.dev?.startUrl) {
      config.dev || (config.dev = {});
      config.dev.startUrl = commonOpts.open;
    }
    if (commonOpts.host) {
      config.server || (config.server = {});
      config.server.host = commonOpts.host;
    }
    if (commonOpts.port) {
      config.server || (config.server = {});
      config.server.port = commonOpts.port;
    }
    return createRsbuild({
      cwd: root,
      rsbuildConfig: config
    });
  } catch (err) {
    if (isRestart) {
      import_shared.logger.error(err);
    } else {
      throw err;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  init
});
