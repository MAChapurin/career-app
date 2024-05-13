import type { Compiler, IgnoreWarningsNormalized, RspackPluginInstance } from "../";
export default class IgnoreWarningsPlugin implements RspackPluginInstance {
    _ignorePattern: IgnoreWarningsNormalized;
    name: string;
    constructor(ignorePattern: IgnoreWarningsNormalized);
    apply(compiler: Compiler): void;
}
