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
var url_exports = {};
__export(url_exports, {
  getAddressUrls: () => getAddressUrls,
  getUrlLabel: () => getUrlLabel,
  normalizeUrl: () => normalizeUrl,
  withPublicPath: () => withPublicPath
});
module.exports = __toCommonJS(url_exports);
var import_node_net = require("node:net");
var import_node_os = __toESM(require("node:os"));
var import_node_path = require("node:path");
var import_node_url = require("node:url");
var import_constants = require("./constants");
const normalizeUrl = (url) => url.replace(/([^:]\/)\/+/g, "$1");
const urlJoin = (base, path) => {
  const fullUrl = new import_node_url.URL(base);
  fullUrl.pathname = import_node_path.posix.join(fullUrl.pathname, path);
  return fullUrl.toString();
};
const withPublicPath = (str, base) => {
  if (str.startsWith("//")) {
    return str;
  }
  try {
    new import_node_url.URL(str).toString();
    return str;
  } catch {
  }
  if (base.startsWith("http")) {
    return urlJoin(base, str);
  }
  if (base.startsWith("//")) {
    return urlJoin(`https:${base}`, str).replace("https:", "");
  }
  return import_node_path.posix.join(base, str);
};
const getIpv4Interfaces = () => {
  const interfaces = import_node_os.default.networkInterfaces();
  const ipv4Interfaces = /* @__PURE__ */ new Map();
  for (const key of Object.keys(interfaces)) {
    for (const detail of interfaces[key]) {
      const familyV4Value = typeof detail.family === "string" ? "IPv4" : 4;
      if (detail.family === familyV4Value && !ipv4Interfaces.has(detail.address)) {
        ipv4Interfaces.set(detail.address, detail);
      }
    }
  }
  return Array.from(ipv4Interfaces.values());
};
const isLoopbackHost = (host) => {
  const loopbackHosts = [
    "localhost",
    "127.0.0.1",
    "::1",
    "0000:0000:0000:0000:0000:0000:0000:0001"
  ];
  return loopbackHosts.includes(host);
};
const getHostInUrl = (host) => {
  if ((0, import_node_net.isIPv6)(host)) {
    return host === "::" ? "[::1]" : `[${host}]`;
  }
  return host;
};
const concatUrl = ({
  host,
  port,
  protocol
}) => `${protocol}://${host}:${port}`;
const LOCAL_LABEL = "Local:  ";
const NETWORK_LABEL = "Network:  ";
const getUrlLabel = (url) => {
  try {
    const { host } = new import_node_url.URL(url);
    return isLoopbackHost(host) ? LOCAL_LABEL : NETWORK_LABEL;
  } catch (err) {
    return NETWORK_LABEL;
  }
};
const getAddressUrls = ({
  protocol = "http",
  port,
  host
}) => {
  if (host && host !== import_constants.DEFAULT_DEV_HOST) {
    return [
      {
        label: isLoopbackHost(host) ? LOCAL_LABEL : NETWORK_LABEL,
        url: concatUrl({
          port,
          host: getHostInUrl(host),
          protocol
        })
      }
    ];
  }
  const ipv4Interfaces = getIpv4Interfaces();
  const addressUrls = [];
  let hasLocalUrl = false;
  for (const detail of ipv4Interfaces) {
    if (isLoopbackHost(detail.address) || detail.internal) {
      if (hasLocalUrl) {
        continue;
      }
      addressUrls.push({
        label: LOCAL_LABEL,
        url: concatUrl({ host: "localhost", port, protocol })
      });
      hasLocalUrl = true;
    } else {
      addressUrls.push({
        label: NETWORK_LABEL,
        url: concatUrl({ host: detail.address, port, protocol })
      });
    }
  }
  return addressUrls;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAddressUrls,
  getUrlLabel,
  normalizeUrl,
  withPublicPath
});
