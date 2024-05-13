import { type RequestHandler as Middleware, type ProxyDetail, type ProxyOptions, type UpgradeEvent } from '@rsbuild/shared';
export declare function formatProxyOptions(proxyOptions: ProxyOptions): ProxyDetail[];
export declare const createProxyMiddleware: (proxyOptions: ProxyOptions) => {
    middlewares: Middleware[];
    upgrade: UpgradeEvent;
};
