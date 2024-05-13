import { type BundlerType, type CreateRsbuildOptions, type NormalizedConfig, type RsbuildConfig, type RsbuildContext } from '@rsbuild/shared';
import type { InternalContext } from './types';
export declare function updateContextByNormalizedConfig(context: RsbuildContext, config: NormalizedConfig): void;
export declare function createPublicContext(context: RsbuildContext): Readonly<RsbuildContext>;
/**
 * Generate the actual context used in the build,
 * which can have a lot of overhead and take some side effects.
 */
export declare function createContext(options: Required<CreateRsbuildOptions>, userRsbuildConfig: RsbuildConfig, bundlerType: BundlerType): Promise<InternalContext>;
