"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStatsFactoryPlugin = void 0;
/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/tree/4b4ca3bb53f36a5b8fc6bc1bd976ed7af161bd80/lib/stats
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
const comparators_1 = require("../util/comparators");
const identifier_1 = require("../util/identifier");
const util = __importStar(require("node:util"));
const statsFactoryUtils_1 = require("./statsFactoryUtils");
const Logger_1 = require("../logging/Logger");
const compareIds = comparators_1.compareIds;
const GROUP_EXTENSION_REGEXP = /(\.[^.]+?)(?:\?|(?: \+ \d+ modules?)?$)/;
const GROUP_PATH_REGEXP = /(.+)[/\\][^/\\]+?(?:\?|(?: \+ \d+ modules?)?$)/;
const ITEM_NAMES = {
    "compilation.children[]": "compilation",
    "compilation.modules[]": "module",
    "compilation.entrypoints[]": "chunkGroup",
    "compilation.namedChunkGroups[]": "chunkGroup",
    "compilation.errors[]": "error",
    "compilation.warnings[]": "warning",
    "chunk.modules[]": "module",
    "chunk.rootModules[]": "module",
    "chunk.origins[]": "chunkOrigin",
    "compilation.chunks[]": "chunk",
    "compilation.assets[]": "asset",
    "asset.related[]": "asset",
    "module.issuerPath[]": "moduleIssuer",
    "module.reasons[]": "moduleReason",
    "module.modules[]": "module",
    "module.children[]": "module"
    // "moduleTrace[]": "moduleTraceItem",
    // "moduleTraceItem.dependencies[]": "moduleTraceDependency"
};
// const MERGER: Record<
// 	string,
// 	(
// 		items: {
// 			[key: string]: any;
// 			name: string;
// 		}[]
// 	) => any
// > = {
// 	"compilation.entrypoints": mergeToObject,
// 	"compilation.namedChunkGroups": mergeToObject
// };
const ASSETS_GROUPERS = {
    _: (groupConfigs, context, options) => {
        const groupByFlag = (name, exclude) => {
            groupConfigs.push({
                getKeys: (asset) => {
                    return asset[name] ? ["1"] : undefined;
                },
                getOptions: () => {
                    return {
                        groupChildren: !exclude,
                        force: exclude
                    };
                },
                // @ts-expect-error
                createGroup: (key, children, assets) => {
                    return exclude
                        ? {
                            type: "assets by status",
                            [name]: !!key,
                            filteredChildren: assets.length,
                            ...(0, statsFactoryUtils_1.assetGroup)(children)
                        }
                        : {
                            type: "assets by status",
                            [name]: !!key,
                            children,
                            ...(0, statsFactoryUtils_1.assetGroup)(children)
                        };
                }
            });
        };
        const { groupAssetsByEmitStatus, groupAssetsByPath, groupAssetsByExtension } = options;
        if (groupAssetsByEmitStatus) {
            groupByFlag("emitted");
            // groupByFlag("comparedForEmit");
            // groupByFlag("isOverSizeLimit");
        }
        // if (groupAssetsByEmitStatus || !options.cachedAssets) {
        // 	groupByFlag("cached", !options.cachedAssets);
        // }
        if (groupAssetsByPath || groupAssetsByExtension) {
            groupConfigs.push({
                getKeys: asset => {
                    const extensionMatch = groupAssetsByExtension && GROUP_EXTENSION_REGEXP.exec(asset.name);
                    const extension = extensionMatch ? extensionMatch[1] : "";
                    const pathMatch = groupAssetsByPath && GROUP_PATH_REGEXP.exec(asset.name);
                    const path = pathMatch ? pathMatch[1].split(/[/\\]/) : [];
                    const keys = [];
                    if (groupAssetsByPath) {
                        keys.push(".");
                        if (extension)
                            keys.push(path.length
                                ? `${path.join("/")}/*${extension}`
                                : `*${extension}`);
                        while (path.length > 0) {
                            keys.push(path.join("/") + "/");
                            path.pop();
                        }
                    }
                    else {
                        if (extension)
                            keys.push(`*${extension}`);
                    }
                    return keys;
                },
                // @ts-expect-error
                createGroup: (key, children) => {
                    return {
                        type: groupAssetsByPath ? "assets by path" : "assets by extension",
                        name: key,
                        children,
                        ...(0, statsFactoryUtils_1.assetGroup)(children)
                    };
                }
            });
        }
    }
    // not support groupAssetsByInfo / groupAssetsByChunk / excludeAssets
};
const MODULES_GROUPERS = (_type) => ({
    _: (groupConfigs, context, options) => {
        const groupByFlag = (name, type, exclude) => {
            groupConfigs.push({
                getKeys: module => {
                    return module[name] ? ["1"] : undefined;
                },
                getOptions: () => {
                    return {
                        groupChildren: !exclude,
                        force: exclude
                    };
                },
                // @ts-expect-error
                createGroup: (key, children, modules) => {
                    return {
                        type,
                        [name]: !!key,
                        ...(exclude ? { filteredChildren: modules.length } : { children }),
                        ...(0, statsFactoryUtils_1.moduleGroup)(children)
                    };
                }
            });
        };
        const { groupModulesByCacheStatus, groupModulesByAttributes, groupModulesByType } = options;
        if (groupModulesByAttributes) {
            groupByFlag("errors", "modules with errors");
            groupByFlag("warnings", "modules with warnings");
            groupByFlag("assets", "modules with assets");
            groupByFlag("optional", "optional modules");
        }
        if (groupModulesByCacheStatus) {
            groupByFlag("cacheable", "cacheable modules");
            groupByFlag("built", "built modules");
            groupByFlag("codeGenerated", "code generated modules");
        }
        if (groupModulesByCacheStatus || !options.cachedModules) {
            groupByFlag("cached", "cached modules", !options.cachedModules);
        }
        if (groupModulesByAttributes || !options.orphanModules) {
            groupByFlag("orphan", "orphan modules", !options.orphanModules);
        }
        if (groupModulesByAttributes || !options.dependentModules) {
            groupByFlag("dependent", "dependent modules", !options.dependentModules);
        }
        if (groupModulesByType || !options.runtimeModules) {
            groupConfigs.push({
                getKeys: (module) => {
                    if (!module.moduleType)
                        return;
                    if (groupModulesByType) {
                        return [module.moduleType.split("/", 1)[0]];
                    }
                    else if (module.moduleType === "runtime") {
                        return ["runtime"];
                    }
                },
                getOptions: key => {
                    const exclude = key === "runtime" && !options.runtimeModules;
                    return {
                        groupChildren: !exclude,
                        force: exclude
                    };
                },
                // @ts-expect-error
                createGroup: (key, children, modules) => {
                    const exclude = key === "runtime" && !options.runtimeModules;
                    return {
                        type: `${key} modules`,
                        moduleType: key,
                        ...(exclude ? { filteredChildren: modules.length } : { children }),
                        ...(0, statsFactoryUtils_1.moduleGroup)(children)
                    };
                }
            });
        }
        // not support groupModulesByLayer / groupModulesByPath / groupModulesByExtension
    }
    // not support excludeModules
});
const RESULT_GROUPERS = {
    "compilation.assets": ASSETS_GROUPERS,
    "asset.related": ASSETS_GROUPERS,
    "compilation.modules": MODULES_GROUPERS("module"),
    "chunk.modules": MODULES_GROUPERS("chunk"),
    "chunk.rootModules": MODULES_GROUPERS("root-of-chunk"),
    "module.modules": MODULES_GROUPERS("nested")
};
const ASSET_SORTERS = {
    assetsSort: (comparators, _context, { assetsSort }) => {
        comparators.push((0, statsFactoryUtils_1.sortByField)(assetsSort));
    },
    _: (comparators) => {
        comparators.push((0, comparators_1.compareSelect)((a) => a.name, compareIds));
    }
};
const RESULT_SORTERS = {
    "compilation.chunks": {
        chunksSort: (comparators, context, { chunksSort }) => {
            comparators.push((0, statsFactoryUtils_1.sortByField)(chunksSort));
        }
    },
    "compilation.modules": {
        modulesSort: (comparators, context, { modulesSort }) => {
            comparators.push((0, statsFactoryUtils_1.sortByField)(modulesSort));
        }
    },
    "chunk.modules": {
        chunkModulesSort: (comparators, context, { chunkModulesSort }) => {
            comparators.push((0, statsFactoryUtils_1.sortByField)(chunkModulesSort));
        }
    },
    "module.modules": {
        nestedModulesSort: (comparators, context, { nestedModulesSort }) => {
            comparators.push((0, statsFactoryUtils_1.sortByField)(nestedModulesSort));
        }
    },
    "compilation.assets": ASSET_SORTERS,
    "asset.related": ASSET_SORTERS
};
const SORTERS = {
    "compilation.chunks": {
        _: comparators => {
            comparators.push((0, comparators_1.compareSelect)((c) => c.id, compareIds));
        }
    }
    // not support compilation.modules / chunk.rootModules / chunk.modules / module.modules  (missing Module.moduleGraph)
    // "compilation.modules": MODULES_SORTER,
    // "chunk.rootModules": MODULES_SORTER,
    // "chunk.modules": MODULES_SORTER,
    // "module.modules": MODULES_SORTER
    // not support module.reasons (missing Module.identifier())
    // not support chunk.origins (missing compilation.chunkGraph)
};
const SIMPLE_EXTRACTORS = {
    compilation: {
        _: (object, compilation, context, options) => {
            var _a;
            if (!context.makePathsRelative) {
                context.makePathsRelative = identifier_1.makePathsRelative.bindContextCache(compilation.compiler.context, compilation.compiler.root);
            }
            if (!context.cachedGetErrors) {
                context.cachedGetErrors = _compilation => {
                    return context.getInner(compilation).getErrors();
                };
            }
            if (!context.cachedGetWarnings) {
                context.cachedGetWarnings = _compilation => {
                    const warnings = context.getInner(compilation).getWarnings();
                    return compilation.hooks.processWarnings.call(warnings);
                };
            }
            if (compilation.name) {
                object.name = compilation.name;
            }
            // TODO: support compilation.needAdditionalPass
            const logging = options.logging;
            const loggingDebug = options.loggingDebug;
            const loggingTrace = options.loggingTrace;
            if (logging || (loggingDebug && loggingDebug.length > 0)) {
                let collapsedGroups = false;
                let acceptedTypes;
                if (logging === "verbose" ||
                    (loggingDebug && loggingDebug.length > 0)) {
                    acceptedTypes = (0, Logger_1.getLogTypesBitFlag)([
                        Logger_1.LogType.error,
                        Logger_1.LogType.warn,
                        Logger_1.LogType.info,
                        Logger_1.LogType.log,
                        Logger_1.LogType.group,
                        Logger_1.LogType.groupEnd,
                        Logger_1.LogType.groupCollapsed,
                        Logger_1.LogType.profile,
                        Logger_1.LogType.profileEnd,
                        Logger_1.LogType.time,
                        Logger_1.LogType.status,
                        Logger_1.LogType.clear,
                        Logger_1.LogType.cache
                    ]);
                    collapsedGroups = true;
                }
                else if (logging === "log" || logging === true) {
                    acceptedTypes = (0, Logger_1.getLogTypesBitFlag)([
                        Logger_1.LogType.error,
                        Logger_1.LogType.warn,
                        Logger_1.LogType.info,
                        Logger_1.LogType.log,
                        Logger_1.LogType.group,
                        Logger_1.LogType.groupEnd,
                        Logger_1.LogType.groupCollapsed,
                        Logger_1.LogType.clear
                    ]);
                }
                else if (logging === "info") {
                    acceptedTypes = (0, Logger_1.getLogTypesBitFlag)([
                        Logger_1.LogType.error,
                        Logger_1.LogType.warn,
                        Logger_1.LogType.info
                    ]);
                }
                else if (logging === "warn") {
                    acceptedTypes = (0, Logger_1.getLogTypesBitFlag)([Logger_1.LogType.error, Logger_1.LogType.warn]);
                }
                else if (logging === "error") {
                    acceptedTypes = (0, Logger_1.getLogTypesBitFlag)([Logger_1.LogType.error]);
                }
                else {
                    acceptedTypes = (0, Logger_1.getLogTypesBitFlag)([]);
                }
                object.logging = {};
                const compilationLogging = compilation.logging;
                for (const { name, ...rest } of context
                    .getInner(compilation)
                    .getLogging(acceptedTypes)) {
                    const value = compilationLogging.get(name);
                    const entry = {
                        type: rest.type,
                        trace: rest.trace,
                        args: (_a = rest.args) !== null && _a !== void 0 ? _a : []
                    };
                    if (value) {
                        value.push(entry);
                    }
                    else {
                        compilationLogging.set(name, [entry]);
                    }
                }
                let depthInCollapsedGroup = 0;
                for (const [origin, logEntries] of compilationLogging) {
                    const debugMode = loggingDebug.some(fn => fn(origin));
                    if (logging === false && !debugMode)
                        continue;
                    const groupStack = [];
                    const rootList = [];
                    let currentList = rootList;
                    let processedLogEntries = 0;
                    for (const entry of logEntries) {
                        let type = entry.type;
                        const typeBitFlag = (0, Logger_1.getLogTypeBitFlag)(type);
                        if (!debugMode && (acceptedTypes & typeBitFlag) !== typeBitFlag)
                            continue;
                        // Expand groups in verbose and debug modes
                        if (type === Logger_1.LogType.groupCollapsed &&
                            (debugMode || collapsedGroups))
                            type = Logger_1.LogType.group;
                        if (depthInCollapsedGroup === 0) {
                            processedLogEntries++;
                        }
                        if (type === Logger_1.LogType.groupEnd) {
                            groupStack.pop();
                            if (groupStack.length > 0) {
                                currentList = groupStack[groupStack.length - 1].children;
                            }
                            else {
                                currentList = rootList;
                            }
                            if (depthInCollapsedGroup > 0)
                                depthInCollapsedGroup--;
                            continue;
                        }
                        const message = entry.args && entry.args.length > 0
                            ? util.format(entry.args[0], ...entry.args.slice(1))
                            : "";
                        const newEntry = {
                            type,
                            message,
                            trace: loggingTrace ? entry.trace : undefined,
                            children: type === Logger_1.LogType.group || type === Logger_1.LogType.groupCollapsed
                                ? []
                                : undefined
                        };
                        currentList.push(newEntry);
                        if (newEntry.children) {
                            groupStack.push(newEntry);
                            currentList = newEntry.children;
                            if (depthInCollapsedGroup > 0) {
                                depthInCollapsedGroup++;
                            }
                            else if (type === Logger_1.LogType.groupCollapsed) {
                                depthInCollapsedGroup = 1;
                            }
                        }
                    }
                    object.logging[origin] = {
                        entries: rootList,
                        filteredEntries: logEntries.length - processedLogEntries,
                        debug: debugMode
                    };
                }
            }
        },
        hash: (object, compilation, context) => {
            object.hash = context.getInner(compilation).getHash() || undefined;
        },
        version: object => {
            const { version, webpackVersion } = require("../../package.json");
            object.version = webpackVersion;
            object.rspackVersion = version;
        },
        env: (object, _compilation, _context, { _env }) => {
            object.env = _env;
        },
        timings: (object, compilation) => {
            object.time = compilation.endTime - compilation.startTime;
        },
        builtAt: (object, compilation) => {
            object.builtAt = compilation.endTime;
        },
        publicPath: (object, compilation) => {
            object.publicPath = compilation.getPath(compilation.outputOptions.publicPath || "");
        },
        outputPath: (object, compilation) => {
            object.outputPath = compilation.outputOptions.path;
        },
        assets: (object, compilation, context, options, factory) => {
            const { assets, assetsByChunkName } = context
                .getInner(compilation)
                .getAssets();
            object.assetsByChunkName = assetsByChunkName.reduce((acc, cur) => {
                acc[cur.name] = cur.files;
                return acc;
            }, {});
            const groupedAssets = factory.create(`${context.type}.assets`, assets, {
                ...context
                // compilationFileToChunks
                // compilationAuxiliaryFileToChunks
            });
            const limited = (0, statsFactoryUtils_1.spaceLimited)(groupedAssets, options.assetsSpace || Infinity);
            // object.filteredAssets = limited.filteredChildren;
            // const limited = spaceLimited(groupedAssets, options.assetsSpace);
            object.assets = limited.children;
        },
        chunks: (object, compilation, context, options, factory) => {
            const { type } = context;
            const chunks = context
                .getInner(compilation)
                .getChunks(options.chunkModules, options.chunkRelations, options.reasons, options.moduleAssets, options.nestedModules, options.source, options.usedExports, options.providedExports);
            object.chunks = factory.create(`${type}.chunks`, chunks, context);
        },
        modules: (object, compilation, context, options, factory) => {
            const { type } = context;
            const array = context
                .getInner(compilation)
                .getModules(options.reasons, options.moduleAssets, options.nestedModules, options.source, options.usedExports, options.providedExports);
            const groupedModules = factory.create(`${type}.modules`, array, context);
            const limited = (0, statsFactoryUtils_1.spaceLimited)(groupedModules, options.modulesSpace);
            object.modules = limited.children;
            object.filteredModules = limited.filteredChildren;
        },
        entrypoints: (object, compilation, context, _data, _factory) => {
            // const { type } = context;
            const array = context.getInner(compilation).getEntrypoints();
            // object.entrypoints = factory.create(
            // 	`${type}.entrypoints`,
            // 	array,
            // 	context
            // );
            object.entrypoints = array.reduce((acc, cur) => {
                acc[cur.name] = cur;
                return acc;
            }, {});
        },
        chunkGroups: (object, compilation, context, _options, factory) => {
            // const { type } = context;
            const namedChunkGroups = context
                .getInner(compilation)
                .getNamedChunkGroups();
            // object.namedChunkGroups = factory.create(
            // 	`${type}.namedChunkGroups`,
            // 	namedChunkGroups,
            // 	context
            // );
            object.namedChunkGroups = namedChunkGroups.reduce((acc, cur) => {
                acc[cur.name] = cur;
                return acc;
            }, {});
        },
        errors: (object, compilation, context, _options, _factory) => {
            const { cachedGetErrors } = context;
            object.errors = cachedGetErrors(compilation);
        },
        errorsCount: (object, compilation, { cachedGetErrors }) => {
            object.errorsCount = (0, statsFactoryUtils_1.countWithChildren)(compilation, c => cachedGetErrors(c));
        },
        warnings: (object, compilation, context, _options, _factory) => {
            const { cachedGetWarnings } = context;
            object.warnings = cachedGetWarnings(compilation);
        },
        warningsCount: (object, compilation, context) => {
            const { cachedGetWarnings } = context;
            object.warningsCount = (0, statsFactoryUtils_1.countWithChildren)(compilation, c => {
                return cachedGetWarnings(c);
            });
        },
        children: (object, compilation, context, _options, factory) => {
            const { type } = context;
            object.children = factory.create(`${type}.children`, compilation.children, context);
        }
    },
    asset: {
        _: (object, asset, context, options, factory) => {
            object.type = asset.type;
            object.name = asset.name;
            object.size = asset.size;
            object.emitted = asset.emitted;
            object.info = asset.info;
            Object.assign(object, factory.create(`${context.type}$visible`, asset, context));
        }
    },
    asset$visible: {
        _: (object, asset) => {
            object.chunkNames = asset.chunkNames;
        },
        ids: (object, asset) => {
            object.chunks = asset.chunks;
        }
    },
    module: {
        _: (object, module, context, options, factory) => {
            const { type } = context;
            object.type = module.type;
            object.moduleType = module.moduleType;
            object.size = module.size;
            Object.assign(object, factory.create(`${type}$visible`, module, context));
        }
    },
    module$visible: {
        _: (object, module, context, options, factory) => {
            const { type } = context;
            object.identifier = module.identifier;
            object.name = module.name;
            object.nameForCondition = module.nameForCondition;
            object.issuer = module.issuer;
            object.issuerName = module.issuerName;
            object.issuerPath = factory.create(`${type.slice(0, -8)}.issuerPath`, module.issuerPath, context);
            object.orphan = module.orphan;
            const profile = module.profile;
            if (profile) {
                object.profile = factory.create(`${type}.profile`, profile, context);
            }
        },
        ids: (object, module) => {
            object.id = module.id;
            object.issuerId = module.issuerId;
            object.chunks = module.chunks;
        },
        moduleAssets: (object, module) => {
            object.assets = module.assets;
        },
        reasons: (object, module, context, options, factory) => {
            const { type } = context;
            object.reasons = factory.create(`${type.slice(0, -8)}.reasons`, module.reasons, context);
        },
        source: (object, module) => {
            object.source = module.source;
        },
        usedExports: (object, module) => {
            if (typeof module.usedExports === "string") {
                if (module.usedExports === "null") {
                    object.usedExports = null;
                }
                else {
                    object.usedExports = module.usedExports === "true";
                }
            }
            else if (Array.isArray(module.usedExports)) {
                object.usedExports = module.usedExports;
            }
            else {
                object.usedExports = null;
            }
        },
        providedExports: (object, module) => {
            if (Array.isArray(module.providedExports)) {
                object.providedExports = module.providedExports;
            }
            else {
                object.providedExports = null;
            }
        },
        optimizationBailout: (object, module) => {
            object.optimizationBailout = module.optimizationBailout || null;
        }
    },
    profile: {
        _: (object, profile) => {
            const factory = (0, statsFactoryUtils_1.resolveStatsMillisecond)(profile.factory);
            const integration = (0, statsFactoryUtils_1.resolveStatsMillisecond)(profile.integration);
            const building = (0, statsFactoryUtils_1.resolveStatsMillisecond)(profile.building);
            const statsProfile = {
                total: factory + integration + building,
                resolving: factory,
                integration,
                building
            };
            Object.assign(object, statsProfile);
        }
    },
    moduleIssuer: {
        _: (object, module, context, options, factory) => {
            object.identifier = module.identifier;
            object.name = module.name;
        },
        ids: (object, module) => {
            object.id = module.id;
        }
    },
    moduleReason: {
        _: (object, reason) => {
            object.moduleIdentifier = reason.moduleIdentifier;
            object.moduleName = reason.moduleName;
            object.type = reason.type;
            object.userRequest = reason.userRequest;
        },
        ids: (object, reason) => {
            object.moduleId = reason.moduleId;
        }
    },
    chunk: {
        _: (object, chunk) => {
            object.type = chunk.type;
            object.initial = chunk.initial;
            object.entry = chunk.entry;
            object.size = chunk.size;
            object.names = chunk.names;
            object.files = chunk.files;
            object.auxiliaryFiles = chunk.auxiliaryFiles;
            object.childrenByOrder = chunk.childrenByOrder;
        },
        ids: (object, chunk) => {
            object.id = chunk.id;
        },
        chunkRelations: (object, chunk) => {
            object.siblings = chunk.siblings;
            object.parents = chunk.parents;
            object.children = chunk.children;
        },
        chunkModules: (object, chunk, context, options, factory) => {
            const { type } = context;
            object.modules = factory.create(`${type}.modules`, chunk.modules, context);
        }
    }
};
/**
 * only support below factories:
 * - compilation
 * - compilation.assets
 * - compilation.assets[].asset
 * - compilation.chunks
 * - compilation.chunks[].chunk
 * - compilation.modules
 * - compilation.modules[].module
 */
class DefaultStatsFactoryPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap("DefaultStatsFactoryPlugin", compilation => {
            compilation.hooks.statsFactory.tap("DefaultStatsFactoryPlugin", 
            // @ts-expect-error
            (stats, options, context) => {
                (0, statsFactoryUtils_1.iterateConfig)(SIMPLE_EXTRACTORS, options, (hookFor, fn) => {
                    stats.hooks.extract
                        .for(hookFor)
                        .tap("DefaultStatsFactoryPlugin", (obj, data, ctx) => fn(obj, data, ctx, options, stats));
                });
                // not support filter module.reasons.!orphanModules
                // iterateConfig(FILTER, options, (hookFor, fn) => {
                // 	stats.hooks.filter
                // 		.for(hookFor)
                // 		.tap("DefaultStatsFactoryPlugin", (item, ctx, idx, i) =>
                // 			fn(item, ctx, options, idx, i)
                // 		);
                // });
                (0, statsFactoryUtils_1.iterateConfig)(SORTERS, options, (hookFor, fn) => {
                    stats.hooks.sort
                        .for(hookFor)
                        .tap("DefaultStatsFactoryPlugin", (comparators, ctx) => fn(comparators, ctx, options));
                });
                (0, statsFactoryUtils_1.iterateConfig)(RESULT_SORTERS, options, (hookFor, fn) => {
                    stats.hooks.sortResults
                        .for(hookFor)
                        .tap("DefaultStatsFactoryPlugin", (comparators, ctx) => fn(comparators, ctx, options));
                });
                (0, statsFactoryUtils_1.iterateConfig)(RESULT_GROUPERS, options, (hookFor, fn) => {
                    stats.hooks.groupResults
                        .for(hookFor)
                        .tap("DefaultStatsFactoryPlugin", (groupConfigs, ctx) => fn(groupConfigs, ctx, options));
                });
                for (const key of Object.keys(ITEM_NAMES)) {
                    const itemName = ITEM_NAMES[key];
                    stats.hooks.getItemName
                        .for(key)
                        .tap("DefaultStatsFactoryPlugin", () => itemName);
                }
                // for (const key of Object.keys(MERGER)) {
                // 	const merger = MERGER[key];
                // 	stats.hooks.merge.for(key).tap("DefaultStatsFactoryPlugin", merger);
                // }
            });
        });
    }
}
exports.DefaultStatsFactoryPlugin = DefaultStatsFactoryPlugin;
