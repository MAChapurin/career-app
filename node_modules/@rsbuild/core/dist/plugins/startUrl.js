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
var startUrl_exports = {};
__export(startUrl_exports, {
  openBrowser: () => openBrowser,
  pluginStartUrl: () => pluginStartUrl,
  replacePlaceholder: () => replacePlaceholder
});
module.exports = __toCommonJS(startUrl_exports);
var import_node_child_process = require("node:child_process");
var import_node_path = require("node:path");
var import_node_util = require("node:util");
var import_shared = require("@rsbuild/shared");
const execAsync = (0, import_node_util.promisify)(import_node_child_process.exec);
const supportedChromiumBrowsers = [
  "Google Chrome Canary",
  "Google Chrome Dev",
  "Google Chrome Beta",
  "Google Chrome",
  "Microsoft Edge",
  "Brave Browser",
  "Vivaldi",
  "Chromium"
];
const getTargetBrowser = async () => {
  let targetBrowser = process.env.BROWSER;
  if (!targetBrowser || !supportedChromiumBrowsers.includes(targetBrowser)) {
    const { stdout: ps } = await execAsync("ps cax");
    targetBrowser = supportedChromiumBrowsers.find((b) => ps.includes(b));
  }
  return targetBrowser;
};
async function openBrowser(url) {
  const shouldTryOpenChromeWithAppleScript = process.platform === "darwin";
  if (shouldTryOpenChromeWithAppleScript) {
    try {
      const targetBrowser = await getTargetBrowser();
      if (targetBrowser) {
        await execAsync(
          `osascript openChrome.applescript "${encodeURI(
            url
          )}" "${targetBrowser}"`,
          {
            cwd: (0, import_node_path.join)(__dirname, "../../static")
          }
        );
        return true;
      }
      (0, import_shared.debug)("Failed to find the target browser.");
    } catch (err) {
      (0, import_shared.debug)("Failed to open start URL with apple script.");
      import_shared.logger.debug(err);
    }
  }
  try {
    const { default: open } = await Promise.resolve().then(() => __toESM(require("../../compiled/open")));
    await open(url);
    return true;
  } catch (err) {
    import_shared.logger.error("Failed to open start URL.");
    import_shared.logger.error(err);
    return false;
  }
}
const replacePlaceholder = (url, port) => url.replace(/<port>/g, String(port));
const openedURLs = [];
function pluginStartUrl() {
  return {
    name: "rsbuild:start-url",
    setup(api) {
      const onStartServer = async (params) => {
        const { port, routes } = params;
        const config = api.getNormalizedConfig();
        const { startUrl, beforeStartUrl } = config.dev;
        const { https } = api.context.devServer || {};
        const isCodesandbox = process.env.CSB === "true";
        const shouldOpen = Boolean(startUrl) && !isCodesandbox;
        if (!shouldOpen) {
          return;
        }
        const urls = [];
        if (startUrl === true || !startUrl) {
          const protocol = https ? "https" : "http";
          if (routes.length) {
            urls.push(`${protocol}://localhost:${port}${routes[0].pathname}`);
          }
        } else {
          urls.push(
            ...(0, import_shared.castArray)(startUrl).map(
              (item) => replacePlaceholder(item, port)
            )
          );
        }
        const openUrls = () => {
          for (const url of urls) {
            if (!openedURLs.includes(url)) {
              openBrowser(url);
              openedURLs.push(url);
            }
          }
        };
        if (beforeStartUrl) {
          Promise.all((0, import_shared.castArray)(beforeStartUrl).map((fn) => fn())).then(
            openUrls
          );
        } else {
          openUrls();
        }
      };
      api.onAfterStartDevServer(onStartServer);
      api.onAfterStartProdServer(onStartServer);
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  openBrowser,
  pluginStartUrl,
  replacePlaceholder
});
