import type { HtmlConfig, ModifyHTMLTagsFn, NormalizedConfig } from '@rsbuild/shared';
import type { RsbuildPlugin } from '../types';
export declare function getTitle(entryName: string, config: NormalizedConfig): string;
export declare function getInject(entryName: string, config: NormalizedConfig): import("@rsbuild/shared").ScriptInject;
export declare function getTemplate(entryName: string, config: NormalizedConfig, rootPath: string): Promise<{
    templatePath: string;
    templateContent?: string;
}>;
export declare function getFavicon(entryName: string, config: {
    html: HtmlConfig;
}): string;
export declare function getMetaTags(entryName: string, config: {
    html: HtmlConfig;
}, templateContent?: string): import("@rsbuild/shared").MetaOptions;
export declare const pluginHtml: (modifyTagsFn: ModifyHTMLTagsFn) => RsbuildPlugin;
