import { type HtmlTag, type HtmlTagDescriptor, type ModifyHTMLTagsFn } from '@rsbuild/shared';
import type { Compiler } from '@rspack/core';
import type HtmlWebpackPlugin from 'html-webpack-plugin';
import type { HtmlTagObject } from 'html-webpack-plugin';
export type TagConfig = {
    tags?: HtmlTagDescriptor[];
    hash?: HtmlTag['hash'];
    append?: HtmlTag['append'];
    publicPath?: HtmlTag['publicPath'];
};
/** @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Void_element} */
export declare const VOID_TAGS: string[];
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head#see_also} */
export declare const HEAD_TAGS: string[];
export declare const FILE_ATTRS: {
    link: string;
    script: string;
};
export type HtmlInfo = {
    favicon?: string;
    tagConfig?: TagConfig;
    templateContent?: string;
};
export type HtmlBasicPluginOptions = Record<string, HtmlInfo>;
export type AlterAssetTagGroupsData = {
    headTags: HtmlTagObject[];
    bodyTags: HtmlTagObject[];
    outputName: string;
    publicPath: string;
    plugin: HtmlWebpackPlugin;
};
export declare const hasTitle: (html?: string) => boolean;
export declare class HtmlBasicPlugin {
    readonly name: string;
    readonly options: HtmlBasicPluginOptions;
    readonly modifyTagsFn: ModifyHTMLTagsFn;
    constructor(options: HtmlBasicPluginOptions, modifyTagsFn: ModifyHTMLTagsFn);
    apply(compiler: Compiler): void;
}
