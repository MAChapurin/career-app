"use strict";
/**
 * Based on [webpack/lib/NormalModuleReplacementPlugin.js]{@link https://github.com/webpack/webpack/blob/29cc4ead7eb6aafc3a5f6d0b10ce41d33d1ad874/lib/NormalModuleReplacementPlugin.js}
 * Licensed with [MIT License]{@link http://www.opensource.org/licenses/mit-license.php}
 * Original Author Tobias Koppers @sokra
 */
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
exports.NormalModuleReplacementPlugin = void 0;
const NodePath = __importStar(require("node:path"));
class NormalModuleReplacementPlugin {
    /**
     * @param {RegExp} resourceRegExp the resource matcher
     * @param {string|ModuleReplacer} newResource the resource replacement
     */
    constructor(resourceRegExp, newResource) {
        this.resourceRegExp = resourceRegExp;
        this.newResource = newResource;
    }
    apply(compiler) {
        const { resourceRegExp, newResource } = this;
        compiler.hooks.normalModuleFactory.tap("NormalModuleReplacementPlugin", nmf => {
            nmf.hooks.beforeResolve.tap("NormalModuleReplacementPlugin", result => {
                if (resourceRegExp.test(result.request)) {
                    if (typeof newResource === "function") {
                        newResource(result);
                    }
                    else {
                        result.request = newResource;
                    }
                }
            });
            nmf.hooks.afterResolve.tap("NormalModuleReplacementPlugin", result => {
                const createData = result.createData || {};
                if (resourceRegExp.test(createData.resource || "")) {
                    if (typeof newResource === "function") {
                        newResource(result);
                    }
                    else {
                        if (NodePath.posix.isAbsolute(newResource) ||
                            NodePath.win32.isAbsolute(newResource)) {
                            createData.resource = newResource;
                        }
                        else {
                            createData.resource = NodePath.join(NodePath.dirname(createData.resource || ""), newResource);
                        }
                    }
                }
            });
        });
    }
}
exports.NormalModuleReplacementPlugin = NormalModuleReplacementPlugin;
