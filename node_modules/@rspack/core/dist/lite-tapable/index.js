"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueriedHookMap = exports.HookMap = exports.AsyncSeriesBailHook = exports.AsyncSeriesHook = exports.AsyncParallelHook = exports.SyncBailHook = exports.SyncHook = exports.QueriedHook = exports.safeStage = exports.maxStage = exports.minStage = exports.Hook = void 0;
class Hook {
    constructor(args, name) {
        this.args = args;
        this.name = name;
        this.taps = [];
        this.interceptors = [];
    }
    intercept(interceptor) {
        this.interceptors.push(Object.assign({}, interceptor));
        if (interceptor.register) {
            for (let i = 0; i < this.taps.length; i++) {
                this.taps[i] = interceptor.register(this.taps[i]);
            }
        }
    }
    _runRegisterInterceptors(options) {
        for (const interceptor of this.interceptors) {
            if (interceptor.register) {
                const newOptions = interceptor.register(options);
                if (newOptions !== undefined) {
                    options = newOptions;
                }
            }
        }
        return options;
    }
    _runCallInterceptors(...args) {
        for (const interceptor of this.interceptors) {
            if (interceptor.call) {
                interceptor.call(...args);
            }
        }
    }
    _runErrorInterceptors(e) {
        for (const interceptor of this.interceptors) {
            if (interceptor.error) {
                interceptor.error(e);
            }
        }
    }
    _runTapInterceptors(tap) {
        for (const interceptor of this.interceptors) {
            if (interceptor.tap) {
                interceptor.tap(tap);
            }
        }
    }
    _runDoneInterceptors() {
        for (const interceptor of this.interceptors) {
            if (interceptor.done) {
                interceptor.done();
            }
        }
    }
    _runResultInterceptors(r) {
        for (const interceptor of this.interceptors) {
            if (interceptor.result) {
                interceptor.result(r);
            }
        }
    }
    isUsed() {
        return this.taps.length > 0 || this.interceptors.length > 0;
    }
    queryStageRange(stageRange) {
        return new QueriedHook(stageRange, this);
    }
    callAsyncStageRange(queried, ...args) {
        throw new Error("Hook should implement there own _callAsyncStageRange");
    }
    callAsync(...args) {
        return this.callAsyncStageRange(this.queryStageRange(allStageRange), ...args);
    }
    promiseStageRange(queried, ...args) {
        return new Promise((resolve, reject) => {
            this.callAsyncStageRange(queried, 
            // @ts-expect-error
            ...args, (e, r) => {
                if (e)
                    return reject(e);
                return resolve(r);
            });
        });
    }
    promise(...args) {
        return this.promiseStageRange(this.queryStageRange(allStageRange), ...args);
    }
    tap(options, fn) {
        this._tap("sync", options, fn);
    }
    _tap(type, options, fn) {
        if (typeof options === "string") {
            options = {
                name: options.trim()
            };
        }
        else if (typeof options !== "object" || options === null) {
            throw new Error("Invalid tap options");
        }
        if (typeof options.name !== "string" || options.name === "") {
            throw new Error("Missing name for tap");
        }
        let insert = Object.assign({ type, fn }, options);
        insert = this._runRegisterInterceptors(insert);
        this._insert(insert);
    }
    _insert(item) {
        let before;
        if (typeof item.before === "string") {
            before = new Set([item.before]);
        }
        else if (Array.isArray(item.before)) {
            before = new Set(item.before);
        }
        let stage = 0;
        if (typeof item.stage === "number") {
            stage = item.stage;
        }
        let i = this.taps.length;
        while (i > 0) {
            i--;
            const x = this.taps[i];
            this.taps[i + 1] = x;
            const xStage = x.stage || 0;
            if (before) {
                if (before.has(x.name)) {
                    before.delete(x.name);
                    continue;
                }
                if (before.size > 0) {
                    continue;
                }
            }
            if (xStage > stage) {
                continue;
            }
            i++;
            break;
        }
        this.taps[i] = item;
    }
}
exports.Hook = Hook;
exports.minStage = -Infinity;
exports.maxStage = Infinity;
const allStageRange = [exports.minStage, exports.maxStage];
const i32MIN = -(2 ** 31);
const i32MAX = 2 ** 31 - 1;
const safeStage = (stage) => {
    if (stage < i32MIN)
        return i32MIN;
    if (stage > i32MAX)
        return i32MAX;
    return stage;
};
exports.safeStage = safeStage;
class QueriedHook {
    constructor(stageRange, hook) {
        var _a;
        const tapsInRange = [];
        const [from, to] = stageRange;
        for (let tap of hook.taps) {
            const stage = (_a = tap.stage) !== null && _a !== void 0 ? _a : 0;
            if (from < stage && stage <= to) {
                tapsInRange.push(tap);
            }
            else if (from === exports.minStage && stage === exports.minStage) {
                tapsInRange.push(tap);
            }
        }
        this.stageRange = stageRange;
        this.hook = hook;
        this.tapsInRange = tapsInRange;
    }
    isUsed() {
        if (this.tapsInRange.length > 0)
            return true;
        if (this.stageRange[0] === exports.minStage &&
            this.hook.interceptors.some(i => i.call))
            return true;
        if (this.stageRange[1] === exports.maxStage &&
            this.hook.interceptors.some(i => i.done))
            return true;
        return false;
    }
    call(...args) {
        if (typeof this.hook.callStageRange !==
            "function") {
            throw new Error("hook is not a SyncHook, call methods only exists on SyncHook");
        }
        return this.hook.callStageRange(this, ...args);
    }
    callAsync(...args) {
        return this.hook.callAsyncStageRange(this, ...args);
    }
    promise(...args) {
        return this.hook.promiseStageRange(this, ...args);
    }
}
exports.QueriedHook = QueriedHook;
class SyncHook extends Hook {
    callAsyncStageRange(queried, ...args) {
        const { stageRange: [from, to], tapsInRange } = queried;
        const args2 = [...args];
        const cb = args2.pop();
        if (from === exports.minStage) {
            this._runCallInterceptors(...args2);
        }
        for (let tap of tapsInRange) {
            this._runTapInterceptors(tap);
            try {
                tap.fn(...args2);
            }
            catch (e) {
                const err = e;
                this._runErrorInterceptors(err);
                return cb(err);
            }
        }
        if (to === exports.maxStage) {
            this._runDoneInterceptors();
            cb(null);
        }
    }
    call(...args) {
        return this.callStageRange(this.queryStageRange(allStageRange), ...args);
    }
    callStageRange(queried, ...args) {
        let result, error;
        this.callAsyncStageRange(queried, 
        // @ts-expect-error
        ...args, (e, r) => {
            error = e;
            result = r;
        });
        if (error) {
            throw error;
        }
        return result;
    }
    tapAsync() {
        throw new Error("tapAsync is not supported on a SyncHook");
    }
    tapPromise() {
        throw new Error("tapPromise is not supported on a SyncHook");
    }
}
exports.SyncHook = SyncHook;
class SyncBailHook extends Hook {
    callAsyncStageRange(queried, ...args) {
        const { stageRange: [from, to], tapsInRange } = queried;
        const args2 = [...args];
        const cb = args2.pop();
        if (from === exports.minStage) {
            this._runCallInterceptors(...args2);
        }
        for (let tap of tapsInRange) {
            this._runTapInterceptors(tap);
            let r = undefined;
            try {
                r = tap.fn(...args2);
            }
            catch (e) {
                const err = e;
                this._runErrorInterceptors(err);
                return cb(err);
            }
            if (r !== undefined) {
                this._runResultInterceptors(r);
                return cb(null, r);
            }
        }
        if (to === exports.maxStage) {
            this._runDoneInterceptors();
            cb(null);
        }
    }
    call(...args) {
        return this.callStageRange(this.queryStageRange(allStageRange), ...args);
    }
    callStageRange(queried, ...args) {
        let result, error;
        this.callAsyncStageRange(queried, 
        // @ts-expect-error
        ...args, (e, r) => {
            error = e;
            result = r;
        });
        if (error) {
            throw error;
        }
        return result;
    }
    tapAsync() {
        throw new Error("tapAsync is not supported on a SyncBailHook");
    }
    tapPromise() {
        throw new Error("tapPromise is not supported on a SyncBailHook");
    }
}
exports.SyncBailHook = SyncBailHook;
class AsyncParallelHook extends Hook {
    callAsyncStageRange(queried, ...args) {
        const { stageRange: [from, to], tapsInRange } = queried;
        const args2 = [...args];
        const cb = args2.pop();
        if (from === exports.minStage) {
            this._runCallInterceptors(...args2);
        }
        const done = () => {
            this._runDoneInterceptors();
            cb(null);
        };
        const error = (e) => {
            this._runErrorInterceptors(e);
            cb(e);
        };
        if (tapsInRange.length === 0)
            return done();
        let counter = tapsInRange.length;
        for (let tap of tapsInRange) {
            this._runTapInterceptors(tap);
            if (tap.type === "promise") {
                const promise = tap.fn(...args2);
                if (!promise || !promise.then) {
                    throw new Error("Tap function (tapPromise) did not return promise (returned " +
                        promise +
                        ")");
                }
                promise.then(() => {
                    counter -= 1;
                    if (counter === 0) {
                        done();
                    }
                }, (e) => {
                    counter = 0;
                    error(e);
                });
            }
            else if (tap.type === "async") {
                tap.fn(...args2, (e) => {
                    if (e) {
                        counter = 0;
                        error(e);
                    }
                    else {
                        counter -= 1;
                        if (counter === 0) {
                            done();
                        }
                    }
                });
            }
            else {
                let hasError = false;
                try {
                    tap.fn(...args2);
                }
                catch (e) {
                    hasError = true;
                    counter = 0;
                    error(e);
                }
                if (!hasError && --counter === 0) {
                    done();
                }
            }
            if (counter <= 0)
                return;
        }
    }
    tapAsync(options, fn) {
        this._tap("async", options, fn);
    }
    tapPromise(options, fn) {
        this._tap("promise", options, fn);
    }
}
exports.AsyncParallelHook = AsyncParallelHook;
class AsyncSeriesHook extends Hook {
    callAsyncStageRange(queried, ...args) {
        const { stageRange: [from, to], tapsInRange } = queried;
        const args2 = [...args];
        const cb = args2.pop();
        if (from === exports.minStage) {
            this._runCallInterceptors(...args2);
        }
        const done = () => {
            this._runDoneInterceptors();
            cb(null);
        };
        const error = (e) => {
            this._runErrorInterceptors(e);
            cb(e);
        };
        if (tapsInRange.length === 0)
            return done();
        let index = 0;
        const next = () => {
            const tap = tapsInRange[index];
            this._runTapInterceptors(tap);
            if (tap.type === "promise") {
                const promise = tap.fn(...args2);
                if (!promise || !promise.then) {
                    throw new Error("Tap function (tapPromise) did not return promise (returned " +
                        promise +
                        ")");
                }
                promise.then(() => {
                    index += 1;
                    if (index === tapsInRange.length) {
                        done();
                    }
                    else {
                        next();
                    }
                }, (e) => {
                    index = tapsInRange.length;
                    error(e);
                });
            }
            else if (tap.type === "async") {
                tap.fn(...args2, (e) => {
                    if (e) {
                        index = tapsInRange.length;
                        error(e);
                    }
                    else {
                        index += 1;
                        if (index === tapsInRange.length) {
                            done();
                        }
                        else {
                            next();
                        }
                    }
                });
            }
            else {
                let hasError = false;
                try {
                    tap.fn(...args2);
                }
                catch (e) {
                    hasError = true;
                    index = tapsInRange.length;
                    error(e);
                }
                if (!hasError) {
                    index += 1;
                    if (index === tapsInRange.length) {
                        done();
                    }
                    else {
                        next();
                    }
                }
            }
            if (index === tapsInRange.length)
                return;
        };
        next();
    }
    tapAsync(options, fn) {
        this._tap("async", options, fn);
    }
    tapPromise(options, fn) {
        this._tap("promise", options, fn);
    }
}
exports.AsyncSeriesHook = AsyncSeriesHook;
class AsyncSeriesBailHook extends Hook {
    callAsyncStageRange(queried, ...args) {
        const { stageRange: [from, to], tapsInRange } = queried;
        const args2 = [...args];
        const cb = args2.pop();
        if (from === exports.minStage) {
            this._runCallInterceptors(...args2);
        }
        const done = () => {
            this._runDoneInterceptors();
            cb(null);
        };
        const error = (e) => {
            this._runErrorInterceptors(e);
            cb(e);
        };
        const result = (r) => {
            this._runResultInterceptors(r);
            cb(null, r);
        };
        if (tapsInRange.length === 0)
            return done();
        let index = 0;
        const next = () => {
            const tap = tapsInRange[index];
            this._runTapInterceptors(tap);
            if (tap.type === "promise") {
                const promise = tap.fn(...args2);
                if (!promise || !promise.then) {
                    throw new Error("Tap function (tapPromise) did not return promise (returned " +
                        promise +
                        ")");
                }
                promise.then((r) => {
                    index += 1;
                    if (r !== undefined) {
                        result(r);
                    }
                    else if (index === tapsInRange.length) {
                        done();
                    }
                    else {
                        next();
                    }
                }, (e) => {
                    index = tapsInRange.length;
                    error(e);
                });
            }
            else if (tap.type === "async") {
                tap.fn(...args2, (e, r) => {
                    if (e) {
                        index = tapsInRange.length;
                        error(e);
                    }
                    else {
                        index += 1;
                        if (r !== undefined) {
                            result(r);
                        }
                        else if (index === tapsInRange.length) {
                            done();
                        }
                        else {
                            next();
                        }
                    }
                });
            }
            else {
                let hasError = false;
                let r = undefined;
                try {
                    r = tap.fn(...args2);
                }
                catch (e) {
                    hasError = true;
                    index = tapsInRange.length;
                    error(e);
                }
                if (!hasError) {
                    index += 1;
                    if (r !== undefined) {
                        result(r);
                    }
                    else if (index === tapsInRange.length) {
                        done();
                    }
                    else {
                        next();
                    }
                }
            }
            if (index === tapsInRange.length)
                return;
        };
        next();
    }
    tapAsync(options, fn) {
        this._tap("async", options, fn);
    }
    tapPromise(options, fn) {
        this._tap("promise", options, fn);
    }
}
exports.AsyncSeriesBailHook = AsyncSeriesBailHook;
const defaultFactory = (key, hook) => hook;
class HookMap {
    constructor(factory, name) {
        this._map = new Map();
        this.name = name;
        this._factory = factory;
        this._interceptors = [];
    }
    get(key) {
        return this._map.get(key);
    }
    for(key) {
        const hook = this.get(key);
        if (hook !== undefined) {
            return hook;
        }
        let newHook = this._factory(key);
        const interceptors = this._interceptors;
        for (let i = 0; i < interceptors.length; i++) {
            const factory = interceptors[i].factory;
            if (factory) {
                newHook = factory(key, newHook);
            }
        }
        this._map.set(key, newHook);
        return newHook;
    }
    intercept(interceptor) {
        this._interceptors.push(Object.assign({
            factory: defaultFactory
        }, interceptor));
    }
    isUsed() {
        for (const key of this._map.keys()) {
            const hook = this.get(key);
            if (hook === null || hook === void 0 ? void 0 : hook.isUsed()) {
                return true;
            }
        }
        return false;
    }
    queryStageRange(stageRange) {
        return new QueriedHookMap(stageRange, this);
    }
}
exports.HookMap = HookMap;
class QueriedHookMap {
    constructor(stageRange, hookMap) {
        this.stageRange = stageRange;
        this.hookMap = hookMap;
    }
    get(key) {
        var _a;
        return (_a = this.hookMap.get(key)) === null || _a === void 0 ? void 0 : _a.queryStageRange(this.stageRange);
    }
    for(key) {
        return this.hookMap.for(key).queryStageRange(this.stageRange);
    }
    isUsed() {
        var _a;
        for (const key in this.hookMap._map.keys()) {
            if ((_a = this.get(key)) === null || _a === void 0 ? void 0 : _a.isUsed()) {
                return true;
            }
        }
        return false;
    }
}
exports.QueriedHookMap = QueriedHookMap;
