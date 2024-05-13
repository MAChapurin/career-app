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
var mergeConfig_exports = {};
__export(mergeConfig_exports, {
  mergeRsbuildConfig: () => mergeRsbuildConfig
});
module.exports = __toCommonJS(mergeConfig_exports);
var import_shared = require("@rsbuild/shared");
const OVERRIDE_PATH = [
  "performance.removeConsole",
  "output.inlineScripts",
  "output.inlineStyles",
  "output.cssModules.auto",
  "output.targets",
  "output.emitAssets",
  "server.printUrls",
  "dev.startUrl",
  "provider"
];
const isOverridePath = (key) => OVERRIDE_PATH.includes(key);
const merge = (x, y, path = "") => {
  if (isOverridePath(path)) {
    return y ?? x;
  }
  if (x === void 0) {
    return y;
  }
  if (y === void 0) {
    return x;
  }
  const pair = [x, y];
  if (pair.some(Array.isArray)) {
    return [...(0, import_shared.castArray)(x), ...(0, import_shared.castArray)(y)];
  }
  if (pair.some(import_shared.isFunction)) {
    return pair;
  }
  if (!(0, import_shared.isPlainObject)(x) || !(0, import_shared.isPlainObject)(y)) {
    return y;
  }
  const merged = {};
  const keys = /* @__PURE__ */ new Set([...Object.keys(x), ...Object.keys(y)]);
  for (const key of keys) {
    const childPath = path ? `${path}.${key}` : key;
    merged[key] = merge(x[key], y[key], childPath);
  }
  return merged;
};
const mergeRsbuildConfig = (...configs) => {
  if (configs.length === 2) {
    return merge(configs[0], configs[1]);
  }
  if (configs.length < 2) {
    return configs[0];
  }
  return configs.reduce(
    (result, config) => merge(result, config),
    {}
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mergeRsbuildConfig
});
