"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var compilerDevMiddleware_exports = {};
__export(compilerDevMiddleware_exports, {
  CompilerDevMiddleware: () => CompilerDevMiddleware
});
module.exports = __toCommonJS(compilerDevMiddleware_exports);
var import_socketServer = require("./socketServer");
const noop = () => {
};
function getClientPaths(devConfig) {
  const clientPaths = [];
  if (!devConfig.hmr && !devConfig.liveReload) {
    return clientPaths;
  }
  clientPaths.push(require.resolve("@rsbuild/core/client/hmr"));
  if (devConfig.client?.overlay) {
    clientPaths.push(`${require.resolve("@rsbuild/core/client/overlay")}`);
  }
  return clientPaths;
}
class CompilerDevMiddleware {
  constructor({ dev, server, devMiddleware, publicPaths }) {
    __publicField(this, "middleware");
    __publicField(this, "devConfig");
    __publicField(this, "serverConfig");
    __publicField(this, "devMiddleware");
    __publicField(this, "publicPaths");
    __publicField(this, "socketServer");
    this.devConfig = dev;
    this.serverConfig = server;
    this.publicPaths = publicPaths;
    this.socketServer = new import_socketServer.SocketServer(dev);
    this.devMiddleware = devMiddleware;
  }
  init() {
    this.middleware = this.setupDevMiddleware(
      this.devMiddleware,
      this.publicPaths
    );
    this.socketServer.prepare();
  }
  upgrade(req, sock, head) {
    this.socketServer.upgrade(req, sock, head);
  }
  close() {
    this.socketServer.close();
    this.middleware?.close(noop);
  }
  sockWrite(type, data) {
    this.socketServer.sockWrite(type, data);
  }
  setupDevMiddleware(devMiddleware, publicPaths) {
    const { devConfig, serverConfig } = this;
    const callbacks = {
      onInvalid: () => {
        this.socketServer.sockWrite("invalid");
      },
      onDone: (stats) => {
        this.socketServer.updateStats(stats);
      }
    };
    const clientPaths = getClientPaths(devConfig);
    const middleware = devMiddleware({
      headers: serverConfig.headers,
      publicPath: "/",
      stats: false,
      callbacks,
      clientPaths,
      clientConfig: devConfig.client,
      liveReload: devConfig.liveReload,
      writeToDisk: devConfig.writeToDisk,
      serverSideRender: true,
      // weak is enough in dev
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Conditional_requests#weak_validation
      etag: "weak"
    });
    const warp = async (req, res, next) => {
      const { url } = req;
      const assetPrefix = url && publicPaths.find((prefix) => url.startsWith(prefix));
      if (assetPrefix && assetPrefix !== "/") {
        req.url = url.slice(assetPrefix.length - 1);
        middleware(req, res, (...args) => {
          req.url = url;
          next(...args);
        });
      } else {
        middleware(req, res, next);
      }
    };
    warp.close = middleware.close;
    return warp;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CompilerDevMiddleware
});
