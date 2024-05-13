import { type ModifyChainUtils, type RsbuildTarget, type RspackConfig } from '@rsbuild/shared';
import type { InternalContext } from '../types';
export declare function getChainUtils(target: RsbuildTarget): ModifyChainUtils;
export declare function generateRspackConfig({ target, context, }: {
    target: RsbuildTarget;
    context: InternalContext;
}): Promise<RspackConfig>;
