"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IgnoreWarningsPlugin {
    constructor(ignorePattern) {
        this.name = "IgnoreWarningsPlugin";
        this._ignorePattern = ignorePattern;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(this.name, compilation => {
            compilation.hooks.processWarnings.tap(this.name, warnings => {
                return warnings.filter(warning => {
                    return !this._ignorePattern.some(ignore => ignore(warning, compilation));
                });
            });
        });
    }
}
exports.default = IgnoreWarningsPlugin;
