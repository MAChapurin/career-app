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
var pluginManager_exports = {};
__export(pluginManager_exports, {
  createPluginManager: () => createPluginManager,
  initPlugins: () => initPlugins,
  pluginDagSort: () => pluginDagSort
});
module.exports = __toCommonJS(pluginManager_exports);
var import_shared = require("@rsbuild/shared");
function validatePlugin(plugin) {
  const type = typeof plugin;
  if (type !== "object" || plugin === null) {
    throw new Error(
      `Expect Rsbuild plugin instance to be an object, but got ${type}.`
    );
  }
  if ((0, import_shared.isFunction)(plugin.setup)) {
    return;
  }
  if ((0, import_shared.isFunction)(plugin.apply)) {
    const { name = "SomeWebpackPlugin" } = plugin.constructor || {};
    const messages = [
      `${import_shared.color.yellow(
        name
      )} looks like a Webpack or Rspack plugin, please use ${import_shared.color.yellow(
        "`tools.rspack`"
      )} to register it:`,
      import_shared.color.green(`
  // rsbuild.config.ts
  export default {
    tools: {
      rspack: {
        plugins: [new ${name}()]
      }
    }
  };
`)
    ];
    throw new Error(messages.join("\n"));
  }
  throw new Error(
    `Expect Rsbuild plugin.setup to be a function, but got ${type}.`
  );
}
function createPluginManager() {
  let plugins = [];
  const addPlugins = (newPlugins, options) => {
    const { before } = options || {};
    for (const newPlugin of newPlugins) {
      if (!newPlugin) {
        continue;
      }
      validatePlugin(newPlugin);
      if (plugins.find((item) => item.name === newPlugin.name)) {
        import_shared.logger.warn(
          `Rsbuild plugin "${newPlugin.name}" registered multiple times.`
        );
      } else if (before) {
        const index = plugins.findIndex((item) => item.name === before);
        if (index === -1) {
          import_shared.logger.warn(`Plugin "${before}" does not exist.`);
          plugins.push(newPlugin);
        } else {
          plugins.splice(index, 0, newPlugin);
        }
      } else {
        plugins.push(newPlugin);
      }
    }
  };
  const removePlugins = (pluginNames) => {
    plugins = plugins.filter((plugin) => !pluginNames.includes(plugin.name));
  };
  const isPluginExists = (pluginName) => Boolean(plugins.find((plugin) => plugin.name === pluginName));
  return {
    get plugins() {
      return plugins;
    },
    addPlugins,
    removePlugins,
    isPluginExists
  };
}
const pluginDagSort = (plugins) => {
  let allLines = [];
  function getPlugin(name) {
    const target = plugins.find((item) => item.name === name);
    if (!target) {
      throw new Error(`plugin ${name} not existed`);
    }
    return target;
  }
  for (const plugin of plugins) {
    if (plugin.pre) {
      for (const pre of plugin.pre) {
        if (pre && plugins.some((item) => item.name === pre)) {
          allLines.push([pre, plugin.name]);
        }
      }
    }
    if (plugin.post) {
      for (const post of plugin.post) {
        if (post && plugins.some((item) => item.name === post)) {
          allLines.push([plugin.name, post]);
        }
      }
    }
  }
  let zeroEndPoints = plugins.filter(
    (item) => !allLines.find((l) => l[1] === item.name)
  );
  const sortedPoint = [];
  while (zeroEndPoints.length) {
    const zep = zeroEndPoints.shift();
    sortedPoint.push(getPlugin(zep.name));
    allLines = allLines.filter((l) => l[0] !== getPlugin(zep.name).name);
    const restPoints = plugins.filter(
      (item) => !sortedPoint.find((sp) => sp.name === item.name)
    );
    zeroEndPoints = restPoints.filter(
      (item) => !allLines.find((l) => l[1] === item.name)
    );
  }
  if (allLines.length) {
    const restInRingPoints = {};
    for (const l of allLines) {
      restInRingPoints[l[0]] = true;
      restInRingPoints[l[1]] = true;
    }
    throw new Error(
      `plugins dependencies has loop: ${Object.keys(restInRingPoints).join(
        ","
      )}`
    );
  }
  return sortedPoint;
};
async function initPlugins({
  pluginAPI,
  pluginManager
}) {
  (0, import_shared.debug)("init plugins");
  const plugins = pluginDagSort(pluginManager.plugins);
  const removedPlugins = plugins.reduce((ret, plugin) => {
    if (plugin.remove) {
      return ret.concat(plugin.remove);
    }
    return ret;
  }, []);
  for (const plugin of plugins) {
    if (removedPlugins.includes(plugin.name)) {
      continue;
    }
    await plugin.setup(pluginAPI);
  }
  (0, import_shared.debug)("init plugins done");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPluginManager,
  initPlugins,
  pluginDagSort
});
