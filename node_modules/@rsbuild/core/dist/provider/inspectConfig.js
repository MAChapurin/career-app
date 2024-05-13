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
var inspectConfig_exports = {};
__export(inspectConfig_exports, {
  inspectConfig: () => inspectConfig
});
module.exports = __toCommonJS(inspectConfig_exports);
var import_node_path = require("node:path");
var import_shared = require("@rsbuild/shared");
var import_initConfigs = require("./initConfigs");
async function inspectConfig({
  context,
  pluginManager,
  rsbuildOptions,
  bundlerConfigs,
  inspectOptions = {}
}) {
  if (inspectOptions.env) {
    (0, import_shared.setNodeEnv)(inspectOptions.env);
  } else if (!(0, import_shared.getNodeEnv)()) {
    (0, import_shared.setNodeEnv)("development");
  }
  const rspackConfigs = bundlerConfigs || (await (0, import_initConfigs.initConfigs)({
    context,
    pluginManager,
    rsbuildOptions
  })).rspackConfigs;
  const rsbuildDebugConfig = {
    ...context.normalizedConfig,
    pluginNames: pluginManager.plugins.map((p) => p.name)
  };
  const rawRsbuildConfig = await (0, import_shared.stringifyConfig)(
    rsbuildDebugConfig,
    inspectOptions.verbose
  );
  const rawBundlerConfigs = await Promise.all(
    rspackConfigs.map(
      (config) => (0, import_shared.stringifyConfig)(config, inspectOptions.verbose)
    )
  );
  let outputPath = inspectOptions.outputPath || context.distPath;
  if (!(0, import_node_path.isAbsolute)(outputPath)) {
    outputPath = (0, import_node_path.join)(context.rootPath, outputPath);
  }
  if (inspectOptions.writeToDisk) {
    await (0, import_shared.outputInspectConfigFiles)({
      rsbuildConfig: context.normalizedConfig,
      rawRsbuildConfig,
      bundlerConfigs: rawBundlerConfigs,
      inspectOptions: {
        ...inspectOptions,
        outputPath
      },
      configType: "rspack"
    });
  }
  return {
    rsbuildConfig: rawRsbuildConfig,
    bundlerConfigs: rawBundlerConfigs,
    origin: {
      rsbuildConfig: rsbuildDebugConfig,
      bundlerConfigs: rspackConfigs
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  inspectConfig
});
