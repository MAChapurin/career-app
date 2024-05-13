import type { Compiler } from '@rspack/core';
type AppIconOptions = {
    distDir: string;
    iconPath: string;
};
export declare class HtmlAppIconPlugin {
    readonly name: string;
    readonly distDir: string;
    readonly iconPath: string;
    constructor(options: AppIconOptions);
    apply(compiler: Compiler): void;
}
export {};
