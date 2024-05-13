import { type CreateDevMiddlewareReturns, type CreateDevServerOptions, type RsbuildDevServer, type StartDevServerOptions } from '@rsbuild/shared';
import type { InternalContext } from '../types';
export declare function createDevServer<Options extends {
    context: InternalContext;
}>(options: Options, createDevMiddleware: (options: Options, compiler: StartDevServerOptions['compiler']) => Promise<CreateDevMiddlewareReturns>, { compiler: customCompiler, getPortSilently, runCompile, }?: CreateDevServerOptions): Promise<RsbuildDevServer>;
