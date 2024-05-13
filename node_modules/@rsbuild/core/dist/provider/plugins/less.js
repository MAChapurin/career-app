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
var less_exports = {};
__export(less_exports, {
  pluginLess: () => pluginLess
});
module.exports = __toCommonJS(less_exports);
var import_shared = require("@rsbuild/shared");
function pluginLess() {
  return {
    name: "rsbuild:less",
    setup(api) {
      api.modifyBundlerChain(async (chain, utils) => {
        const config = api.getNormalizedConfig();
        const { applyBaseCSSRule } = await Promise.resolve().then(() => __toESM(require("./css")));
        const rule = chain.module.rule(utils.CHAIN_ID.RULE.LESS).test(import_shared.LESS_REGEX);
        const { excludes, options } = (0, import_shared.getLessLoaderOptions)(
          config.tools.less,
          config.output.sourceMap.css,
          api.context.rootPath
        );
        for (const item of excludes) {
          rule.exclude.add(item);
        }
        await applyBaseCSSRule({
          rule,
          utils,
          config,
          context: api.context,
          importLoaders: 2
        });
        rule.use(utils.CHAIN_ID.USE.LESS).loader((0, import_shared.getSharedPkgCompiledPath)("less-loader")).options(options);
      });
      api.modifyRspackConfig(async (rspackConfig) => {
        const { applyCSSModuleRule } = await Promise.resolve().then(() => __toESM(require("./css")));
        const config = api.getNormalizedConfig();
        const rules = rspackConfig.module?.rules;
        applyCSSModuleRule(rules, import_shared.LESS_REGEX, config);
      });
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginLess
});
