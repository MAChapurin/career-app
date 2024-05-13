"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const d = (object, property, defaultValue) => {
    // TODO: should we also add default for null?
    if (typeof object[property] === "undefined" &&
        typeof defaultValue !== "undefined") {
        object[property] = defaultValue;
    }
    return object[property];
};
function normalizeOptions(options) {
    d(options, "exclude", /node_modules/i);
    d(options, "include", /\.([cm]js|[jt]sx?|flow)$/i);
    d(options, "library");
    d(options, "forceEnable", false);
    return options;
}
exports.normalizeOptions = normalizeOptions;
