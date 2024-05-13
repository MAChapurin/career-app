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
var constants_exports = {};
__export(constants_exports, {
  AUDIO_EXTENSIONS: () => AUDIO_EXTENSIONS,
  CSS_DIST_DIR: () => CSS_DIST_DIR,
  CSS_MODULES_REGEX: () => CSS_MODULES_REGEX,
  CSS_REGEX: () => CSS_REGEX,
  DEFAULT_ASSET_PREFIX: () => DEFAULT_ASSET_PREFIX,
  DEFAULT_BROWSERSLIST: () => DEFAULT_BROWSERSLIST,
  DEFAULT_DATA_URL_SIZE: () => DEFAULT_DATA_URL_SIZE,
  DEFAULT_DEV_HOST: () => DEFAULT_DEV_HOST,
  DEFAULT_MOUNT_ID: () => DEFAULT_MOUNT_ID,
  DEFAULT_PORT: () => DEFAULT_PORT,
  FONT_DIST_DIR: () => FONT_DIST_DIR,
  FONT_EXTENSIONS: () => FONT_EXTENSIONS,
  HTML_DIST_DIR: () => HTML_DIST_DIR,
  HTML_REGEX: () => HTML_REGEX,
  IMAGE_DIST_DIR: () => IMAGE_DIST_DIR,
  IMAGE_EXTENSIONS: () => IMAGE_EXTENSIONS,
  JS_DIST_DIR: () => JS_DIST_DIR,
  JS_REGEX: () => JS_REGEX,
  LESS_REGEX: () => LESS_REGEX,
  MEDIA_DIST_DIR: () => MEDIA_DIST_DIR,
  NODE_MODULES_REGEX: () => NODE_MODULES_REGEX,
  ROOT_DIST_DIR: () => ROOT_DIST_DIR,
  SASS_REGEX: () => SASS_REGEX,
  SCRIPT_REGEX: () => SCRIPT_REGEX,
  SERVER_DIST_DIR: () => SERVER_DIST_DIR,
  SERVICE_WORKER_DIST_DIR: () => SERVICE_WORKER_DIST_DIR,
  SVG_DIST_DIR: () => SVG_DIST_DIR,
  SVG_REGEX: () => SVG_REGEX,
  TARGET_ID_MAP: () => TARGET_ID_MAP,
  TS_AND_JSX_REGEX: () => TS_AND_JSX_REGEX,
  TS_CONFIG_FILE: () => TS_CONFIG_FILE,
  TS_REGEX: () => TS_REGEX,
  VIDEO_EXTENSIONS: () => VIDEO_EXTENSIONS,
  WASM_DIST_DIR: () => WASM_DIST_DIR
});
module.exports = __toCommonJS(constants_exports);
const DEFAULT_PORT = 3e3;
const DEFAULT_DATA_URL_SIZE = 1e4;
const DEFAULT_MOUNT_ID = "root";
const DEFAULT_DEV_HOST = "0.0.0.0";
const DEFAULT_WEB_BROWSERSLIST = [
  "chrome >= 87",
  "edge >= 88",
  "firefox >= 78",
  "safari >= 14"
];
const DEFAULT_BROWSERSLIST = {
  web: DEFAULT_WEB_BROWSERSLIST,
  "web-worker": DEFAULT_WEB_BROWSERSLIST,
  "service-worker": DEFAULT_WEB_BROWSERSLIST,
  node: ["node >= 16"]
};
const ROOT_DIST_DIR = "dist";
const HTML_DIST_DIR = "/";
const SERVER_DIST_DIR = "server";
const SERVICE_WORKER_DIST_DIR = "worker";
const JS_DIST_DIR = "static/js";
const CSS_DIST_DIR = "static/css";
const SVG_DIST_DIR = "static/svg";
const FONT_DIST_DIR = "static/font";
const WASM_DIST_DIR = "static/wasm";
const IMAGE_DIST_DIR = "static/image";
const MEDIA_DIST_DIR = "static/media";
const FONT_EXTENSIONS = ["woff", "woff2", "eot", "ttf", "otf", "ttc"];
const IMAGE_EXTENSIONS = [
  "png",
  "jpg",
  "jpeg",
  "pjpeg",
  "pjp",
  "gif",
  "bmp",
  "webp",
  "ico",
  "apng",
  "avif",
  "tif",
  "tiff",
  "jfif"
];
const VIDEO_EXTENSIONS = ["mp4", "webm", "ogg", "mov"];
const AUDIO_EXTENSIONS = ["mp3", "wav", "flac", "aac", "m4a", "opus"];
const DEFAULT_ASSET_PREFIX = "/";
const HTML_REGEX = /\.html$/;
const JS_REGEX = /\.(?:js|mjs|cjs|jsx)$/;
const TS_REGEX = /\.(?:ts|mts|cts|tsx)$/;
const SCRIPT_REGEX = /\.(?:js|jsx|mjs|cjs|ts|tsx|mts|cts)$/;
const TS_AND_JSX_REGEX = /\.(?:ts|tsx|jsx|mts|cts)$/;
const SVG_REGEX = /\.svg$/;
const CSS_REGEX = /\.css$/;
const LESS_REGEX = /\.less$/;
const SASS_REGEX = /\.s(?:a|c)ss$/;
const CSS_MODULES_REGEX = /\.module\.\w+$/i;
const NODE_MODULES_REGEX = /[\\/]node_modules[\\/]/;
const TS_CONFIG_FILE = "tsconfig.json";
const TARGET_ID_MAP = {
  web: "Client",
  node: "Server",
  "web-worker": "Web Worker",
  "service-worker": "Service Worker"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AUDIO_EXTENSIONS,
  CSS_DIST_DIR,
  CSS_MODULES_REGEX,
  CSS_REGEX,
  DEFAULT_ASSET_PREFIX,
  DEFAULT_BROWSERSLIST,
  DEFAULT_DATA_URL_SIZE,
  DEFAULT_DEV_HOST,
  DEFAULT_MOUNT_ID,
  DEFAULT_PORT,
  FONT_DIST_DIR,
  FONT_EXTENSIONS,
  HTML_DIST_DIR,
  HTML_REGEX,
  IMAGE_DIST_DIR,
  IMAGE_EXTENSIONS,
  JS_DIST_DIR,
  JS_REGEX,
  LESS_REGEX,
  MEDIA_DIST_DIR,
  NODE_MODULES_REGEX,
  ROOT_DIST_DIR,
  SASS_REGEX,
  SCRIPT_REGEX,
  SERVER_DIST_DIR,
  SERVICE_WORKER_DIST_DIR,
  SVG_DIST_DIR,
  SVG_REGEX,
  TARGET_ID_MAP,
  TS_AND_JSX_REGEX,
  TS_CONFIG_FILE,
  TS_REGEX,
  VIDEO_EXTENSIONS,
  WASM_DIST_DIR
});
