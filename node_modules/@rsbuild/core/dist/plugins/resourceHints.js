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
var resourceHints_exports = {};
__export(resourceHints_exports, {
  pluginResourceHints: () => pluginResourceHints
});
module.exports = __toCommonJS(resourceHints_exports);
const generateLinks = (options, rel) => options.map((option) => ({
  tag: "link",
  attrs: {
    rel,
    ...option
  }
}));
const pluginResourceHints = () => ({
  name: "rsbuild:resource-hints",
  setup(api) {
    api.modifyHTMLTags(({ headTags, bodyTags }) => {
      const config = api.getNormalizedConfig();
      const { dnsPrefetch, preconnect } = config.performance;
      if (dnsPrefetch) {
        const attrs = dnsPrefetch.map((option) => ({ href: option }));
        if (attrs.length) {
          headTags.unshift(...generateLinks(attrs, "dns-prefetch"));
        }
      }
      if (preconnect) {
        const attrs = preconnect.map(
          (option) => typeof option === "string" ? { href: option } : option
        );
        if (attrs.length) {
          headTags.unshift(...generateLinks(attrs, "preconnect"));
        }
      }
      return { headTags, bodyTags };
    });
    api.modifyBundlerChain(
      async (chain, { CHAIN_ID, isServer, isWebWorker, isServiceWorker }) => {
        const config = api.getNormalizedConfig();
        const {
          performance: { preload, prefetch }
        } = config;
        if (isServer || isWebWorker || isServiceWorker) {
          return;
        }
        const HTMLCount = chain.entryPoints.values().length;
        const { HtmlPreloadOrPrefetchPlugin } = await Promise.resolve().then(() => __toESM(require("../rspack/preload/HtmlPreloadOrPrefetchPlugin")));
        if (prefetch) {
          chain.plugin(CHAIN_ID.PLUGIN.HTML_PREFETCH).use(HtmlPreloadOrPrefetchPlugin, [
            prefetch,
            "prefetch",
            HTMLCount
          ]);
        }
        if (preload) {
          chain.plugin(CHAIN_ID.PLUGIN.HTML_PRELOAD).use(HtmlPreloadOrPrefetchPlugin, [preload, "preload", HTMLCount]);
        }
      }
    );
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginResourceHints
});
