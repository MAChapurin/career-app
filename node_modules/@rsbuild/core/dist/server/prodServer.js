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
var prodServer_exports = {};
__export(prodServer_exports, {
  RsbuildProdServer: () => RsbuildProdServer,
  startProdServer: () => startProdServer
});
module.exports = __toCommonJS(prodServer_exports);
var import_node_path = require("node:path");
var import_shared = require("@rsbuild/shared");
var import_connect = __toESM(require("@rsbuild/shared/connect"));
var import_sirv = __toESM(require("../../compiled/sirv"));
var import_helper = require("./helper");
var import_httpServer = require("./httpServer");
var import_middlewares = require("./middlewares");
class RsbuildProdServer {
  constructor(options) {
    __publicField(this, "app");
    __publicField(this, "options");
    __publicField(this, "middlewares", (0, import_connect.default)());
    this.options = options;
  }
  // Complete the preparation of services
  async onInit(app) {
    this.app = app;
    await this.applyDefaultMiddlewares();
  }
  async applyDefaultMiddlewares() {
    const { headers, proxy, historyApiFallback, compress } = this.options.serverConfig;
    if ((0, import_shared.isDebug)()) {
      this.middlewares.use(await (0, import_middlewares.getRequestLoggerMiddleware)());
    }
    if (compress) {
      const { default: compression } = await Promise.resolve().then(() => __toESM(require("../../compiled/http-compression")));
      this.middlewares.use((req, res, next) => {
        compression({
          gzip: true,
          brotli: false
        })(req, res, next);
      });
    }
    if (headers) {
      this.middlewares.use((_req, res, next) => {
        for (const [key, value] of Object.entries(headers)) {
          res.setHeader(key, value);
        }
        next();
      });
    }
    if (proxy) {
      const { createProxyMiddleware } = await Promise.resolve().then(() => __toESM(require("./proxy")));
      const { middlewares, upgrade } = createProxyMiddleware(proxy);
      for (const middleware of middlewares) {
        this.middlewares.use(middleware);
      }
      this.app.on("upgrade", upgrade);
    }
    this.applyStaticAssetMiddleware();
    if (historyApiFallback) {
      const { default: connectHistoryApiFallback } = await Promise.resolve().then(() => __toESM(require("../../compiled/connect-history-api-fallback")));
      const historyApiFallbackMiddleware = connectHistoryApiFallback(
        historyApiFallback === true ? {} : historyApiFallback
      );
      this.middlewares.use(historyApiFallbackMiddleware);
      this.applyStaticAssetMiddleware();
    }
    this.middlewares.use(import_middlewares.faviconFallbackMiddleware);
  }
  applyStaticAssetMiddleware() {
    const {
      output: { path, assetPrefix },
      serverConfig: { htmlFallback },
      pwd
    } = this.options;
    const assetMiddleware = (0, import_sirv.default)((0, import_node_path.join)(pwd, path), {
      etag: true,
      dev: true,
      ignores: ["favicon.ico"],
      single: htmlFallback === "index"
    });
    this.middlewares.use((req, res, next) => {
      const url = req.url;
      if (assetPrefix && url?.startsWith(assetPrefix)) {
        req.url = url.slice(assetPrefix.length);
        assetMiddleware(req, res, (...args) => {
          req.url = url;
          next(...args);
        });
      } else {
        assetMiddleware(req, res, next);
      }
    });
  }
  close() {
  }
}
async function startProdServer(context, rsbuildConfig, { getPortSilently } = {}) {
  if (!(0, import_shared.getNodeEnv)()) {
    (0, import_shared.setNodeEnv)("production");
  }
  const { serverConfig, port, host, https } = await (0, import_helper.getServerOptions)({
    rsbuildConfig,
    getPortSilently
  });
  const server = new RsbuildProdServer({
    pwd: context.rootPath,
    output: {
      path: rsbuildConfig.output?.distPath?.root || import_shared.ROOT_DIST_DIR,
      assetPrefix: rsbuildConfig.output?.assetPrefix
    },
    serverConfig
  });
  await context.hooks.onBeforeStartProdServer.call();
  const httpServer = await (0, import_httpServer.createHttpServer)({
    https: serverConfig.https,
    middlewares: server.middlewares
  });
  await server.onInit(httpServer);
  return new Promise((resolve) => {
    httpServer.listen(
      {
        host,
        port
      },
      async () => {
        const routes = (0, import_helper.formatRoutes)(
          context.entry,
          rsbuildConfig.output?.distPath?.html,
          rsbuildConfig.html?.outputStructure
        );
        await context.hooks.onAfterStartProdServer.call({
          port,
          routes
        });
        const protocol = https ? "https" : "http";
        const urls = (0, import_shared.getAddressUrls)({ protocol, port });
        (0, import_helper.printServerURLs)({
          urls,
          port,
          routes,
          protocol,
          printUrls: serverConfig.printUrls
        });
        const onClose = () => {
          server.close();
          httpServer.close();
        };
        resolve({
          port,
          urls: urls.map((item) => item.url),
          server: {
            close: async () => {
              onClose();
            }
          }
        });
      }
    );
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RsbuildProdServer,
  startProdServer
});
