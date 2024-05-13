"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsFactory = void 0;
/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/tree/4b4ca3bb53f36a5b8fc6bc1bd976ed7af161bd80/lib/stats
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
const tapable_1 = require("tapable");
const comparators_1 = require("../util/comparators");
const smartGrouping_1 = require("../util/smartGrouping");
class StatsFactory {
    constructor() {
        this.hooks = Object.freeze({
            extract: new tapable_1.HookMap(() => new tapable_1.SyncBailHook([
                "object",
                "data",
                "context"
            ])),
            filter: new tapable_1.HookMap(() => new tapable_1.SyncBailHook(["item", "context", "index", "unfilteredIndex"])),
            sort: new tapable_1.HookMap(() => new tapable_1.SyncBailHook(["comparators", "context"])),
            filterSorted: new tapable_1.HookMap(() => new tapable_1.SyncBailHook(["item", "context", "index", "unfilteredIndex"])),
            groupResults: new tapable_1.HookMap(() => new tapable_1.SyncBailHook([
                "groupConfigs",
                "context"
            ])),
            sortResults: new tapable_1.HookMap(() => new tapable_1.SyncBailHook(["comparators", "context"])),
            filterResults: new tapable_1.HookMap(() => new tapable_1.SyncBailHook(["item", "context", "index", "unfilteredIndex"])),
            merge: new tapable_1.HookMap(() => new tapable_1.SyncBailHook([
                "items",
                "context"
            ])),
            result: new tapable_1.HookMap(() => new tapable_1.SyncWaterfallHook([
                "result",
                "context"
            ])),
            getItemName: new tapable_1.HookMap(() => new tapable_1.SyncBailHook([
                "item",
                "context"
            ])),
            getItemFactory: new tapable_1.HookMap(() => new tapable_1.SyncBailHook([
                "item",
                "context"
            ]))
        });
        const hooks = this.hooks;
        this._caches = Object.keys(hooks).reduce((prev, curr) => {
            return {
                ...prev,
                [curr]: new Map()
            };
        }, {});
        this._inCreate = false;
    }
    _getAllLevelHooks(hookMap, cache, type) {
        const cacheEntry = cache.get(type);
        if (cacheEntry !== undefined) {
            return cacheEntry;
        }
        const hooks = [];
        const typeParts = type.split(".");
        for (let i = 0; i < typeParts.length; i++) {
            const hook = hookMap.get(typeParts.slice(i).join("."));
            if (hook) {
                hooks.push(hook);
            }
        }
        cache.set(type, hooks);
        return hooks;
    }
    _forEachLevel(hookMap, cache, type, fn) {
        for (const hook of this._getAllLevelHooks(hookMap, cache, type)) {
            const result = fn(hook);
            if (result !== undefined)
                return result;
        }
    }
    _forEachLevelWaterfall(hookMap, cache, type, data, fn) {
        for (const hook of this._getAllLevelHooks(hookMap, cache, type)) {
            data = fn(hook, data);
        }
        return data;
    }
    _forEachLevelFilter(hookMap, cache, type, items, fn, forceClone) {
        const hooks = this._getAllLevelHooks(hookMap, cache, type);
        if (hooks.length === 0)
            return forceClone ? items.slice() : items;
        let i = 0;
        return items.filter((item, idx) => {
            for (const hook of hooks) {
                const r = fn(hook, item, idx, i);
                if (r !== undefined) {
                    if (r)
                        i++;
                    return r;
                }
            }
            i++;
            return true;
        });
    }
    create(type, data, baseContext) {
        if (this._inCreate) {
            return this._create(type, data, baseContext);
        }
        else {
            try {
                this._inCreate = true;
                return this._create(type, data, baseContext);
            }
            finally {
                for (const key of Object.keys(this._caches))
                    this._caches[key].clear();
                this._inCreate = false;
            }
        }
    }
    _create(type, data, baseContext) {
        const context = {
            ...baseContext,
            type,
            [type]: data
        };
        if (Array.isArray(data)) {
            // run filter on unsorted items
            const items = this._forEachLevelFilter(this.hooks.filter, this._caches.filter, type, data, (h, r, idx, i) => h.call(r, context, idx, i), true);
            // sort items
            const comparators = [];
            this._forEachLevel(this.hooks.sort, this._caches.sort, type, h => h.call(comparators, context));
            if (comparators.length > 0) {
                items.sort(
                // @ts-expect-error number of arguments is correct
                (0, comparators_1.concatComparators)(...comparators));
            }
            // run filter on sorted items
            const items2 = this._forEachLevelFilter(this.hooks.filterSorted, this._caches.filterSorted, type, items, (h, r, idx, i) => h.call(r, context, idx, i), false);
            // for each item
            let resultItems = items2.map((item, i) => {
                const itemContext = {
                    ...context,
                    _index: i
                };
                // run getItemName
                const itemName = this._forEachLevel(this.hooks.getItemName, this._caches.getItemName, `${type}[]`, h => h.call(item, itemContext));
                if (itemName)
                    itemContext[itemName] = item;
                const innerType = itemName ? `${type}[].${itemName}` : `${type}[]`;
                // run getItemFactory
                const itemFactory = this._forEachLevel(this.hooks.getItemFactory, this._caches.getItemFactory, innerType, h => h.call(item, itemContext)) || this;
                // run item factory
                return itemFactory.create(innerType, item, itemContext);
            });
            // sort result items
            const comparators2 = [];
            this._forEachLevel(this.hooks.sortResults, this._caches.sortResults, type, h => h.call(comparators2, context));
            if (comparators2.length > 0) {
                resultItems.sort(
                // @ts-expect-error number of arguments is correct
                (0, comparators_1.concatComparators)(...comparators2));
            }
            // group result items
            const groupConfigs = [];
            this._forEachLevel(this.hooks.groupResults, this._caches.groupResults, type, h => h.call(groupConfigs, context));
            if (groupConfigs.length > 0) {
                resultItems = (0, smartGrouping_1.smartGrouping)(resultItems, groupConfigs);
            }
            // run filter on sorted result items
            const finalResultItems = this._forEachLevelFilter(this.hooks.filterResults, this._caches.filterResults, type, resultItems, (h, r, idx, i) => h.call(r, context, idx, i), false);
            // run merge on mapped items
            let result = this._forEachLevel(this.hooks.merge, this._caches.merge, type, h => h.call(finalResultItems, context));
            if (result === undefined)
                result = finalResultItems;
            // run result on merged items
            return this._forEachLevelWaterfall(this.hooks.result, this._caches.result, type, result, (h, r) => h.call(r, context));
        }
        else {
            const object = {};
            // run extract on value
            this._forEachLevel(this.hooks.extract, this._caches.extract, type, h => h.call(object, data, context));
            // run result on extracted object
            return this._forEachLevelWaterfall(this.hooks.result, this._caches.result, type, object, (h, r) => h.call(r, context));
        }
    }
}
exports.StatsFactory = StatsFactory;
