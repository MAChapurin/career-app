import { type CreateDevMiddlewareReturns, type RspackCompiler, type RspackConfig, type RspackMultiCompiler } from '@rsbuild/shared';
import type { InternalContext } from '../types';
import { type InitConfigsOptions } from './initConfigs';
export declare function createCompiler({ context, rspackConfigs, }: {
    context: InternalContext;
    rspackConfigs: RspackConfig[];
}): Promise<RspackCompiler | RspackMultiCompiler>;
export declare function createDevMiddleware(options: InitConfigsOptions, customCompiler?: RspackCompiler | RspackMultiCompiler): Promise<CreateDevMiddlewareReturns>;
