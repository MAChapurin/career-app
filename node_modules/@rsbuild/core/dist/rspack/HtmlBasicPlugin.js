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
var HtmlBasicPlugin_exports = {};
__export(HtmlBasicPlugin_exports, {
  FILE_ATTRS: () => FILE_ATTRS,
  HEAD_TAGS: () => HEAD_TAGS,
  HtmlBasicPlugin: () => HtmlBasicPlugin,
  VOID_TAGS: () => VOID_TAGS,
  hasTitle: () => hasTitle
});
module.exports = __toCommonJS(HtmlBasicPlugin_exports);
var import_shared = require("@rsbuild/shared");
var import_htmlUtils = require("../htmlUtils");
const VOID_TAGS = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
const HEAD_TAGS = [
  "title",
  "base",
  "link",
  "style",
  "meta",
  "script",
  "noscript",
  "template"
];
const FILE_ATTRS = {
  link: "href",
  script: "src"
};
const hasTitle = (html) => html ? /<title/i.test(html) && /<\/title/i.test(html) : false;
const getTagPriority = (tag, tagConfig) => {
  const head = tag.head ?? HEAD_TAGS.includes(tag.tag);
  let priority = head ? -2 : 2;
  const append = tag.append ?? tagConfig.append;
  if (typeof append === "boolean") {
    priority += append ? 1 : -1;
  }
  return priority;
};
const formatBasicTag = (tag) => ({
  tag: tag.tagName,
  attrs: tag.attributes,
  children: tag.innerHTML
});
const fromBasicTag = (tag) => ({
  meta: {},
  tagName: tag.tag,
  attributes: tag.attrs ?? {},
  voidTag: VOID_TAGS.includes(tag.tag),
  innerHTML: tag.children
});
const formatTags = (tags, override) => tags.map((tag) => ({
  ...formatBasicTag(tag),
  publicPath: false,
  ...override
}));
const applyTagConfig = (data, tagConfig, compilationHash, entryName) => {
  if (!tagConfig.tags?.length) {
    return data;
  }
  const fromInjectTags = (tags2) => {
    const ret = [];
    for (const tag of tags2) {
      const attrs = { ...tag.attrs };
      const filenameTag = FILE_ATTRS[tag.tag];
      let filename = attrs[filenameTag];
      if (typeof filename === "string") {
        const optPublicPath = tag.publicPath ?? tagConfig.publicPath;
        if (typeof optPublicPath === "function") {
          filename = optPublicPath(filename, data.publicPath);
        } else if (typeof optPublicPath === "string") {
          filename = (0, import_shared.withPublicPath)(filename, optPublicPath);
        } else if (optPublicPath !== false) {
          filename = (0, import_shared.withPublicPath)(filename, data.publicPath);
        }
        const optHash = tag.hash ?? tagConfig.hash;
        if (typeof optHash === "function") {
          if (compilationHash.length) {
            filename = optHash(filename, compilationHash);
          }
        } else if (typeof optHash === "string") {
          if (optHash.length) {
            filename = `${filename}?${optHash}`;
          }
        } else if (optHash === true) {
          if (compilationHash.length) {
            filename = `${filename}?${compilationHash}`;
          }
        }
        attrs[filenameTag] = filename;
        tag.attrs = attrs;
      }
      ret.push(fromBasicTag(tag));
    }
    return ret;
  };
  let tags = [
    ...formatTags(data.headTags, { head: true }),
    ...formatTags(data.bodyTags, { head: false })
  ];
  const utils = {
    hash: compilationHash,
    entryName,
    outputName: data.outputName,
    publicPath: data.publicPath
  };
  for (const item of tagConfig.tags) {
    if ((0, import_shared.isFunction)(item)) {
      tags = item(tags, utils) || tags;
    } else {
      tags.push(item);
    }
    tags = tags.sort(
      (tag1, tag2) => getTagPriority(tag1, tagConfig) - getTagPriority(tag2, tagConfig)
    );
  }
  const [headTags, bodyTags] = (0, import_shared.partition)(
    tags,
    (tag) => tag.head ?? HEAD_TAGS.includes(tag.tag)
  );
  data.headTags = fromInjectTags(headTags);
  data.bodyTags = fromInjectTags(bodyTags);
  return data;
};
const addTitleTag = (headTags, title = "") => {
  headTags.unshift({
    tagName: "title",
    innerHTML: title,
    attributes: {},
    voidTag: false,
    meta: {}
  });
};
const addFavicon = (headTags, favicon) => {
  if (favicon) {
    headTags.unshift({
      tagName: "link",
      voidTag: true,
      attributes: {
        rel: "icon",
        href: favicon
      },
      meta: {}
    });
  }
};
class HtmlBasicPlugin {
  constructor(options, modifyTagsFn) {
    __publicField(this, "name");
    __publicField(this, "options");
    __publicField(this, "modifyTagsFn");
    this.name = "HtmlBasicPlugin";
    this.options = options;
    this.modifyTagsFn = modifyTagsFn;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      (0, import_htmlUtils.getHTMLPlugin)().getHooks(compilation).alterAssetTagGroups.tapPromise(this.name, async (data) => {
        const entryName = data.plugin.options?.entryName;
        if (!entryName) {
          return data;
        }
        const { headTags, bodyTags } = data;
        const { favicon, tagConfig, templateContent } = this.options[entryName];
        if (!hasTitle(templateContent)) {
          addTitleTag(headTags, data.plugin.options?.title);
        }
        addFavicon(headTags, favicon);
        const result = await this.modifyTagsFn({
          headTags: headTags.map(formatBasicTag),
          bodyTags: bodyTags.map(formatBasicTag)
        });
        Object.assign(data, {
          headTags: result.headTags.map(fromBasicTag),
          bodyTags: result.bodyTags.map(fromBasicTag)
        });
        if (tagConfig) {
          const hash = compilation.hash ?? "";
          applyTagConfig(data, tagConfig, hash, entryName);
        }
        return data;
      });
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FILE_ATTRS,
  HEAD_TAGS,
  HtmlBasicPlugin,
  VOID_TAGS,
  hasTitle
});
