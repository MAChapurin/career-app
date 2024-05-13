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
var initPlugins_exports = {};
__export(initPlugins_exports, {
  getHTMLPathByEntry: () => getHTMLPathByEntry,
  getPluginAPI: () => getPluginAPI
});
module.exports = __toCommonJS(initPlugins_exports);
var import_node_path = require("node:path");
var import_shared = require("@rsbuild/shared");
var import_createContext = require("./createContext");
function getHTMLPathByEntry(entryName, config) {
  const htmlPath = (0, import_shared.getDistPath)(config, "html");
  const filename = config.html.outputStructure === "flat" ? `${entryName}.html` : `${entryName}/index.html`;
  return (0, import_shared.removeLeadingSlash)(`${htmlPath}/${filename}`);
}
function applyTransformPlugin(chain, transformer) {
  const name = "RsbuildTransformPlugin";
  if (chain.plugins.get(name)) {
    return;
  }
  class RsbuildTransformPlugin {
    apply(compiler) {
      compiler.__rsbuildTransformer = transformer;
      compiler.hooks.thisCompilation.tap(name, (compilation) => {
        compilation.hooks.childCompiler.tap(name, (childCompiler) => {
          childCompiler.__rsbuildTransformer = transformer;
        });
      });
    }
  }
  chain.plugin(name).use(RsbuildTransformPlugin);
}
function getPluginAPI({
  context,
  pluginManager
}) {
  const { hooks } = context;
  const publicContext = (0, import_createContext.createPublicContext)(context);
  const getNormalizedConfig = () => {
    if (context.normalizedConfig) {
      return context.normalizedConfig;
    }
    throw new Error(
      "Cannot access normalized config until modifyRsbuildConfig is called."
    );
  };
  const getRsbuildConfig = (type = "current") => {
    switch (type) {
      case "original":
        return context.originalConfig;
      case "current":
        return context.config;
      case "normalized":
        return getNormalizedConfig();
    }
    throw new Error("`getRsbuildConfig` get an invalid type param.");
  };
  const getHTMLPaths = () => {
    return Object.keys(context.entry).reduce(
      (prev, key) => {
        prev[key] = getHTMLPathByEntry(key, getNormalizedConfig());
        return prev;
      },
      {}
    );
  };
  const exposed = [];
  const expose = (id, api) => {
    exposed.push({ id, api });
  };
  const useExposed = (id) => {
    const matched = exposed.find((item) => item.id === id);
    if (matched) {
      return matched.api;
    }
  };
  let transformId = 0;
  const transformer = {};
  const transform = (descriptor, handler) => {
    const id = `rsbuild-transform-${transformId++}`;
    transformer[id] = handler;
    hooks.modifyBundlerChain.tap((chain, { target }) => {
      if (descriptor.targets && !descriptor.targets.includes(target)) {
        return;
      }
      const rule = chain.module.rule(id);
      if (descriptor.test) {
        rule.test(descriptor.test);
      }
      if (descriptor.resourceQuery) {
        rule.resourceQuery(descriptor.resourceQuery);
      }
      const loaderName = descriptor.raw ? "transformRawLoader" : "transformLoader";
      const loaderPath = (0, import_node_path.join)(__dirname, `./rspack/${loaderName}`);
      rule.use(id).loader(loaderPath).options({ id });
      applyTransformPlugin(chain, transformer);
    });
  };
  process.on("exit", () => {
    hooks.onExit.call();
  });
  return {
    context: publicContext,
    expose,
    transform,
    useExposed,
    getHTMLPaths,
    getRsbuildConfig,
    getNormalizedConfig,
    isPluginExists: pluginManager.isPluginExists,
    // Hooks
    onExit: hooks.onExit.tap,
    onAfterBuild: hooks.onAfterBuild.tap,
    onBeforeBuild: hooks.onBeforeBuild.tap,
    onCloseDevServer: hooks.onCloseDevServer.tap,
    onDevCompileDone: hooks.onDevCompileDone.tap,
    onAfterCreateCompiler: hooks.onAfterCreateCompiler.tap,
    onAfterStartDevServer: hooks.onAfterStartDevServer.tap,
    onBeforeCreateCompiler: hooks.onBeforeCreateCompiler.tap,
    onBeforeStartDevServer: hooks.onBeforeStartDevServer.tap,
    onAfterStartProdServer: hooks.onAfterStartProdServer.tap,
    onBeforeStartProdServer: hooks.onBeforeStartProdServer.tap,
    modifyHTMLTags: hooks.modifyHTMLTags.tap,
    modifyBundlerChain: hooks.modifyBundlerChain.tap,
    modifyRspackConfig: hooks.modifyRspackConfig.tap,
    modifyWebpackChain: hooks.modifyWebpackChain.tap,
    modifyWebpackConfig: hooks.modifyWebpackConfig.tap,
    modifyRsbuildConfig: hooks.modifyRsbuildConfig.tap
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHTMLPathByEntry,
  getPluginAPI
});
