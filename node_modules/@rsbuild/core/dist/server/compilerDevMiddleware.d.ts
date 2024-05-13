/// <reference types="node" />
/// <reference types="node" />
import type { IncomingMessage } from 'node:http';
import type { Socket } from 'node:net';
import type { DevMiddleware as CustomDevMiddleware, DevConfig, DevMiddlewareAPI, ServerConfig } from '@rsbuild/shared';
type Options = {
    publicPaths: string[];
    dev: DevConfig;
    server: ServerConfig;
    devMiddleware: CustomDevMiddleware;
};
/**
 * Setup compiler-related logic:
 * 1. setup webpack-dev-middleware
 * 2. establish webSocket connect
 */
export declare class CompilerDevMiddleware {
    middleware: DevMiddlewareAPI;
    private devConfig;
    private serverConfig;
    private devMiddleware;
    private publicPaths;
    private socketServer;
    constructor({ dev, server, devMiddleware, publicPaths }: Options);
    init(): void;
    upgrade(req: IncomingMessage, sock: Socket, head: any): void;
    close(): void;
    sockWrite(type: string, data?: Record<string, any> | string | boolean): void;
    private setupDevMiddleware;
}
export {};
