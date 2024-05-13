"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleFederationPlugin = void 0;
const config_1 = require("../config");
const options_1 = require("./options");
const validate_1 = require("../util/validate");
const ModuleFederationRuntimePlugin_1 = require("./ModuleFederationRuntimePlugin");
class ModuleFederationPlugin {
    constructor(_options) {
        this._options = _options;
    }
    apply(compiler) {
        const { webpack } = compiler;
        const paths = getPaths(this._options);
        compiler.options.resolve.alias = {
            "@module-federation/runtime-tools": paths.runtimeTools,
            "@module-federation/runtime": paths.runtime,
            ...compiler.options.resolve.alias
        };
        compiler.hooks.afterPlugins.tap(ModuleFederationPlugin.name, () => {
            new webpack.EntryPlugin(compiler.context, getDefaultEntryRuntime(paths, this._options, compiler), { name: undefined }).apply(compiler);
        });
        new ModuleFederationRuntimePlugin_1.ModuleFederationRuntimePlugin().apply(compiler);
        new webpack.container.ModuleFederationPluginV1({
            ...this._options,
            enhanced: true
        }).apply(compiler);
    }
}
exports.ModuleFederationPlugin = ModuleFederationPlugin;
function getRemoteInfos(options) {
    var _a;
    if (!options.remotes) {
        return {};
    }
    function extractUrlAndGlobal(urlAndGlobal) {
        const index = urlAndGlobal.indexOf("@");
        if (index <= 0 || index === urlAndGlobal.length - 1) {
            return null;
        }
        return [
            urlAndGlobal.substring(index + 1),
            urlAndGlobal.substring(0, index)
        ];
    }
    function getExternalTypeFromExternal(external) {
        if (/^[a-z0-9-]+ /.test(external)) {
            const idx = external.indexOf(" ");
            return [
                external.slice(0, idx),
                external.slice(idx + 1)
            ];
        }
        return null;
    }
    function getExternal(external) {
        const result = getExternalTypeFromExternal(external);
        if (result === null) {
            return [remoteType, external];
        }
        return result;
    }
    const remoteType = options.remoteType ||
        (options.library && (0, validate_1.isValidate)(options.library.type, config_1.externalsType)
            ? options.library.type
            : "script");
    const remotes = (0, options_1.parseOptions)(options.remotes, item => ({
        external: Array.isArray(item) ? item : [item],
        shareScope: options.shareScope || "default"
    }), item => ({
        external: Array.isArray(item.external) ? item.external : [item.external],
        shareScope: item.shareScope || options.shareScope || "default"
    }));
    const remoteInfos = {};
    for (let [key, config] of remotes) {
        for (let external of config.external) {
            const [externalType, externalRequest] = getExternal(external);
            (_a = remoteInfos[key]) !== null && _a !== void 0 ? _a : (remoteInfos[key] = []);
            if (externalType === "script") {
                const [url, global] = extractUrlAndGlobal(externalRequest);
                remoteInfos[key].push({
                    alias: key,
                    name: global,
                    entry: url,
                    externalType,
                    shareScope: config.shareScope
                });
            }
            else {
                remoteInfos[key].push({
                    alias: key,
                    name: undefined,
                    entry: undefined,
                    externalType,
                    shareScope: config.shareScope
                });
            }
        }
    }
    return remoteInfos;
}
function getRuntimePlugins(options) {
    var _a;
    return (_a = options.runtimePlugins) !== null && _a !== void 0 ? _a : [];
}
function getPaths(options) {
    var _a;
    const runtimeToolsPath = (_a = options.implementation) !== null && _a !== void 0 ? _a : require.resolve("@module-federation/runtime-tools");
    const bundlerRuntimePath = require.resolve("@module-federation/webpack-bundler-runtime", { paths: [runtimeToolsPath] });
    const runtimePath = require.resolve("@module-federation/runtime", {
        paths: [runtimeToolsPath]
    });
    return {
        runtimeTools: runtimeToolsPath,
        bundlerRuntime: bundlerRuntimePath,
        runtime: runtimePath
    };
}
function getDefaultEntryRuntime(paths, options, compiler) {
    var _a;
    const runtimePlugins = getRuntimePlugins(options);
    const remoteInfos = getRemoteInfos(options);
    const runtimePluginImports = [];
    const runtimePluginVars = [];
    for (let i = 0; i < runtimePlugins.length; i++) {
        const runtimePluginVar = `__module_federation_runtime_plugin_${i}__`;
        runtimePluginImports.push(`import ${runtimePluginVar} from ${JSON.stringify(runtimePlugins[i])}`);
        runtimePluginVars.push(`${runtimePluginVar}()`);
    }
    const content = [
        `import __module_federation_bundler_runtime__ from ${JSON.stringify(paths.bundlerRuntime)}`,
        ...runtimePluginImports,
        `const __module_federation_runtime_plugins__ = [${runtimePluginVars.join(", ")}]`,
        `const __module_federation_remote_infos__ = ${JSON.stringify(remoteInfos)}`,
        `const __module_federation_container_name__ = ${JSON.stringify((_a = options.name) !== null && _a !== void 0 ? _a : compiler.options.output.uniqueName)}`,
        compiler.webpack.Template.getFunctionContent(require("./default.runtime"))
    ].join("\n");
    // use "application/node" to use moduleType "javascript/auto"
    return `data:application/node,${content}`;
}
