import type { RawRelayConfig } from "@rspack/binding";
type RelayOptions = boolean | RawRelayConfig | undefined;
declare function resolveRelay(relay: RelayOptions, rootDir: string): RawRelayConfig | undefined;
export { resolveRelay };
export type { RelayOptions };
