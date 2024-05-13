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
var inlineChunk_exports = {};
__export(inlineChunk_exports, {
  pluginInlineChunk: () => pluginInlineChunk
});
module.exports = __toCommonJS(inlineChunk_exports);
var import_shared = require("@rsbuild/shared");
const pluginInlineChunk = () => ({
  name: "rsbuild:inline-chunk",
  setup(api) {
    api.modifyBundlerChain(async (chain, { target, CHAIN_ID, isDev }) => {
      const config = api.getNormalizedConfig();
      if ((0, import_shared.isHtmlDisabled)(config, target) || isDev) {
        return;
      }
      const { InlineChunkHtmlPlugin } = await Promise.resolve().then(() => __toESM(require("../rspack/InlineChunkHtmlPlugin")));
      const { inlineStyles, inlineScripts } = config.output;
      const scriptTests = [];
      const styleTests = [];
      if (inlineScripts) {
        scriptTests.push(inlineScripts === true ? import_shared.JS_REGEX : inlineScripts);
      }
      if (inlineStyles) {
        styleTests.push(inlineStyles === true ? import_shared.CSS_REGEX : inlineStyles);
      }
      if (!scriptTests.length && !styleTests.length) {
        return;
      }
      chain.plugin(CHAIN_ID.PLUGIN.INLINE_HTML).before(CHAIN_ID.PLUGIN.HTML_BASIC).use(InlineChunkHtmlPlugin, [
        {
          styleTests,
          scriptTests,
          distPath: (0, import_shared.pick)(config.output.distPath, ["js", "css"])
        }
      ]);
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginInlineChunk
});
