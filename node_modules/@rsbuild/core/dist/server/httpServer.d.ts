/// <reference types="node" />
/// <reference types="node" />
import type { ServerConfig } from '@rsbuild/shared';
import type connect from '@rsbuild/shared/connect';
export declare const createHttpServer: (options: {
    https?: ServerConfig['https'];
    middlewares: connect.Server;
}) => Promise<import("https").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse> | import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>;
