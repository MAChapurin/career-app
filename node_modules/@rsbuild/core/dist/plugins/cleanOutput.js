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
var cleanOutput_exports = {};
__export(cleanOutput_exports, {
  pluginCleanOutput: () => pluginCleanOutput
});
module.exports = __toCommonJS(cleanOutput_exports);
var import_node_path = require("node:path");
var import_shared = require("@rsbuild/shared");
const emptyDir = async (dir) => {
  if (await import_shared.fse.pathExists(dir)) {
    await import_shared.fse.emptyDir(dir);
  }
};
const addTrailingSep = (dir) => dir.endsWith(import_node_path.sep) ? dir : dir + import_node_path.sep;
const isStrictSubdir = (parent, child) => {
  const parentDir = addTrailingSep(parent);
  const childDir = addTrailingSep(child);
  return parentDir !== childDir && childDir.startsWith(parentDir);
};
const pluginCleanOutput = () => ({
  name: "rsbuild:clean-output",
  setup(api) {
    const clean = async () => {
      const { distPath, rootPath } = api.context;
      const config = api.getNormalizedConfig();
      let { cleanDistPath } = config.output;
      if (cleanDistPath === void 0) {
        cleanDistPath = isStrictSubdir(rootPath, distPath);
        if (!cleanDistPath) {
          import_shared.logger.warn(
            "The dist path is not a subdir of root path, Rsbuild will not empty it."
          );
          import_shared.logger.warn(
            `Please set ${import_shared.color.yellow("`output.cleanDistPath`")} config manually.`
          );
          import_shared.logger.warn(`Current root path: ${import_shared.color.dim(rootPath)}`);
          import_shared.logger.warn(`Current dist path: ${import_shared.color.dim(distPath)}`);
        }
      }
      if (cleanDistPath) {
        await emptyDir(distPath);
      }
    };
    api.onBeforeBuild(clean);
    api.onBeforeStartDevServer(clean);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginCleanOutput
});
