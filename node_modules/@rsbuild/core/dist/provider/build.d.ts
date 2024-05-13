import type { BuildOptions } from '@rsbuild/shared';
import { type InitConfigsOptions } from './initConfigs';
export declare const build: (initOptions: InitConfigsOptions, { mode, watch, compiler: customCompiler }?: BuildOptions) => Promise<void>;
