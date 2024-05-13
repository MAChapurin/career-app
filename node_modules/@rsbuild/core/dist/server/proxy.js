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
var proxy_exports = {};
__export(proxy_exports, {
  createProxyMiddleware: () => createProxyMiddleware,
  formatProxyOptions: () => formatProxyOptions
});
module.exports = __toCommonJS(proxy_exports);
var import_shared = require("@rsbuild/shared");
var import_http_proxy_middleware = require("@rsbuild/shared/http-proxy-middleware");
function formatProxyOptions(proxyOptions) {
  const ret = [];
  if (Array.isArray(proxyOptions)) {
    ret.push(...proxyOptions);
  } else if ("target" in proxyOptions) {
    ret.push(proxyOptions);
  } else {
    for (const [context, options] of Object.entries(proxyOptions)) {
      const opts = {
        context,
        changeOrigin: true,
        logLevel: "warn"
      };
      if (typeof options === "string") {
        opts.target = options;
      } else {
        Object.assign(opts, options);
      }
      ret.push(opts);
    }
  }
  const handleError = (err) => import_shared.logger.error(err);
  for (const opts of ret) {
    opts.onError ?? (opts.onError = handleError);
  }
  return ret;
}
const createProxyMiddleware = (proxyOptions) => {
  const formattedOptionsList = formatProxyOptions(proxyOptions);
  const proxyMiddlewares = [];
  const middlewares = [];
  for (const opts of formattedOptionsList) {
    const proxyMiddleware = (0, import_http_proxy_middleware.createProxyMiddleware)(opts.context, opts);
    const middleware = async (req, res, next) => {
      const bypassUrl = typeof opts.bypass === "function" ? opts.bypass(req, res, opts) : null;
      if (bypassUrl === false) {
        res.statusCode = 404;
        next();
      } else if (typeof bypassUrl === "string") {
        req.url = bypassUrl;
        next();
      } else if (bypassUrl === true) {
        next();
      } else {
        proxyMiddleware(req, res, next);
      }
    };
    middlewares.push(middleware);
    opts.ws && proxyMiddlewares.push(proxyMiddleware);
  }
  const handleUpgrade = (req, socket, head) => {
    for (const middleware of proxyMiddlewares) {
      if (typeof middleware.upgrade === "function") {
        middleware.upgrade(req, socket, head);
      }
    }
  };
  return {
    middlewares,
    upgrade: handleUpgrade
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createProxyMiddleware,
  formatProxyOptions
});
