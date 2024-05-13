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
var config_exports = {};
__export(config_exports, {
  getDefaultStyledComponentsConfig: () => getDefaultStyledComponentsConfig,
  outputInspectConfigFiles: () => outputInspectConfigFiles,
  pickRsbuildConfig: () => pickRsbuildConfig,
  stringifyConfig: () => stringifyConfig
});
module.exports = __toCommonJS(config_exports);
var import_node_path = require("node:path");
var import_fs_extra = __toESM(require("../compiled/fs-extra"));
var import_logger = require("./logger");
var import_utils = require("./utils");
async function outputInspectConfigFiles({
  rsbuildConfig,
  rawRsbuildConfig,
  bundlerConfigs,
  inspectOptions,
  configType
}) {
  const { outputPath } = inspectOptions;
  const files = [
    {
      path: (0, import_node_path.join)(outputPath, "rsbuild.config.mjs"),
      label: "Rsbuild Config",
      content: rawRsbuildConfig
    },
    ...bundlerConfigs.map((content, index) => {
      const suffix = rsbuildConfig.output.targets[index];
      const outputFile = `${configType}.config.${suffix}.mjs`;
      let outputFilePath = (0, import_node_path.join)(outputPath, outputFile);
      if (import_fs_extra.default.existsSync(outputFilePath)) {
        outputFilePath = outputFilePath.replace(/\.mjs$/, `.${Date.now()}.mjs`);
      }
      return {
        path: outputFilePath,
        label: `${(0, import_utils.upperFirst)(configType)} Config (${suffix})`,
        content
      };
    })
  ];
  await Promise.all(
    files.map(
      (item) => import_fs_extra.default.outputFile(item.path, `export default ${item.content}`)
    )
  );
  const fileInfos = files.map(
    (item) => `  - ${import_utils.color.bold(import_utils.color.yellow(item.label))}: ${import_utils.color.underline(
      item.path
    )}`
  ).join("\n");
  import_logger.logger.success(
    `Inspect config succeed, open following files to view the content: 

${fileInfos}
`
  );
}
async function stringifyConfig(config, verbose) {
  const { default: WebpackChain } = await Promise.resolve().then(() => __toESM(require("../compiled/webpack-chain")));
  const stringify = WebpackChain.toString;
  return stringify(config, { verbose });
}
const getDefaultStyledComponentsConfig = (isProd, ssr) => {
  return {
    ssr,
    // "pure" is used to improve dead code elimination in production.
    // we don't need to enable it in development because it will slow down the build process.
    pure: isProd,
    displayName: true,
    transpileTemplateLiterals: true
  };
};
const pickRsbuildConfig = (rsbuildConfig) => {
  const keys = [
    "dev",
    "html",
    "tools",
    "output",
    "source",
    "server",
    "security",
    "performance",
    "moduleFederation",
    "_privateMeta"
  ];
  return (0, import_utils.pick)(rsbuildConfig, keys);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDefaultStyledComponentsConfig,
  outputInspectConfigFiles,
  pickRsbuildConfig,
  stringifyConfig
});
