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
var entry_exports = {};
__export(entry_exports, {
  getEntryObject: () => getEntryObject,
  pluginEntry: () => pluginEntry
});
module.exports = __toCommonJS(entry_exports);
var import_shared = require("@rsbuild/shared");
function getEntryObject(config, target) {
  if (!config.source?.entry) {
    return {};
  }
  return (0, import_shared.mergeChainedOptions)({
    defaults: {},
    options: config.source?.entry,
    utils: { target },
    useObjectParam: true
  });
}
const pluginEntry = () => ({
  name: "rsbuild:entry",
  setup(api) {
    api.modifyBundlerChain(
      async (chain, { target, isServer, isServiceWorker }) => {
        const config = api.getNormalizedConfig();
        const { preEntry } = config.source;
        const entry = target === "web" ? api.context.entry : getEntryObject(config, target);
        const injectCoreJsEntry = config.output.polyfill === "entry" && !isServer && !isServiceWorker;
        for (const entryName of Object.keys(entry)) {
          const entryPoint = chain.entry(entryName);
          const addEntry = (item) => {
            entryPoint.add(item);
          };
          preEntry.forEach(addEntry);
          if (injectCoreJsEntry) {
            addEntry((0, import_shared.createVirtualModule)('import "core-js";'));
          }
          (0, import_shared.castArray)(entry[entryName]).forEach(addEntry);
        }
      }
    );
    api.onBeforeCreateCompiler(({ bundlerConfigs }) => {
      if (bundlerConfigs.every((config) => !config.entry)) {
        throw new Error(
          `Could not find any entry module, please make sure that ${import_shared.color.cyan(
            "src/index.(ts|js|tsx|jsx|mjs|cjs)"
          )} exists, or customize entry through the ${import_shared.color.cyan(
            "source.entry"
          )} configuration.`
        );
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getEntryObject,
  pluginEntry
});
