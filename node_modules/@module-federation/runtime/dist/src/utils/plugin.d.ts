import { FederationHost } from '../core';
import { UserOptions } from '../type';
import { Module } from '../module';
export declare function registerPlugins(plugins: UserOptions['plugins'], hookInstances: Array<FederationHost['hooks'] | FederationHost['snapshotHandler']['hooks'] | Module['host']['loaderHook']>): import("../type").FederationRuntimePlugin[] | undefined;
