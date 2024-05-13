import { type InlineChunkTest } from '@rsbuild/shared';
import type { Compilation, Compiler } from '@rspack/core';
import type { HtmlTagObject } from 'html-webpack-plugin';
export type InlineChunkHtmlPluginOptions = {
    styleTests: InlineChunkTest[];
    scriptTests: InlineChunkTest[];
    distPath: {
        js?: string;
        css?: string;
    };
};
export declare class InlineChunkHtmlPlugin {
    name: string;
    styleTests: InlineChunkTest[];
    scriptTests: InlineChunkTest[];
    distPath: InlineChunkHtmlPluginOptions['distPath'];
    inlinedAssets: Set<string>;
    constructor({ styleTests, scriptTests, distPath, }: InlineChunkHtmlPluginOptions);
    /**
     * If we inlined the chunk to HTML,we should update the value of sourceMappingURL,
     * because the relative path of source code has been changed.
     * @param source
     */
    updateSourceMappingURL({ source, compilation, publicPath, type, }: {
        source: string;
        compilation: Compilation;
        publicPath: string;
        type: 'js' | 'css';
    }): string;
    matchTests(name: string, source: string, tests: InlineChunkTest[]): boolean;
    getInlinedScriptTag(publicPath: string, tag: HtmlTagObject, compilation: Compilation): HtmlTagObject | {
        tagName: string;
        innerHTML: string;
        attributes: {
            [x: string]: string | boolean | null | undefined;
        };
        closeTag: boolean;
    };
    getInlinedCSSTag(publicPath: string, tag: HtmlTagObject, compilation: Compilation): HtmlTagObject | {
        tagName: string;
        innerHTML: string;
        closeTag: boolean;
    };
    getInlinedTag(publicPath: string, tag: HtmlTagObject, compilation: Compilation): HtmlTagObject;
    apply(compiler: Compiler): void;
}
