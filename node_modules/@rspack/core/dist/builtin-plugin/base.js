"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.createBuiltinPlugin = exports.RspackBuiltinPlugin = exports.canInherentFromParent = exports.HOOKS_CAN_NOT_INHERENT_FROM_PARENT = void 0;
exports.HOOKS_CAN_NOT_INHERENT_FROM_PARENT = [
    "make",
    "compile",
    "emit",
    "afterEmit",
    "invalid",
    "done",
    "thisCompilation"
];
function canInherentFromParent(affectedHooks) {
    if (typeof affectedHooks === "undefined") {
        // this arm should be removed
        return false;
    }
    else {
        return !exports.HOOKS_CAN_NOT_INHERENT_FROM_PARENT.includes(affectedHooks);
    }
}
exports.canInherentFromParent = canInherentFromParent;
class RspackBuiltinPlugin {
    apply(compiler) {
        let raw = this.raw(compiler);
        if (raw) {
            raw.canInherentFromParent = canInherentFromParent(this.affectedHooks);
            compiler.__internal__registerBuiltinPlugin(raw);
        }
    }
}
exports.RspackBuiltinPlugin = RspackBuiltinPlugin;
function createBuiltinPlugin(name, options) {
    return {
        name: name,
        options: options !== null && options !== void 0 ? options : false // undefined or null will cause napi error, so false for fallback
    };
}
exports.createBuiltinPlugin = createBuiltinPlugin;
function create(name, resolve, 
// `affectedHooks` is used to inform `createChildCompile` about which builtin plugin can be reversed.
// However, this has a drawback as it doesn't represent the actual condition but merely serves as an indicator.
affectedHooks) {
    class Plugin extends RspackBuiltinPlugin {
        constructor(...args) {
            super();
            this.name = name;
            this.affectedHooks = affectedHooks;
            this._options = resolve(...args);
        }
        raw() {
            return createBuiltinPlugin(name, this._options);
        }
    }
    // Make the plugin class name consistent with webpack
    // https://stackoverflow.com/a/46132163
    Object.defineProperty(Plugin, "name", { value: name });
    return Plugin;
}
exports.create = create;
