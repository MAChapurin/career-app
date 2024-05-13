"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var InlineChunkHtmlPlugin_exports = {};
__export(InlineChunkHtmlPlugin_exports, {
  InlineChunkHtmlPlugin: () => InlineChunkHtmlPlugin
});
module.exports = __toCommonJS(InlineChunkHtmlPlugin_exports);
var import_node_path = require("node:path");
var import_shared = require("@rsbuild/shared");
var import_htmlUtils = require("../htmlUtils");
class InlineChunkHtmlPlugin {
  constructor({
    styleTests,
    scriptTests,
    distPath
  }) {
    __publicField(this, "name");
    __publicField(this, "styleTests");
    __publicField(this, "scriptTests");
    __publicField(this, "distPath");
    __publicField(this, "inlinedAssets");
    this.name = "InlineChunkHtmlPlugin";
    this.styleTests = styleTests;
    this.scriptTests = scriptTests;
    this.distPath = distPath;
    this.inlinedAssets = /* @__PURE__ */ new Set();
  }
  /**
   * If we inlined the chunk to HTML,we should update the value of sourceMappingURL,
   * because the relative path of source code has been changed.
   * @param source
   */
  updateSourceMappingURL({
    source,
    compilation,
    publicPath,
    type
  }) {
    const { devtool } = compilation.options;
    if (devtool && // If the source map is inlined, we do not need to update the sourceMappingURL
    !devtool.includes("inline") && source.includes("# sourceMappingURL")) {
      const prefix = (0, import_shared.addTrailingSlash)(
        (0, import_node_path.join)(publicPath, this.distPath[type] || "")
      );
      return source.replace(
        /# sourceMappingURL=/,
        `# sourceMappingURL=${prefix}`
      );
    }
    return source;
  }
  matchTests(name, source, tests) {
    return tests.some((test) => {
      if ((0, import_shared.isFunction)(test)) {
        const size = source.length;
        return test({ name, size });
      }
      return test.exec(name);
    });
  }
  getInlinedScriptTag(publicPath, tag, compilation) {
    const { assets } = compilation;
    if (!(tag?.attributes.src && typeof tag.attributes.src === "string")) {
      return tag;
    }
    const { src, ...otherAttrs } = tag.attributes;
    const scriptName = publicPath ? src.replace(publicPath, "") : src;
    const asset = assets[scriptName];
    if (asset == null) {
      return tag;
    }
    const source = asset.source().toString();
    const shouldInline = this.matchTests(scriptName, source, this.scriptTests);
    if (!shouldInline) {
      return tag;
    }
    const ret = {
      tagName: "script",
      innerHTML: this.updateSourceMappingURL({
        source,
        compilation,
        publicPath,
        type: "js"
      }),
      attributes: {
        ...otherAttrs
      },
      closeTag: true
    };
    this.inlinedAssets.add(scriptName);
    return ret;
  }
  getInlinedCSSTag(publicPath, tag, compilation) {
    const { assets } = compilation;
    if (!(tag.attributes.href && typeof tag.attributes.href === "string")) {
      return tag;
    }
    const linkName = publicPath ? tag.attributes.href.replace(publicPath, "") : tag.attributes.href;
    const asset = assets[linkName];
    if (asset == null) {
      return tag;
    }
    const source = asset.source().toString();
    const shouldInline = this.matchTests(linkName, source, this.styleTests);
    if (!shouldInline) {
      return tag;
    }
    const ret = {
      tagName: "style",
      innerHTML: this.updateSourceMappingURL({
        source,
        compilation,
        publicPath,
        type: "css"
      }),
      closeTag: true
    };
    this.inlinedAssets.add(linkName);
    return ret;
  }
  getInlinedTag(publicPath, tag, compilation) {
    if (tag.tagName === "script") {
      return this.getInlinedScriptTag(
        publicPath,
        tag,
        compilation
      );
    }
    if (tag.tagName === "link" && tag.attributes && tag.attributes.rel === "stylesheet") {
      return this.getInlinedCSSTag(
        publicPath,
        tag,
        compilation
      );
    }
    return tag;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      const publicPath = (0, import_shared.getPublicPathFromCompiler)(compiler);
      const tagFunction = (tag) => this.getInlinedTag(publicPath, tag, compilation);
      const hooks = (0, import_htmlUtils.getHTMLPlugin)().getHooks(compilation);
      hooks.alterAssetTagGroups.tap(this.name, (assets) => {
        assets.headTags = assets.headTags.map(tagFunction);
        assets.bodyTags = assets.bodyTags.map(tagFunction);
        return assets;
      });
      compilation.hooks.processAssets.tap(
        {
          name: "InlineChunkHtmlPlugin",
          /**
           * Remove marked inline assets in summarize stage,
           * which should be later than the emitting of html-webpack-plugin
           */
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        },
        () => {
          const { devtool } = compiler.options;
          for (const name of this.inlinedAssets) {
            if (devtool === "hidden-source-map") {
              compilation.deleteAsset(name);
            } else {
              delete compilation.assets[name];
            }
          }
          this.inlinedAssets.clear();
        }
      );
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InlineChunkHtmlPlugin
});
