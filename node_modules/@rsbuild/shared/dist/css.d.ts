import type { AcceptedPlugin } from 'postcss';
import type { CSSLoaderOptions, NormalizedConfig, PostCSSLoaderOptions, RsbuildTarget } from './types';
export declare const getCssModuleLocalIdentName: (config: NormalizedConfig, isProd: boolean) => string;
export declare const isInNodeModules: (path: string) => boolean;
export type CssLoaderModules = boolean | string | {
    auto: boolean | RegExp | ((filename: string) => boolean);
};
export declare const isCssModules: (filename: string, modules: CssLoaderModules) => boolean;
/**
 * Apply autoprefixer to the postcss plugins
 * Check if autoprefixer is already in the plugins, if not, add it
 */
export declare const applyAutoprefixer: (plugins: unknown[], browserslist: string[], config: NormalizedConfig) => Promise<AcceptedPlugin[]>;
export declare const getPostcssLoaderOptions: ({ browserslist, config, root, }: {
    browserslist: string[];
    config: NormalizedConfig;
    root: string;
}) => Promise<PostCSSLoaderOptions>;
export declare const normalizeCssLoaderOptions: (options: CSSLoaderOptions, exportOnlyLocals: boolean) => CSSLoaderOptions;
export declare const getCssLoaderOptions: ({ config, importLoaders, isServer, isWebWorker, localIdentName, }: {
    config: NormalizedConfig;
    importLoaders: number;
    isServer: boolean;
    isWebWorker: boolean;
    localIdentName: string;
}) => CSSLoaderOptions;
export declare const isUseCssExtract: (config: NormalizedConfig, target: RsbuildTarget) => boolean;
/**
 * fix resolve-url-loader can't deal with resolve.alias config
 *
 * reference: https://github.com/bholloway/resolve-url-loader/blob/e2695cde68f325f617825e168173df92236efb93/packages/resolve-url-loader/docs/advanced-features.md
 */
export declare const getResolveUrlJoinFn: () => Promise<any>;
