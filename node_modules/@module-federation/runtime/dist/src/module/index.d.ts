import { FederationHost } from '../core';
import { RemoteEntryExports, RemoteInfo } from '../type';
export type ModuleOptions = ConstructorParameters<typeof Module>[0];
declare class Module {
    remoteInfo: RemoteInfo;
    inited: boolean;
    remoteEntryExports?: RemoteEntryExports;
    lib: RemoteEntryExports | undefined;
    host: FederationHost;
    constructor({ remoteInfo, host, }: {
        remoteInfo: RemoteInfo;
        host: FederationHost;
    });
    getEntry(): Promise<RemoteEntryExports>;
    get(expose: string, options?: {
        loadFactory?: boolean;
    }): Promise<any>;
}
export { Module };
