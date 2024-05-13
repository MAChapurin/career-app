import { rspack as rspackFn } from "./rspack";
import * as rspackExports from "./exports";
type Rspack = typeof rspackFn & typeof rspackExports & {
    rspack: Rspack;
    webpack: Rspack;
};
declare const rspack: Rspack;
export * from "./exports";
export { rspack };
