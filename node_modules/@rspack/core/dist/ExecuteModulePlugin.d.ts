import type { Compiler } from "./Compiler";
export default class ExecuteModulePlugin {
    constructor();
    apply(compiler: Compiler): void;
}
