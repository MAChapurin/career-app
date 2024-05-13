/// <reference types="node" />
import type { JsAssetInfo, JsLoaderContext, RawModuleRuleUse, RawOptions } from "@rspack/binding";
import { ResolveRequest } from "enhanced-resolve";
import { Compiler } from "../Compiler";
import { Logger } from "../logging/Logger";
import Hash = require("../util/hash");
import { Mode, Resolve, RuleSetUseItem } from "./zod";
export interface ComposeJsUseOptions {
    devtool: RawOptions["devtool"];
    context: RawOptions["context"];
    mode: RawOptions["mode"];
    experiments: RawOptions["experiments"];
    compiler: Compiler;
}
export interface SourceMap {
    version: number;
    sources: string[];
    mappings: string;
    file?: string;
    sourceRoot?: string;
    sourcesContent?: string[];
    names?: string[];
}
export interface AdditionalData {
    [index: string]: any;
}
export interface LoaderObject {
    request: string;
    path: string;
    query: string;
    fragment: string;
    options: object | string | undefined;
    ident: string;
    normal: Function | undefined;
    pitch: Function | undefined;
    raw: boolean | undefined;
    data: object | undefined;
    pitchExecuted: boolean;
    normalExecuted: boolean;
}
export interface LoaderContext<OptionsType = {}> {
    version: 2;
    resource: string;
    resourcePath: string;
    resourceQuery: string;
    resourceFragment: string;
    async(): (err?: Error | null, content?: string | Buffer, sourceMap?: string | SourceMap, additionalData?: AdditionalData) => void;
    callback(err?: Error | null, content?: string | Buffer, sourceMap?: string | SourceMap, additionalData?: AdditionalData): void;
    cacheable(cacheable?: boolean): void;
    sourceMap: boolean;
    rootContext: string;
    context: string | null;
    loaderIndex: number;
    remainingRequest: string;
    currentRequest: string;
    previousRequest: string;
    request: string;
    /**
     * An array of all the loaders. It is writeable in the pitch phase.
     * loaders = [{request: string, path: string, query: string, module: function}]
     *
     * In the example:
     * [
     *   { request: "/abc/loader1.js?xyz",
     *     path: "/abc/loader1.js",
     *     query: "?xyz",
     *     module: [Function]
     *   },
     *   { request: "/abc/node_modules/loader2/index.js",
     *     path: "/abc/node_modules/loader2/index.js",
     *     query: "",
     *     module: [Function]
     *   }
     * ]
     */
    loaders: LoaderObject[];
    mode?: Mode;
    hot?: boolean;
    /**
     * @param schema To provide the best performance, Rspack does not perform the schema validation. If your loader requires schema validation, please call scheme-utils or zod on your own.
     */
    getOptions(schema?: any): OptionsType;
    resolve(context: string, request: string, callback: (arg0: null | Error, arg1?: string | false, arg2?: ResolveRequest) => void): void;
    getResolve(options: Resolve): (context: any, request: any, callback: any) => Promise<any>;
    getLogger(name: string): Logger;
    emitError(error: Error): void;
    emitWarning(warning: Error): void;
    emitFile(name: string, content: string | Buffer, sourceMap?: string, assetInfo?: JsAssetInfo): void;
    addDependency(file: string): void;
    dependency(file: string): void;
    addContextDependency(context: string): void;
    addMissingDependency(missing: string): void;
    clearDependencies(): void;
    getDependencies(): string[];
    getContextDependencies(): string[];
    getMissingDependencies(): string[];
    addBuildDependency(file: string): void;
    importModule(request: string, options: {
        publicPath?: string;
        baseUri?: string;
    }, callback: (err?: Error, res?: any) => void): void;
    fs: any;
    utils: {
        absolutify: (context: string, request: string) => string;
        contextify: (context: string, request: string) => string;
        createHash: (algorithm?: string) => Hash;
    };
    query: string | OptionsType;
    data: unknown;
    _compiler: Compiler;
    _compilation: Compiler["compilation"];
    /**
     * Internal field for interoperability.
     * Do not use this in anywhere else.
     *
     * @internal
     */
    __internal__context: JsLoaderContext;
    /**
     * Internal field for interoperability.
     * Do not use this in anywhere else.
     *
     * @internal
     */
    __internal__pushNativeDiagnostics: (diagnostics: any) => void;
}
export interface LoaderResult {
    cacheable: boolean;
    content: string | Buffer;
    sourceMap?: string | SourceMap;
    additionalData?: AdditionalData;
    fileDependencies: string[];
    contextDependencies: string[];
    missingDependencies: string[];
    buildDependencies: string[];
}
export interface LoaderDefinitionFunction<OptionsType = {}, ContextAdditions = {}> {
    (this: LoaderContext<OptionsType> & ContextAdditions, content: string, sourceMap?: string | SourceMap, additionalData?: AdditionalData): string | void | Buffer | Promise<string | Buffer>;
}
export interface PitchLoaderDefinitionFunction<OptionsType = {}, ContextAdditions = {}> {
    (this: LoaderContext<OptionsType> & ContextAdditions, remainingRequest: string, previousRequest: string, data: object): string | void | Buffer | Promise<string | Buffer>;
}
export type LoaderDefinition<OptionsType = {}, ContextAdditions = {}> = LoaderDefinitionFunction<OptionsType, ContextAdditions> & {
    raw?: false;
    pitch?: PitchLoaderDefinitionFunction;
};
export declare function createRawModuleRuleUses(uses: RuleSetUseItem | RuleSetUseItem[], path: string, options: ComposeJsUseOptions): RawModuleRuleUse[];
export declare function isUseSourceMap(devtool: RawOptions["devtool"]): boolean;
export declare function isUseSimpleSourceMap(devtool: RawOptions["devtool"]): boolean;
