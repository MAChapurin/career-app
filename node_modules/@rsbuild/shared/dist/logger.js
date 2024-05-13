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
var logger_exports = {};
__export(logger_exports, {
  debug: () => debug,
  isDebug: () => isDebug,
  logger: () => import_rslog.logger
});
module.exports = __toCommonJS(logger_exports);
var import_rslog = require("../compiled/rslog");
var import_utils = require("./utils");
if (process.env.DEBUG) {
  import_rslog.logger.level = "verbose";
}
const isDebug = () => {
  if (!process.env.DEBUG) {
    return false;
  }
  import_rslog.logger.level = "verbose";
  const values = process.env.DEBUG.toLocaleLowerCase().split(",");
  return ["rsbuild", "builder", "*"].some((key) => values.includes(key));
};
function getTime() {
  const now = /* @__PURE__ */ new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
const debug = (message) => {
  if (isDebug()) {
    const result = typeof message === "string" ? message : message();
    const time = import_utils.color.gray(`${getTime()}`);
    import_rslog.logger.debug(`${time} ${result}`);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  debug,
  isDebug,
  logger
});
