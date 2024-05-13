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
var cache_exports = {};
__export(cache_exports, {
  pluginCache: () => pluginCache
});
module.exports = __toCommonJS(cache_exports);
var import_node_crypto = __toESM(require("node:crypto"));
var import_node_path = require("node:path");
var import_shared = require("@rsbuild/shared");
var import_shared2 = require("@rsbuild/shared");
async function validateCache(cacheDirectory, buildDependencies) {
  const configFile = (0, import_node_path.join)(cacheDirectory, "buildDependencies.json");
  if (await (0, import_shared2.isFileExists)(configFile)) {
    const prevBuildDependencies = await import_shared.fse.readJSON(configFile);
    if (JSON.stringify(prevBuildDependencies) === JSON.stringify(buildDependencies)) {
      return;
    }
    await import_shared.fse.remove(cacheDirectory);
  }
  await import_shared.fse.outputJSON(configFile, buildDependencies);
}
function getDigestHash(digest) {
  const fsHash = import_node_crypto.default.createHash("md5");
  const md5 = fsHash.update(JSON.stringify(digest)).digest("hex").slice(0, 8);
  return md5;
}
function getCacheDirectory({ cacheDirectory }, context) {
  if (cacheDirectory) {
    return (0, import_node_path.isAbsolute)(cacheDirectory) ? cacheDirectory : (0, import_node_path.join)(context.rootPath, cacheDirectory);
  }
  return (0, import_node_path.join)(context.cachePath, context.bundlerType);
}
async function getBuildDependencies(context, config) {
  const rootPackageJson = (0, import_node_path.join)(context.rootPath, "package.json");
  const browserslistConfig = (0, import_node_path.join)(context.rootPath, ".browserslistrc");
  const buildDependencies = {};
  if (await (0, import_shared2.isFileExists)(rootPackageJson)) {
    buildDependencies.packageJson = [rootPackageJson];
  }
  if (context.tsconfigPath) {
    buildDependencies.tsconfig = [context.tsconfigPath];
  }
  if (config._privateMeta?.configFilePath) {
    buildDependencies.rsbuildConfig = [config._privateMeta.configFilePath];
  }
  if (await (0, import_shared2.isFileExists)(browserslistConfig)) {
    buildDependencies.browserslistrc = [browserslistConfig];
  }
  const tailwindExts = ["ts", "js", "cjs", "mjs"];
  const configs = tailwindExts.map(
    (ext) => (0, import_node_path.join)(context.rootPath, `tailwind.config.${ext}`)
  );
  const tailwindConfig = (0, import_shared2.findExists)(configs);
  if (tailwindConfig) {
    buildDependencies.tailwindcss = [tailwindConfig];
  }
  return buildDependencies;
}
const pluginCache = () => ({
  name: "rsbuild:cache",
  setup(api) {
    api.modifyBundlerChain(async (chain, { target, env }) => {
      const config = api.getNormalizedConfig();
      const { buildCache } = config.performance;
      if (buildCache === false) {
        chain.cache(false);
        return;
      }
      const { context } = api;
      const cacheConfig = typeof buildCache === "boolean" ? {} : buildCache;
      const cacheDirectory = getCacheDirectory(cacheConfig, context);
      const buildDependencies = await getBuildDependencies(context, config);
      await validateCache(cacheDirectory, buildDependencies);
      const useDigest = Array.isArray(cacheConfig.cacheDigest) && cacheConfig.cacheDigest.length;
      chain.cache({
        // The default cache name of webpack is '${name}-${env}', and the `name` is `default` by default.
        // We set cache name to avoid cache conflicts of different targets.
        name: useDigest ? `${target}-${env}-${getDigestHash(cacheConfig.cacheDigest)}` : `${target}-${env}`,
        type: "filesystem",
        cacheDirectory,
        buildDependencies
      });
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginCache
});
