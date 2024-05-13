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
var asset_exports = {};
__export(asset_exports, {
  getRegExpForExts: () => getRegExpForExts,
  pluginAsset: () => pluginAsset
});
module.exports = __toCommonJS(asset_exports);
var import_node_path = __toESM(require("node:path"));
var import_shared = require("@rsbuild/shared");
const chainStaticAssetRule = ({
  emit,
  rule,
  maxSize,
  filename,
  assetType
}) => {
  const generatorOptions = {
    filename
  };
  if (emit === false) {
    generatorOptions.emit = false;
  }
  rule.oneOf(`${assetType}-asset-url`).type("asset/resource").resourceQuery(/(__inline=false|url)/).set("generator", generatorOptions);
  rule.oneOf(`${assetType}-asset-inline`).type("asset/inline").resourceQuery(/inline/);
  rule.oneOf(`${assetType}-asset`).type("asset").parser({
    dataUrlCondition: {
      maxSize
    }
  }).set("generator", generatorOptions);
};
function getRegExpForExts(exts) {
  const matcher = exts.map((ext) => ext.trim()).map((ext) => ext.startsWith(".") ? ext.slice(1) : ext).join("|");
  return new RegExp(
    exts.length === 1 ? `\\.${matcher}$` : `\\.(?:${matcher})$`,
    "i"
  );
}
const pluginAsset = () => ({
  name: "rsbuild:asset",
  setup(api) {
    api.modifyBundlerChain((chain, { isProd, target }) => {
      const config = api.getNormalizedConfig();
      const createAssetRule = (assetType, exts, emit2) => {
        const regExp = getRegExpForExts(exts);
        const distDir = (0, import_shared.getDistPath)(config, assetType);
        const filename = (0, import_shared.getFilename)(config, assetType, isProd);
        const { dataUriLimit } = config.output;
        const maxSize = typeof dataUriLimit === "number" ? dataUriLimit : dataUriLimit[assetType];
        const rule = chain.module.rule(assetType).test(regExp);
        chainStaticAssetRule({
          emit: emit2,
          rule,
          maxSize,
          filename: import_node_path.default.posix.join(distDir, filename),
          assetType
        });
      };
      const emit = config.output.emitAssets({ target });
      createAssetRule("image", import_shared.IMAGE_EXTENSIONS, emit);
      createAssetRule("svg", ["svg"], emit);
      createAssetRule(
        "media",
        [...import_shared.VIDEO_EXTENSIONS, ...import_shared.AUDIO_EXTENSIONS],
        emit
      );
      createAssetRule("font", import_shared.FONT_EXTENSIONS, emit);
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRegExpForExts,
  pluginAsset
});
