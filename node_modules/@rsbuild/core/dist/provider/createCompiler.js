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
var createCompiler_exports = {};
__export(createCompiler_exports, {
  createCompiler: () => createCompiler,
  createDevMiddleware: () => createDevMiddleware
});
module.exports = __toCommonJS(createCompiler_exports);
var import_shared = require("@rsbuild/shared");
var import_core = require("@rspack/core");
var import_initConfigs = require("./initConfigs");
var import_shared2 = require("./shared");
async function createCompiler({
  context,
  rspackConfigs
}) {
  (0, import_shared.debug)("create compiler");
  await context.hooks.onBeforeCreateCompiler.call({
    bundlerConfigs: rspackConfigs
  });
  if (!await (0, import_shared2.isSatisfyRspackVersion)(import_core.rspack.rspackVersion)) {
    throw new Error(
      `The current Rspack version does not meet the requirements, the minimum supported version of Rspack is ${import_shared.color.green(
        import_shared2.rspackMinVersion
      )}`
    );
  }
  const compiler = rspackConfigs.length === 1 ? (0, import_core.rspack)(rspackConfigs[0]) : (0, import_core.rspack)(rspackConfigs);
  let isFirstCompile = true;
  let isVersionLogged = false;
  let isCompiling = false;
  const logRspackVersion = () => {
    if (!isVersionLogged) {
      (0, import_shared.debug)(`Use Rspack v${import_core.rspack.rspackVersion}`);
      isVersionLogged = true;
    }
  };
  compiler.hooks.watchRun.tap("rsbuild:compiling", () => {
    logRspackVersion();
    if (!isCompiling) {
      import_shared.logger.start("Compiling...");
    }
    isCompiling = true;
  });
  if ((0, import_shared.isProd)()) {
    compiler.hooks.run.tap("rsbuild:run", logRspackVersion);
  }
  const done = async (stats) => {
    const obj = stats.toJson({
      all: false,
      timings: true
    });
    const printTime = (c, index) => {
      if (c.time) {
        const time = (0, import_shared.prettyTime)(c.time / 1e3);
        const target = context.targets[index];
        const name = import_shared.TARGET_ID_MAP[target || "web"];
        import_shared.logger.ready(`${name} compiled in ${time}`);
      }
    };
    if (!stats.hasErrors()) {
      if (obj.children) {
        obj.children.forEach((c, index) => {
          printTime(c, index);
        });
      } else {
        printTime(obj, 0);
      }
    }
    const { message, level } = (0, import_shared2.formatStats)(stats, (0, import_shared2.getStatsOptions)(compiler));
    if (level === "error") {
      import_shared.logger.error(message);
    }
    if (level === "warning") {
      import_shared.logger.warn(message);
    }
    if ((0, import_shared.isDev)()) {
      await context.hooks.onDevCompileDone.call({
        isFirstCompile,
        stats
      });
    }
    isCompiling = false;
    isFirstCompile = false;
  };
  (0, import_shared.onCompileDone)(
    compiler,
    done,
    // @ts-expect-error type mismatch
    import_core.rspack.MultiStats
  );
  await context.hooks.onAfterCreateCompiler.call({ compiler });
  (0, import_shared.debug)("create compiler done");
  return compiler;
}
async function createDevMiddleware(options, customCompiler) {
  let compiler;
  if (customCompiler) {
    compiler = customCompiler;
  } else {
    const { rspackConfigs } = await (0, import_initConfigs.initConfigs)(options);
    compiler = await createCompiler({
      context: options.context,
      rspackConfigs
    });
  }
  const { getDevMiddleware } = await Promise.resolve().then(() => __toESM(require("../server/devMiddleware")));
  return {
    devMiddleware: getDevMiddleware(compiler),
    compiler
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCompiler,
  createDevMiddleware
});
