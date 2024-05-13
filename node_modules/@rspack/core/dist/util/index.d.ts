/// <reference types="node" />
import type { JsAssetInfo, JsStatsError } from "@rspack/binding";
import { AssetInfo } from "../Compilation";
import { LoaderObject } from "../config/adapterRuleUse";
export declare function mapValues(record: Record<string, string>, fn: (key: string) => string): {
    [k: string]: string;
};
export declare function isNil(value: unknown): value is null | undefined;
export declare const toBuffer: (bufLike: string | Buffer) => Buffer;
export declare const toObject: (input: string | Buffer | object) => object;
export declare function serializeObject(map: string | object | undefined | null): Buffer | undefined;
export declare function isPromiseLike(value: unknown): value is Promise<any>;
export declare function isJsStatsError(err: any): err is JsStatsError;
export declare function concatErrorMsgAndStack(err: Error | JsStatsError): string;
export declare function indent(str: string, prefix: string): string;
export declare function stringifyLoaderObject(o: LoaderObject): string;
export declare function asArray<T>(item: T[]): T[];
export declare function asArray<T>(item: readonly T[]): readonly T[];
export declare function asArray<T>(item: T): T[];
export declare function toJsAssetInfo(info?: AssetInfo): JsAssetInfo;
export declare const deprecatedWarn: (content: string, enable?: boolean) => void;
