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
var basic_exports = {};
__export(basic_exports, {
  pluginBasic: () => pluginBasic
});
module.exports = __toCommonJS(basic_exports);
var import_node_path = __toESM(require("node:path"));
var import_shared = require("@rsbuild/shared");
const pluginBasic = () => ({
  name: "rsbuild:basic",
  setup(api) {
    api.modifyBundlerChain(
      (chain, { env, isProd, target, bundler, CHAIN_ID }) => {
        const config = api.getNormalizedConfig();
        chain.name(import_shared.TARGET_ID_MAP[target]);
        chain.devtool((0, import_shared.getJsSourceMap)(config));
        chain.context(api.context.rootPath);
        chain.mode(isProd ? "production" : "development");
        chain.merge({
          infrastructureLogging: {
            // Using `error` level to avoid `cache.PackFileCacheStrategy` logs
            level: "error"
          }
        });
        chain.ignoreWarnings([/Conflicting order/]);
        chain.performance.hints(false);
        chain.module.parser.merge({
          javascript: {
            exportsPresence: "error"
          }
        });
        const isMinimize = isProd && config.output.minify !== false;
        chain.optimization.minimize(isMinimize);
        const usingHMR = (0, import_shared.isUsingHMR)(config, { target, isProd });
        if (usingHMR) {
          chain.plugin(CHAIN_ID.PLUGIN.HMR).use(bundler.HotModuleReplacementPlugin);
        }
        if (env === "development") {
          chain.output.devtoolModuleFilenameTemplate(
            (info) => import_node_path.default.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
          );
        }
      }
    );
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginBasic
});
