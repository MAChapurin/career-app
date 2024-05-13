import { type CssModuleLocalsConvention } from '@rsbuild/shared';
import type { AcceptedPlugin as PostCSSPlugin } from 'postcss';
export type PostcssParsePluginOptions = {
    exportLocalsConvention: CssModuleLocalsConvention;
    cssModuleKeys: string[];
};
declare const plugin: {
    (options: PostcssParsePluginOptions): PostCSSPlugin;
    postcss: boolean;
};
export default plugin;
