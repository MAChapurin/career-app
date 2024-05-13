import type { RawCssExtractPluginOption } from "@rspack/binding";
import { Compiler } from "../..";
export * from "./loader";
export interface PluginOptions {
    filename?: string;
    chunkFilename?: string;
    ignoreOrder?: boolean;
    insert?: string | ((linkTag: HTMLLinkElement) => void);
    attributes?: Record<string, string>;
    linkType?: string | "text/css" | false;
    runtime?: boolean;
    pathinfo?: boolean;
}
export declare class CssExtractRspackPlugin {
    static pluginName: string;
    static loader: string;
    options: PluginOptions;
    constructor(options?: PluginOptions);
    apply(compiler: Compiler): void;
    normalizeOptions(options: PluginOptions): RawCssExtractPluginOption;
}
export default CssExtractRspackPlugin;
