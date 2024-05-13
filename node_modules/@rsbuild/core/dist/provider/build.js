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
var build_exports = {};
__export(build_exports, {
  build: () => build
});
module.exports = __toCommonJS(build_exports);
var import_shared = require("@rsbuild/shared");
var import_core = require("@rspack/core");
var import_createCompiler = require("./createCompiler");
var import_initConfigs = require("./initConfigs");
const build = async (initOptions, { mode = "production", watch, compiler: customCompiler } = {}) => {
  if (!(0, import_shared.getNodeEnv)()) {
    (0, import_shared.setNodeEnv)(mode);
  }
  const { context } = initOptions;
  let compiler;
  let bundlerConfigs;
  if (customCompiler) {
    compiler = customCompiler;
  } else {
    const { rspackConfigs } = await (0, import_initConfigs.initConfigs)(initOptions);
    compiler = await (0, import_createCompiler.createCompiler)({
      context,
      rspackConfigs
    });
    bundlerConfigs = rspackConfigs;
  }
  let isFirstCompile = true;
  await context.hooks.onBeforeBuild.call({
    bundlerConfigs
  });
  const onDone = async (stats) => {
    const p = context.hooks.onAfterBuild.call({ isFirstCompile, stats });
    isFirstCompile = false;
    await p;
  };
  (0, import_shared.onCompileDone)(
    compiler,
    onDone,
    // @ts-expect-error type mismatch
    import_core.rspack.MultiStats
  );
  if (watch) {
    compiler.watch({}, (err) => {
      if (err) {
        import_shared.logger.error(err);
      }
    });
    return;
  }
  await new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats?.hasErrors()) {
        const buildError = err || new Error("Rspack build failed!");
        reject(buildError);
      } else {
        compiler.close(() => {
          resolve({ stats });
        });
      }
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  build
});
