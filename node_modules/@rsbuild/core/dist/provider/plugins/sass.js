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
var sass_exports = {};
__export(sass_exports, {
  pluginSass: () => pluginSass
});
module.exports = __toCommonJS(sass_exports);
var import_shared = require("@rsbuild/shared");
function pluginSass() {
  return {
    name: "rsbuild:sass",
    setup(api) {
      api.onAfterCreateCompiler(({ compiler }) => {
        (0, import_shared.patchCompilerGlobalLocation)(compiler);
      });
      api.modifyBundlerChain(async (chain, utils) => {
        const config = api.getNormalizedConfig();
        const { applyBaseCSSRule } = await Promise.resolve().then(() => __toESM(require("./css")));
        const { excludes, options } = (0, import_shared.getSassLoaderOptions)(
          config.tools.sass,
          // source-maps required for loaders preceding resolve-url-loader
          // otherwise the resolve-url-loader will throw an error
          true
        );
        const rule = chain.module.rule(utils.CHAIN_ID.RULE.SASS).test(import_shared.SASS_REGEX);
        for (const item of excludes) {
          rule.exclude.add(item);
        }
        await applyBaseCSSRule({
          rule,
          utils,
          config,
          context: api.context,
          // postcss-loader, resolve-url-loader, sass-loader
          importLoaders: 3
        });
        rule.use(utils.CHAIN_ID.USE.RESOLVE_URL).loader((0, import_shared.getSharedPkgCompiledPath)("resolve-url-loader")).options({
          join: await (0, import_shared.getResolveUrlJoinFn)(),
          // 'resolve-url-loader' relies on 'adjust-sourcemap-loader',
          // it has performance regression issues in some scenarios,
          // so we need to disable the sourceMap option.
          sourceMap: false
        }).end().use(utils.CHAIN_ID.USE.SASS).loader((0, import_shared.getSharedPkgCompiledPath)("sass-loader")).options(options);
      });
      api.modifyRspackConfig(async (rspackConfig) => {
        const { applyCSSModuleRule } = await Promise.resolve().then(() => __toESM(require("./css")));
        const config = api.getNormalizedConfig();
        const rules = rspackConfig.module?.rules;
        applyCSSModuleRule(rules, import_shared.SASS_REGEX, config);
      });
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginSass
});
