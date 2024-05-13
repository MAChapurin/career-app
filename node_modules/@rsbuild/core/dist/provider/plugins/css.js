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
var css_exports = {};
__export(css_exports, {
  applyBaseCSSRule: () => applyBaseCSSRule,
  applyCSSModuleRule: () => applyCSSModuleRule,
  enableNativeCss: () => enableNativeCss,
  pluginCss: () => pluginCss
});
module.exports = __toCommonJS(css_exports);
var import_node_path = __toESM(require("node:path"));
var import_shared = require("@rsbuild/shared");
const enableNativeCss = (config) => !config.output.injectStyles;
async function applyBaseCSSRule({
  rule,
  config,
  context,
  utils: { target, isProd, isServer, isWebWorker, CHAIN_ID },
  importLoaders = 1
}) {
  const enableCSSModuleTS = Boolean(config.output.enableCssModuleTSDeclaration);
  const browserslist = await (0, import_shared.getBrowserslistWithDefault)(
    context.rootPath,
    config,
    target
  );
  if (!enableNativeCss(config)) {
    const localIdentName = (0, import_shared.getCssModuleLocalIdentName)(config, isProd);
    const cssLoaderOptions = (0, import_shared.getCssLoaderOptions)({
      config,
      importLoaders,
      isServer,
      isWebWorker,
      localIdentName
    });
    if (!isServer && !isWebWorker) {
      const styleLoaderOptions = (0, import_shared.mergeChainedOptions)({
        defaults: {},
        options: config.tools.styleLoader
      });
      rule.use(CHAIN_ID.USE.STYLE).loader((0, import_shared.getSharedPkgCompiledPath)("style-loader")).options(styleLoaderOptions).end();
      if (enableCSSModuleTS && cssLoaderOptions.modules) {
        rule.use(CHAIN_ID.USE.CSS_MODULES_TS).loader(
          (0, import_shared.resolvePackage)(
            "@rsbuild/shared/css-modules-typescript-loader",
            __dirname
          )
        ).options({
          modules: cssLoaderOptions.modules
        }).end();
      }
    } else {
      rule.use(CHAIN_ID.USE.IGNORE_CSS).loader((0, import_shared.resolvePackage)("@rsbuild/shared/ignore-css-loader", __dirname)).end();
    }
    rule.use(CHAIN_ID.USE.CSS).loader((0, import_shared.getSharedPkgCompiledPath)("css-loader")).options(cssLoaderOptions).end();
  } else {
    if (!isServer && !isWebWorker && enableCSSModuleTS) {
      const { cssModules } = config.output;
      rule.use(CHAIN_ID.USE.CSS_MODULES_TS).loader(import_node_path.default.resolve(__dirname, "../css-modules-typescript-pre-loader")).options({
        modules: {
          exportLocalsConvention: cssModules.exportLocalsConvention,
          auto: cssModules.auto
        }
      }).end();
    }
    rule.type("css");
  }
  if (!isServer && !isWebWorker) {
    const postcssLoaderOptions = await (0, import_shared.getPostcssLoaderOptions)({
      browserslist,
      config,
      root: context.rootPath
    });
    rule.use(CHAIN_ID.USE.POSTCSS).loader((0, import_shared.getSharedPkgCompiledPath)("postcss-loader")).options(postcssLoaderOptions).end();
  }
  rule.merge({ sideEffects: true });
  rule.resolve.preferRelative(true);
}
const applyCSSModuleRule = (rules, ruleTest, config) => {
  if (!rules || !enableNativeCss(config)) {
    return;
  }
  const ruleIndex = rules.findIndex(
    (r) => r && r !== "..." && r.test === ruleTest
  );
  if (ruleIndex === -1) {
    return;
  }
  const cssModulesAuto = config.output.cssModules.auto;
  if (!cssModulesAuto) {
    return;
  }
  const rule = rules[ruleIndex];
  const { test, type, ...rest } = rule;
  rules[ruleIndex] = {
    test: ruleTest,
    oneOf: [
      {
        ...rest,
        test: typeof cssModulesAuto !== "boolean" ? cssModulesAuto : (
          // auto: true
          import_shared.CSS_MODULES_REGEX
        ),
        type: "css/module"
      },
      {
        ...rest,
        type: "css"
      }
    ]
  };
};
const pluginCss = () => {
  return {
    name: "rsbuild:css",
    setup(api) {
      api.modifyBundlerChain(async (chain, utils) => {
        const config = api.getNormalizedConfig();
        const rule = chain.module.rule(utils.CHAIN_ID.RULE.CSS);
        rule.test(import_shared.CSS_REGEX);
        await applyBaseCSSRule({
          rule,
          utils,
          config,
          context: api.context
        });
        const enableExtractCSS = (0, import_shared.isUseCssExtract)(config, utils.target);
        if (!config.output.sourceMap.css && enableExtractCSS) {
          const { RemoveCssSourcemapPlugin } = await Promise.resolve().then(() => __toESM(require("../../rspack/RemoveCssSourcemapPlugin")));
          chain.plugin("remove-css-sourcemap").use(RemoveCssSourcemapPlugin, []);
        }
      });
      api.modifyRspackConfig(
        async (rspackConfig, { isProd, isServer, isWebWorker }) => {
          var _a, _b;
          const config = api.getNormalizedConfig();
          if (!enableNativeCss(config)) {
            rspackConfig.experiments || (rspackConfig.experiments = {});
            rspackConfig.experiments.css = false;
            return;
          }
          let localIdentName = config.output.cssModules.localIdentName || // Using shorter classname in production to reduce bundle size
          (isProd ? "[local]-[hash:6]" : "[path][name]__[local]-[hash:6]");
          if (localIdentName.includes(":base64")) {
            import_shared.logger.warn(
              `Custom hashDigest in output.cssModules.localIdentName is currently not supported when using Rspack, the 'base64' will be ignored.`
            );
            localIdentName = localIdentName.replace(":base64", "");
          }
          rspackConfig.module || (rspackConfig.module = {});
          (_a = rspackConfig.module).generator || (_a.generator = {});
          rspackConfig.module.generator["css/module"] = {
            exportsConvention: (0, import_shared.kebabCase)(
              config.output.cssModules.exportLocalsConvention
            ),
            localIdentName,
            exportsOnly: isServer || isWebWorker
          };
          (_b = rspackConfig.module).parser || (_b.parser = {});
          rspackConfig.module.parser["css/module"] = {
            namedExports: false
          };
          const rules = rspackConfig.module?.rules;
          applyCSSModuleRule(rules, import_shared.CSS_REGEX, config);
        }
      );
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyBaseCSSRule,
  applyCSSModuleRule,
  enableNativeCss,
  pluginCss
});
