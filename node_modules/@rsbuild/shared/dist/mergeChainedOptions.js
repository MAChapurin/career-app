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
var mergeChainedOptions_exports = {};
__export(mergeChainedOptions_exports, {
  mergeChainedOptions: () => mergeChainedOptions
});
module.exports = __toCommonJS(mergeChainedOptions_exports);
var import_utils = require("./utils");
function mergeChainedOptions({
  defaults,
  options,
  utils,
  mergeFn = Object.assign,
  useObjectParam,
  isFalsy = (v) => !v
}) {
  if (isFalsy(options)) {
    return defaults;
  }
  if ((0, import_utils.isPlainObject)(options)) {
    return mergeFn(
      defaults,
      options
    );
  }
  if ((0, import_utils.isFunction)(options)) {
    const ret = useObjectParam ? options({
      value: defaults,
      ...utils
    }) : options(defaults, utils);
    return isFalsy(ret) ? defaults : ret;
  }
  if (Array.isArray(options)) {
    return options.reduce(
      (defaults2, options2) => mergeChainedOptions({
        defaults: defaults2,
        options: options2,
        utils,
        mergeFn,
        useObjectParam,
        isFalsy
      }),
      defaults
    );
  }
  return options ?? defaults;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mergeChainedOptions
});
