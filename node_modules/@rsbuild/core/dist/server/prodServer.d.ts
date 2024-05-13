/// <reference types="node" />
import type { Server } from 'node:http';
import { type PreviewServerOptions, type RsbuildConfig, type ServerConfig, type StartServerResult } from '@rsbuild/shared';
import connect from '@rsbuild/shared/connect';
import type { InternalContext } from '../types';
type RsbuildProdServerOptions = {
    pwd: string;
    output: {
        path: string;
        assetPrefix?: string;
    };
    serverConfig: ServerConfig;
};
export declare class RsbuildProdServer {
    private app;
    private options;
    middlewares: connect.Server;
    constructor(options: RsbuildProdServerOptions);
    onInit(app: Server): Promise<void>;
    private applyDefaultMiddlewares;
    private applyStaticAssetMiddleware;
    close(): void;
}
export declare function startProdServer(context: InternalContext, rsbuildConfig: RsbuildConfig, { getPortSilently }?: PreviewServerOptions): Promise<StartServerResult>;
export {};
