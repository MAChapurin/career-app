import { type DevMiddleware } from '@rsbuild/shared';
import type { Compiler, MultiCompiler } from '@rspack/core';
export declare const getDevMiddleware: (multiCompiler: Compiler | MultiCompiler) => NonNullable<DevMiddleware>;
