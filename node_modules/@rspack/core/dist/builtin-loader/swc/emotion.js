"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveEmotion = void 0;
function resolveEmotion(emotion, isProduction) {
    var _a, _b, _c;
    if (!emotion) {
        return undefined;
    }
    if (emotion === true) {
        emotion = {};
    }
    const autoLabel = (_a = emotion === null || emotion === void 0 ? void 0 : emotion.autoLabel) !== null && _a !== void 0 ? _a : "dev-only";
    const emotionConfig = {
        enabled: true,
        // @ts-expect-error autoLabel is string for JavaScript interface, however is boolean for Rust interface
        autoLabel: autoLabel === "dev-only" ? !isProduction : autoLabel === "always",
        importMap: emotion === null || emotion === void 0 ? void 0 : emotion.importMap,
        labelFormat: (_b = emotion === null || emotion === void 0 ? void 0 : emotion.labelFormat) !== null && _b !== void 0 ? _b : "[local]",
        sourcemap: isProduction ? false : (_c = emotion === null || emotion === void 0 ? void 0 : emotion.sourceMap) !== null && _c !== void 0 ? _c : true
    };
    return emotionConfig;
}
exports.resolveEmotion = resolveEmotion;
