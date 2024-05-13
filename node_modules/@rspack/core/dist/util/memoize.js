"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoizeValue = exports.memoizeFn = exports.memoize = void 0;
const memoize = (fn) => {
    let cache = false;
    // @ts-expect-error
    let result = undefined;
    return () => {
        if (cache) {
            // @ts-expect-error
            return result;
        }
        else {
            result = fn();
            cache = true;
            // Allow to clean up memory for fn
            // and all dependent resources
            // @ts-expect-error
            fn = undefined;
            return result;
        }
    };
};
exports.memoize = memoize;
// Lazily init a function, and cache it afterwards.
const memoizeFn = (fn) => {
    let cache = null;
    return (...args) => {
        if (!cache) {
            cache = fn();
        }
        return cache(...args);
    };
};
exports.memoizeFn = memoizeFn;
function memoizeValue(fn) {
    const getValue = (0, exports.memoize)(fn);
    return new Proxy({}, {
        get(_, property) {
            return getValue()[property];
        },
        set(_, property, newValue) {
            getValue()[property] = newValue;
            return true;
        },
        deleteProperty(_, property) {
            const value = getValue();
            return delete value[property];
        },
        has: (_, property) => {
            return property in getValue();
        },
        ownKeys: _ => {
            return Object.keys(getValue());
        },
        getOwnPropertyDescriptor(_, property) {
            return Object.getOwnPropertyDescriptor(getValue(), property);
        }
    });
}
exports.memoizeValue = memoizeValue;
