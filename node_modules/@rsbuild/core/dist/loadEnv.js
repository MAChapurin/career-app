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
var loadEnv_exports = {};
__export(loadEnv_exports, {
  loadEnv: () => loadEnv
});
module.exports = __toCommonJS(loadEnv_exports);
var import_node_fs = __toESM(require("node:fs"));
var import_node_path = require("node:path");
var import_shared = require("@rsbuild/shared");
var import_dotenv = require("../compiled/dotenv");
var import_dotenv_expand = require("../compiled/dotenv-expand");
function loadEnv({
  cwd = process.cwd(),
  mode = (0, import_shared.getNodeEnv)(),
  prefixes = ["PUBLIC_"]
} = {}) {
  if (mode === "local") {
    throw new Error(
      `'local' cannot be used as a value for env mode, because ".env.local" represents a temporary local file. Please use another value.`
    );
  }
  const filenames = [
    ".env",
    ".env.local",
    `.env.${mode}`,
    `.env.${mode}.local`
  ];
  const filePaths = filenames.map((filename) => (0, import_node_path.join)(cwd, filename)).filter(import_shared.isFileSync);
  const parsed = {};
  for (const envPath of filePaths) {
    Object.assign(parsed, (0, import_dotenv.parse)(import_node_fs.default.readFileSync(envPath)));
  }
  (0, import_dotenv_expand.expand)({ parsed });
  const publicVars = {};
  for (const key of Object.keys(process.env)) {
    const val = process.env[key];
    if (val && prefixes.some((prefix) => key.startsWith(prefix))) {
      publicVars[`process.env.${key}`] = JSON.stringify(val);
    }
  }
  let cleaned = false;
  const cleanup = () => {
    if (cleaned) {
      return;
    }
    for (const key of Object.keys(parsed)) {
      if (key === "NODE_ENV") {
        continue;
      }
      if (process.env[key] === parsed[key]) {
        delete process.env[key];
      }
    }
    cleaned = true;
  };
  return {
    parsed,
    cleanup,
    filePaths,
    publicVars
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadEnv
});
