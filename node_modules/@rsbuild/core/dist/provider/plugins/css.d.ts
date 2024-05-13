import { type BundlerChain, type ModifyBundlerChainUtils, type RsbuildContext, type RspackRule } from '@rsbuild/shared';
import type { NormalizedConfig, RsbuildPlugin } from '../../types';
export declare const enableNativeCss: (config: NormalizedConfig) => boolean;
export declare function applyBaseCSSRule({ rule, config, context, utils: { target, isProd, isServer, isWebWorker, CHAIN_ID }, importLoaders, }: {
    rule: ReturnType<BundlerChain['module']['rule']>;
    config: NormalizedConfig;
    context: RsbuildContext;
    utils: ModifyBundlerChainUtils;
    importLoaders?: number;
}): Promise<void>;
/**
 * Use type: "css/module" rule instead of css-loader modules.auto config
 *
 * applyCSSModuleRule in modifyRspackConfig, so that other plugins can easily adjust css rule in Chain.
 */
export declare const applyCSSModuleRule: (rules: RspackRule[] | undefined, ruleTest: RegExp, config: NormalizedConfig) => void;
export declare const pluginCss: () => RsbuildPlugin;
