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
var initHooks_exports = {};
__export(initHooks_exports, {
  createAsyncHook: () => createAsyncHook,
  initHooks: () => initHooks
});
module.exports = __toCommonJS(initHooks_exports);
var import_shared = require("@rsbuild/shared");
function createAsyncHook() {
  const preGroup = [];
  const postGroup = [];
  const defaultGroup = [];
  const tap = (cb) => {
    if ((0, import_shared.isFunction)(cb)) {
      defaultGroup.push(cb);
    } else if (cb.order === "pre") {
      preGroup.push(cb.handler);
    } else if (cb.order === "post") {
      postGroup.push(cb.handler);
    } else {
      defaultGroup.push(cb.handler);
    }
  };
  const call = async (...args) => {
    const params = args.slice(0);
    const callbacks = [...preGroup, ...defaultGroup, ...postGroup];
    for (const callback of callbacks) {
      const result = await callback(...params);
      if (result !== void 0) {
        params[0] = result;
      }
    }
    return params;
  };
  return {
    tap,
    call
  };
}
function initHooks() {
  return {
    onExit: createAsyncHook(),
    onAfterBuild: createAsyncHook(),
    onBeforeBuild: createAsyncHook(),
    onDevCompileDone: createAsyncHook(),
    onCloseDevServer: createAsyncHook(),
    onAfterStartDevServer: createAsyncHook(),
    onBeforeStartDevServer: createAsyncHook(),
    onAfterStartProdServer: createAsyncHook(),
    onBeforeStartProdServer: createAsyncHook(),
    onAfterCreateCompiler: createAsyncHook(),
    onBeforeCreateCompiler: createAsyncHook(),
    modifyHTMLTags: createAsyncHook(),
    modifyRspackConfig: createAsyncHook(),
    modifyBundlerChain: createAsyncHook(),
    modifyWebpackChain: createAsyncHook(),
    modifyWebpackConfig: createAsyncHook(),
    modifyRsbuildConfig: createAsyncHook()
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAsyncHook,
  initHooks
});
