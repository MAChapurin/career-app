/**
 * This file is used to provide/set a global html-plugin singleton
 */
import type HtmlWebpackPlugin from 'html-webpack-plugin';
/**
 * This method is used to override the Rsbuild default html-plugin (html-rspack-plugin).
 */
export declare const setHTMLPlugin: (plugin: typeof HtmlWebpackPlugin) => void;
export declare const getHTMLPlugin: () => typeof HtmlWebpackPlugin;
