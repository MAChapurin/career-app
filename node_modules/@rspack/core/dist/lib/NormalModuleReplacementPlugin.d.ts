/**
 * Based on [webpack/lib/NormalModuleReplacementPlugin.js]{@link https://github.com/webpack/webpack/blob/29cc4ead7eb6aafc3a5f6d0b10ce41d33d1ad874/lib/NormalModuleReplacementPlugin.js}
 * Licensed with [MIT License]{@link http://www.opensource.org/licenses/mit-license.php}
 * Original Author Tobias Koppers @sokra
 */
import { Compiler } from "../Compiler";
import { ResolveData } from "../Module";
type ModuleReplacer = (createData: ResolveData) => void;
export declare class NormalModuleReplacementPlugin {
    readonly resourceRegExp: RegExp;
    readonly newResource: string | ModuleReplacer;
    /**
     * @param {RegExp} resourceRegExp the resource matcher
     * @param {string|ModuleReplacer} newResource the resource replacement
     */
    constructor(resourceRegExp: RegExp, newResource: string | ModuleReplacer);
    apply(compiler: Compiler): void;
}
export {};
