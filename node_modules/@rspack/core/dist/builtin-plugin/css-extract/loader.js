"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pitch = exports.SINGLE_DOT_PATH_SEGMENT = exports.BASE_URI = exports.ABSOLUTE_PUBLIC_PATH = exports.AUTO_PUBLIC_PATH = exports.MODULE_TYPE = void 0;
const loader_options_json_1 = __importDefault(require("./loader-options.json"));
const index_1 = require("./index");
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
exports.MODULE_TYPE = "css/mini-extract";
exports.AUTO_PUBLIC_PATH = "__mini_css_extract_plugin_public_path_auto__";
exports.ABSOLUTE_PUBLIC_PATH = "webpack:///mini-css-extract-plugin/";
exports.BASE_URI = "webpack://";
exports.SINGLE_DOT_PATH_SEGMENT = "__mini_css_extract_plugin_single_dot_path_segment__";
const SERIALIZE_SEP = "__RSPACK_CSS_EXTRACT_SEP__";
function hotLoader(content, context) {
    const accept = context.locals
        ? ""
        : "module.hot.accept(undefined, cssReload);";
    return `${content}
    if(module.hot) {
      // ${Date.now()}
      var cssReload = require(${(0, utils_1.stringifyRequest)(context.loaderContext, path_1.default.join(__dirname, "./hmr/hotModuleReplacement.js"))})(module.id, ${JSON.stringify({
        ...context.options,
        locals: !!context.locals
    })});
      module.hot.dispose(cssReload);
      ${accept}
    }
  `;
}
const loader = function loader(content) {
    if (this._compiler &&
        this._compiler.options &&
        this._compiler.options.experiments &&
        this._compiler.options.experiments.css) {
        return content;
    }
};
const pitch = function (request, _, data) {
    if (this._compiler &&
        this._compiler.options &&
        this._compiler.options.experiments &&
        this._compiler.options.experiments.css) {
        let e = new Error("You can't use `experiments.css` and `css-extract-rspack-plugin` together, please set `experiments.css` to `false`");
        e.stack = undefined;
        this.emitWarning(e);
        return;
    }
    if (this._compiler &&
        this._compiler.options &&
        this._compiler.options.experiments &&
        this._compiler.options.experiments.rspackFuture &&
        this._compiler.options.experiments.rspackFuture.newTreeshaking === false) {
        this.emitError(new Error("Cannot use CssExtractRspackPlugin without newTreeshaking"));
        return;
    }
    const options = this.getOptions(loader_options_json_1.default);
    const emit = typeof options.emit !== "undefined" ? options.emit : true;
    const callback = this.async();
    const filepath = this.resourcePath;
    let { publicPath } = 
    /** @type {Compilation} */
    this._compilation.outputOptions;
    if (typeof options.publicPath === "string") {
        // eslint-disable-next-line prefer-destructuring
        publicPath = options.publicPath;
    }
    else if (typeof options.publicPath === "function") {
        publicPath = options.publicPath(this.resourcePath, this.rootContext);
    }
    if (publicPath === "auto") {
        publicPath = exports.AUTO_PUBLIC_PATH;
    }
    let publicPathForExtract;
    if (typeof publicPath === "string") {
        const isAbsolutePublicPath = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/.test(publicPath);
        publicPathForExtract = isAbsolutePublicPath
            ? publicPath
            : `${exports.ABSOLUTE_PUBLIC_PATH}${publicPath.replace(/\./g, exports.SINGLE_DOT_PATH_SEGMENT)}`;
    }
    else {
        publicPathForExtract = publicPath;
    }
    const handleExports = (originalExports) => {
        /** @type {Locals | undefined} */
        let locals;
        let namedExport;
        const esModule = typeof options.esModule !== "undefined" ? options.esModule : true;
        let dependencies = [];
        try {
            // eslint-disable-next-line no-underscore-dangle
            const exports = originalExports.__esModule
                ? originalExports.default
                : originalExports;
            namedExport =
                // eslint-disable-next-line no-underscore-dangle
                originalExports.__esModule &&
                    (!originalExports.default || !("locals" in originalExports.default));
            if (namedExport) {
                Object.keys(originalExports).forEach(key => {
                    if (key !== "default") {
                        if (!locals) {
                            locals = {};
                        }
                        /** @type {Locals} */ locals[key] = originalExports[key];
                    }
                });
            }
            else {
                locals = exports && exports.locals;
            }
            if (Array.isArray(exports) && emit) {
                const identifierCountMap = new Map();
                dependencies = exports
                    .map(([id, content, media, sourceMap, supports, layer]) => {
                    let identifier = id;
                    let context = this.rootContext;
                    const count = identifierCountMap.get(identifier) || 0;
                    identifierCountMap.set(identifier, count + 1);
                    return {
                        identifier,
                        context,
                        content,
                        media,
                        supports,
                        layer,
                        identifierIndex: count,
                        sourceMap: sourceMap
                            ? JSON.stringify(sourceMap)
                            : // eslint-disable-next-line no-undefined
                                undefined,
                        filepath
                    };
                })
                    .filter(item => item !== null);
            }
        }
        catch (e) {
            callback(e);
            return;
        }
        const result = locals
            ? namedExport
                ? Object.keys(locals)
                    .map(key => `\nexport var ${key} = ${(0, utils_1.stringifyLocal)(
                /** @type {Locals} */ locals[key])};`)
                    .join("")
                : `\n${esModule ? "export default" : "module.exports ="} ${JSON.stringify(locals)};`
            : esModule
                ? `\nexport {};`
                : "";
        let resultSource = `// extracted by ${index_1.CssExtractRspackPlugin.pluginName}`;
        // only attempt hotreloading if the css is actually used for something other than hash values
        resultSource +=
            this.hot && emit
                ? hotLoader(result, { loaderContext: this, options, locals: locals })
                : result;
        const additionalData = { ...data };
        if (dependencies.length > 0) {
            additionalData[index_1.CssExtractRspackPlugin.pluginName] = dependencies
                .map(dep => {
                return [
                    dep.identifier,
                    dep.content,
                    dep.context,
                    dep.media,
                    dep.supports,
                    dep.sourceMap,
                    dep.identifierIndex,
                    dep.filepath
                ].join(SERIALIZE_SEP);
            })
                .join(SERIALIZE_SEP);
        }
        callback(null, resultSource, undefined, additionalData);
    };
    this.importModule(`${this.resourcePath}.webpack[javascript/auto]!=!!!${request}`, {
        publicPath: /** @type {string} */ publicPathForExtract,
        baseUri: `${exports.BASE_URI}/`
    }, (error, exports) => {
        if (error) {
            callback(error);
            return;
        }
        handleExports(exports);
    });
};
exports.pitch = pitch;
exports.default = loader;
