import type { RawReactOptions } from "@rspack/binding";
declare function resolveReact(react: ReactOptions): RawReactOptions;
type ReactOptions = RawReactOptions | undefined;
export { resolveReact };
export type { ReactOptions };
