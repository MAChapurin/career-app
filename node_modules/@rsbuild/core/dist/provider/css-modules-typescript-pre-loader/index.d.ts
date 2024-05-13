import { type CssModules } from '@rsbuild/shared';
import type { LoaderContext } from '@rspack/core';
export default function (this: LoaderContext<{
    modules: Required<CssModules>;
    mode: string;
}>, content: string, ...input: any[]): Promise<any>;
