import { type RsbuildMode } from '@rsbuild/shared';
export type CommonOptions = {
    config?: string;
    envMode?: string;
    open?: boolean | string;
    host?: string;
    port?: number;
};
export type BuildOptions = CommonOptions & {
    watch?: boolean;
};
export type InspectOptions = CommonOptions & {
    env: RsbuildMode;
    output: string;
    verbose?: boolean;
};
export type DevOptions = CommonOptions;
export type PreviewOptions = CommonOptions;
export declare function runCli(): void;
