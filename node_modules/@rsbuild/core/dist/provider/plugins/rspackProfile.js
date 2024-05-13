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
var rspackProfile_exports = {};
__export(rspackProfile_exports, {
  pluginRspackProfile: () => pluginRspackProfile,
  stopProfiler: () => stopProfiler
});
module.exports = __toCommonJS(rspackProfile_exports);
var import_node_inspector = __toESM(require("node:inspector"));
var import_node_path = __toESM(require("node:path"));
var import_shared = require("@rsbuild/shared");
var import_shared2 = require("@rsbuild/shared");
var import_core = require("@rspack/core");
const stopProfiler = (output, profileSession) => {
  if (!profileSession) {
    return;
  }
  profileSession.post("Profiler.stop", (error, param) => {
    if (error) {
      import_shared2.logger.error("Failed to generate JS CPU profile:", error);
      return;
    }
    import_shared.fse.writeFileSync(output, JSON.stringify(param.profile));
  });
};
const pluginRspackProfile = () => ({
  name: "rsbuild:rspack-profile",
  async setup(api) {
    const RSPACK_PROFILE = process.env.RSPACK_PROFILE?.toUpperCase();
    if (!RSPACK_PROFILE) {
      return;
    }
    const timestamp = Date.now();
    const profileDir = import_node_path.default.join(
      api.context.distPath,
      `rspack-profile-${timestamp}`
    );
    let profileSession;
    const enableProfileTrace = RSPACK_PROFILE === "ALL" || RSPACK_PROFILE.includes("TRACE");
    const enableCPUProfile = RSPACK_PROFILE === "ALL" || RSPACK_PROFILE.includes("CPU");
    const enableLogging = RSPACK_PROFILE === "ALL" || RSPACK_PROFILE.includes("LOGGING");
    const traceFilePath = import_node_path.default.join(profileDir, "trace.json");
    const cpuProfilePath = import_node_path.default.join(profileDir, "jscpuprofile.json");
    const loggingFilePath = import_node_path.default.join(profileDir, "logging.json");
    const onStart = () => {
      import_shared.fse.ensureDirSync(profileDir);
      if (enableProfileTrace) {
        import_core.rspack.experimental_registerGlobalTrace(
          "trace",
          "chrome",
          traceFilePath
        );
      }
      if (enableCPUProfile) {
        profileSession = new import_node_inspector.default.Session();
        profileSession.connect();
        profileSession.post("Profiler.enable");
        profileSession.post("Profiler.start");
      }
    };
    api.onBeforeBuild(onStart);
    api.onBeforeStartDevServer(onStart);
    api.onAfterBuild(async ({ stats }) => {
      if (enableLogging && stats) {
        const logging = stats.toJson({
          all: false,
          logging: "verbose",
          loggingTrace: true
        });
        import_shared.fse.writeFileSync(loggingFilePath, JSON.stringify(logging));
      }
    });
    api.onExit(() => {
      if (enableProfileTrace) {
        import_core.rspack.experimental_cleanupGlobalTrace();
      }
      stopProfiler(cpuProfilePath, profileSession);
      import_shared2.logger.info(`Saved Rspack profile file to ${profileDir}`);
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginRspackProfile,
  stopProfiler
});
