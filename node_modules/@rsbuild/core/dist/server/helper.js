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
var helper_exports = {};
__export(helper_exports, {
  HMR_SOCK_PATH: () => HMR_SOCK_PATH,
  formatRoutes: () => formatRoutes,
  getDevOptions: () => getDevOptions,
  getPort: () => getPort,
  getServerOptions: () => getServerOptions,
  mergeDevOptions: () => mergeDevOptions,
  printServerURLs: () => printServerURLs
});
module.exports = __toCommonJS(helper_exports);
var import_node_net = __toESM(require("node:net"));
var import_shared = require("@rsbuild/shared");
const formatPrefix = (prefix) => {
  if (!prefix) {
    return "/";
  }
  const hasLeadingSlash = prefix.startsWith("/");
  const hasTailSlash = prefix.endsWith("/");
  return `${hasLeadingSlash ? "" : "/"}${prefix}${hasTailSlash ? "" : "/"}`;
};
const formatRoutes = (entry, prefix, outputStructure) => {
  const formattedPrefix = formatPrefix(prefix);
  return Object.keys(entry).map((entryName) => {
    const isIndex = entryName === "index" && outputStructure !== "nested";
    const displayName = isIndex ? "" : entryName;
    return {
      entryName,
      pathname: formattedPrefix + displayName
    };
  }).sort((a) => a.entryName === "index" ? -1 : 1);
};
function getURLMessages(urls, routes) {
  if (routes.length === 1) {
    return urls.map(
      ({ label, url }) => `  ${`> ${label.padEnd(10)}`}${import_shared.color.cyan(
        (0, import_shared.normalizeUrl)(`${url}${routes[0].pathname}`)
      )}
`
    ).join("");
  }
  let message = "";
  const maxNameLength = Math.max(...routes.map((r) => r.entryName.length));
  urls.forEach(({ label, url }, index) => {
    if (index > 0) {
      message += "\n";
    }
    message += `  ${`> ${label}`}
`;
    for (const r of routes) {
      message += `  ${import_shared.color.dim("-")} ${import_shared.color.dim(
        r.entryName.padEnd(maxNameLength + 4)
      )}${import_shared.color.cyan((0, import_shared.normalizeUrl)(`${url}${r.pathname}`))}
`;
    }
  });
  return message;
}
function printServerURLs({
  urls: originalUrls,
  port,
  routes,
  protocol,
  printUrls
}) {
  if (printUrls === false) {
    return;
  }
  let urls = originalUrls;
  if ((0, import_shared.isFunction)(printUrls)) {
    const newUrls = printUrls({
      urls: urls.map((item) => item.url),
      port,
      routes,
      protocol
    });
    if (!newUrls) {
      return;
    }
    if (!Array.isArray(newUrls)) {
      throw new Error(
        `"server.printUrls" must return an array, but got ${typeof newUrls}.`
      );
    }
    urls = newUrls.map((url) => ({
      url,
      label: (0, import_shared.getUrlLabel)(url)
    }));
  }
  if (urls.length === 0) {
    return;
  }
  const message = getURLMessages(urls, routes);
  import_shared.logger.log(message);
  return message;
}
const HMR_SOCK_PATH = "/rsbuild-hmr";
const mergeDevOptions = ({
  rsbuildConfig,
  port
}) => {
  const defaultDevConfig = {
    client: {
      path: HMR_SOCK_PATH,
      port: port.toString(),
      // By default it is set to "location.hostname"
      host: "",
      // By default it is set to "location.protocol === 'https:' ? 'wss' : 'ws'""
      protocol: void 0
    },
    writeToDisk: false,
    liveReload: true
  };
  const devConfig = rsbuildConfig.dev ? (0, import_shared.deepmerge)(defaultDevConfig, rsbuildConfig.dev) : defaultDevConfig;
  return devConfig;
};
const getPort = async ({
  host,
  port,
  strictPort,
  tryLimits = 20,
  silent = false
}) => {
  if (typeof port === "string") {
    port = Number.parseInt(port, 10);
  }
  if (strictPort) {
    tryLimits = 1;
  }
  const original = port;
  let found = false;
  let attempts = 0;
  while (!found && attempts <= tryLimits) {
    try {
      await new Promise((resolve, reject) => {
        const server = import_node_net.default.createServer();
        server.unref();
        server.on("error", reject);
        server.listen({ port, host }, () => {
          found = true;
          server.close(resolve);
        });
      });
    } catch (e) {
      if (e.code !== "EADDRINUSE") {
        throw e;
      }
      port++;
      attempts++;
    }
  }
  if (port !== original) {
    if (strictPort) {
      throw new Error(
        `Port "${original}" is occupied, please choose another one.`
      );
    }
    if (!silent) {
      import_shared.logger.info(
        `Port ${original} is in use, ${import_shared.color.yellow(`using port ${port}.`)}
`
      );
    }
  }
  return port;
};
const getServerOptions = async ({
  rsbuildConfig,
  getPortSilently
}) => {
  const host = rsbuildConfig.server?.host || import_shared.DEFAULT_DEV_HOST;
  const port = await getPort({
    host,
    port: rsbuildConfig.server?.port || import_shared.DEFAULT_PORT,
    strictPort: rsbuildConfig.server?.strictPort || false,
    silent: getPortSilently
  });
  const https = Boolean(rsbuildConfig.server?.https) || false;
  return { port, host, https, serverConfig: rsbuildConfig.server || {} };
};
const getDevOptions = async ({
  rsbuildConfig,
  getPortSilently
}) => {
  const { port, host, https, serverConfig } = await getServerOptions({
    rsbuildConfig,
    getPortSilently
  });
  const devConfig = mergeDevOptions({ rsbuildConfig, port });
  const liveReload = devConfig.liveReload;
  return {
    devConfig,
    serverConfig,
    port,
    host,
    https,
    liveReload
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HMR_SOCK_PATH,
  formatRoutes,
  getDevOptions,
  getPort,
  getServerOptions,
  mergeDevOptions,
  printServerURLs
});
