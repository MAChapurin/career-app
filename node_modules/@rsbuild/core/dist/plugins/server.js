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
var server_exports = {};
__export(server_exports, {
  pluginServer: () => pluginServer
});
module.exports = __toCommonJS(server_exports);
var import_node_path = require("node:path");
var import_shared = require("@rsbuild/shared");
const pluginServer = () => ({
  name: "rsbuild:server",
  setup(api) {
    api.onBeforeBuild(async () => {
      const config = api.getNormalizedConfig();
      if (config.server?.publicDir) {
        const { name, copyOnBuild } = config.server.publicDir;
        if (!copyOnBuild || !name) {
          return;
        }
        const publicDir = (0, import_node_path.isAbsolute)(name) ? name : (0, import_node_path.join)(api.context.rootPath, name);
        if (!import_shared.fse.existsSync(publicDir)) {
          return;
        }
        try {
          await import_shared.fse.copy(publicDir, api.context.distPath, {
            // dereference symlinks
            dereference: true
          });
        } catch (err) {
          if (err instanceof Error) {
            err.message = `Copy public dir (${publicDir}) to dist failed:
${err.message}`;
          }
          throw err;
        }
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginServer
});
