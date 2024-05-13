"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveRelay = void 0;
const path_1 = __importDefault(require("path"));
function getRelayConfigFromProject(rootDir) {
    for (const configName of [
        "relay.config.json",
        "relay.config.js",
        "package.json"
    ]) {
        const configPath = path_1.default.join(rootDir, configName);
        try {
            let config = require(configPath);
            let finalConfig;
            if (configName === "package.json") {
                finalConfig = config === null || config === void 0 ? void 0 : config.relay;
            }
            else {
                finalConfig = config;
            }
            if (finalConfig) {
                return {
                    language: finalConfig.language,
                    artifactDirectory: finalConfig.artifactDirectory
                };
            }
        }
        catch (_) { }
    }
}
function resolveRelay(relay, rootDir) {
    if (!relay) {
        return undefined;
    }
    // Search relay config based on
    if (relay === true) {
        return (getRelayConfigFromProject(rootDir) || {
            language: "javascript"
        });
    }
    else {
        return relay;
    }
}
exports.resolveRelay = resolveRelay;
