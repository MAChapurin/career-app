/// <reference types="node" />
/// <reference types="node" />
import type { IncomingMessage } from 'node:http';
import type { Socket } from 'node:net';
import { type DevConfig, type Stats } from '@rsbuild/shared';
import ws from '../../compiled/ws';
export declare class SocketServer {
    private wsServer;
    private readonly sockets;
    private readonly options;
    private stats?;
    private timer;
    constructor(options: DevConfig);
    upgrade(req: IncomingMessage, sock: Socket, head: any): void;
    prepare(): void;
    updateStats(stats: Stats): void;
    sockWrite(type: string, data?: Record<string, any> | string | boolean): void;
    singleWrite(socket: ws, type: string, data?: Record<string, any> | string | boolean): void;
    close(): void;
    private onConnect;
    private getStats;
    private sendStats;
    private send;
}
