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
var rsdoctor_exports = {};
__export(rsdoctor_exports, {
  pluginRsdoctor: () => pluginRsdoctor
});
module.exports = __toCommonJS(rsdoctor_exports);
var import_shared = require("@rsbuild/shared");
const pluginRsdoctor = () => ({
  name: "rsbuild:rsdoctor",
  setup(api) {
    api.onBeforeCreateCompiler(async ({ bundlerConfigs }) => {
      if (process.env.RSDOCTOR !== "true") {
        return;
      }
      const isRspack = api.context.bundlerType === "rspack";
      const packageName = isRspack ? "@rsdoctor/rspack-plugin" : "@rsdoctor/webpack-plugin";
      let module2;
      try {
        const path = require.resolve(packageName, {
          paths: [api.context.rootPath]
        });
        module2 = await Promise.resolve().then(() => __toESM(require(path)));
      } catch (err) {
        import_shared.logger.warn(
          `\`process.env.RSDOCTOR\` enabled, please install ${import_shared.color.bold(import_shared.color.yellow(packageName))} package.`
        );
        return;
      }
      const pluginName = isRspack ? "RsdoctorRspackPlugin" : "RsdoctorWebpackPlugin";
      if (!module2 || !module2[pluginName]) {
        return;
      }
      let isAutoRegister = false;
      for (const config of bundlerConfigs) {
        const registered = config.plugins?.some(
          (plugin) => plugin?.constructor?.name === pluginName
        );
        if (registered) {
          return;
        }
        config.plugins || (config.plugins = []);
        config.plugins.push(new module2[pluginName]());
        isAutoRegister = true;
      }
      if (isAutoRegister) {
        import_shared.logger.info(`${import_shared.color.bold(import_shared.color.yellow(packageName))} enabled.`);
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginRsdoctor
});
