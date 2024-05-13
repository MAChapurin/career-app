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
var getBrowserslist_exports = {};
__export(getBrowserslist_exports, {
  browserslistToESVersion: () => browserslistToESVersion,
  getBrowserslist: () => getBrowserslist,
  getBrowserslistWithDefault: () => getBrowserslistWithDefault
});
module.exports = __toCommonJS(getBrowserslist_exports);
var import_browserslist = __toESM(require("../compiled/browserslist"));
var import_constants = require("./constants");
var import_utils = require("./utils");
const browsersListCache = /* @__PURE__ */ new Map();
async function getBrowserslist(path) {
  const env = (0, import_utils.getNodeEnv)();
  const cacheKey = path + env;
  if (browsersListCache.has(cacheKey)) {
    return browsersListCache.get(cacheKey);
  }
  const result = import_browserslist.default.loadConfig({ path, env });
  if (result) {
    browsersListCache.set(cacheKey, result);
    return result;
  }
  return null;
}
async function getBrowserslistWithDefault(path, config, target) {
  const { overrideBrowserslist: overrides = {} } = config?.output || {};
  if (target === "web" || target === "web-worker") {
    if (Array.isArray(overrides)) {
      return overrides;
    }
    if (overrides[target]) {
      return overrides[target];
    }
    const browserslistrc = await getBrowserslist(path);
    if (browserslistrc) {
      return browserslistrc;
    }
  }
  if (!Array.isArray(overrides) && overrides[target]) {
    return overrides[target];
  }
  return import_constants.DEFAULT_BROWSERSLIST[target];
}
var ESVersion = /* @__PURE__ */ ((ESVersion2) => {
  ESVersion2[ESVersion2["es5"] = 5] = "es5";
  ESVersion2[ESVersion2["es2015"] = 2015] = "es2015";
  ESVersion2[ESVersion2["es2016"] = 2016] = "es2016";
  ESVersion2[ESVersion2["es2017"] = 2017] = "es2017";
  ESVersion2[ESVersion2["es2018"] = 2018] = "es2018";
  return ESVersion2;
})(ESVersion || {});
const ES_VERSIONS_MAP = {
  chrome: [51, 52, 57, 64],
  edge: [15, 15, 15, 79],
  safari: [10, 10.3, 11, 16.4],
  firefox: [54, 54, 54, 78],
  opera: [38, 39, 44, 51],
  samsung: [5, 6.2, 6.2, 8.2]
};
const renameBrowser = (name) => {
  return name === "ios_saf" ? "safari" : name;
};
function browserslistToESVersion(browsers) {
  const projectBrowsers = (0, import_browserslist.default)(browsers, {
    ignoreUnknownVersions: true
  });
  let esVersion = 2018 /* es2018 */;
  for (const item of projectBrowsers) {
    const pairs = item.split(" ");
    if (pairs.length < 2) {
      continue;
    }
    const browser = renameBrowser(pairs[0]);
    const version = Number(pairs[1].split("-")[0]);
    if (Number.isNaN(version)) {
      continue;
    }
    if (browser === "ie" || browser === "android" && version < 6) {
      esVersion = 5 /* es5 */;
      break;
    }
    const versions = ES_VERSIONS_MAP[browser];
    if (!versions) {
      continue;
    }
    if (version < versions[0]) {
      esVersion = Math.min(5 /* es5 */, esVersion);
    } else if (version < versions[1]) {
      esVersion = Math.min(2015 /* es2015 */, esVersion);
    } else if (version < versions[2]) {
      esVersion = Math.min(2016 /* es2016 */, esVersion);
    } else if (version < versions[3]) {
      esVersion = Math.min(2017 /* es2017 */, esVersion);
    }
  }
  return esVersion;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  browserslistToESVersion,
  getBrowserslist,
  getBrowserslistWithDefault
});
