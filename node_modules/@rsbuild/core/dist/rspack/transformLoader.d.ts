import type { RspackSourceMap } from '@rsbuild/shared';
import type { LoaderContext } from '@rspack/core';
export default function transform(this: LoaderContext<{
    id: string;
}>, source: string, map?: string | RspackSourceMap): Promise<void>;
