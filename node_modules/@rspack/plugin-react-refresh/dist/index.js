"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
const options_1 = require("./options");
const reactRefreshPath = require.resolve("../client/reactRefresh.js");
const reactRefreshEntryPath = require.resolve("../client/reactRefreshEntry.js");
const refreshUtilsPath = require.resolve("../client/refreshUtils.js");
const refreshRuntimeDirPath = path_1.default.dirname(require.resolve("react-refresh", {
    paths: [reactRefreshPath]
}));
const runtimePaths = [
    reactRefreshEntryPath,
    reactRefreshPath,
    refreshUtilsPath,
    refreshRuntimeDirPath
];
/**
 * @typedef {Object} Options
 * @property {(string | RegExp | (string | RegExp)[] | null)=} include included resourcePath for loader
 * @property {(string | RegExp | (string | RegExp)[] | null)=} exclude excluded resourcePath for loader
 */
class ReactRefreshRspackPlugin {
    constructor(options = {}) {
        this.options = (0, options_1.normalizeOptions)(options);
    }
    apply(compiler) {
        if (
        // Webpack do not set process.env.NODE_ENV, so we need to check for mode.
        // Ref: https://github.com/webpack/webpack/issues/7074
        (compiler.options.mode !== "development" ||
            // We also check for production process.env.NODE_ENV,
            // in case it was set and mode is non-development (e.g. 'none')
            (process.env.NODE_ENV && process.env.NODE_ENV === "production")) &&
            !this.options.forceEnable) {
            return;
        }
        new compiler.webpack.EntryPlugin(compiler.context, reactRefreshEntryPath, {
            name: undefined
        }).apply(compiler);
        new compiler.webpack.ProvidePlugin({
            $ReactRefreshRuntime$: reactRefreshPath
        }).apply(compiler);
        compiler.options.module.rules.unshift({
            include: this.options.include,
            exclude: {
                or: [this.options.exclude, [...runtimePaths]].filter(Boolean)
            },
            use: "builtin:react-refresh-loader"
        });
        const definedModules = {
            // For Multiple Instance Mode
            __react_refresh_library__: JSON.stringify(compiler.webpack.Template.toIdentifier(this.options.library ||
                compiler.options.output.uniqueName ||
                compiler.options.output.library))
        };
        new compiler.webpack.DefinePlugin(definedModules).apply(compiler);
        const refreshPath = path_1.default.dirname(require.resolve("react-refresh"));
        compiler.options.resolve.alias = {
            "react-refresh": refreshPath,
            ...compiler.options.resolve.alias
        };
    }
}
ReactRefreshRspackPlugin.deprecated_runtimePaths = runtimePaths;
module.exports = ReactRefreshRspackPlugin;
