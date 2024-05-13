import { JsCodegenerationResult, JsCodegenerationResults, JsCreateData, JsModule } from "@rspack/binding";
import { Source } from "webpack-sources";
export type ResourceData = {
    resource: string;
    path: string;
    query?: string;
    fragment?: string;
};
export type ResourceDataWithData = ResourceData & {
    data?: Record<string, any>;
};
export type CreateData = Partial<JsCreateData>;
export type ResolveData = {
    context: string;
    request: string;
    fileDependencies: string[];
    missingDependencies: string[];
    contextDependencies: string[];
    createData?: CreateData;
};
export declare class Module {
    #private;
    _originalSource?: Source;
    rawRequest?: string;
    static __from_binding(module: JsModule): Module;
    constructor(module: JsModule);
    get context(): string | undefined;
    get resource(): string | undefined;
    get originalSource(): Source | null;
    identifier(): string;
    nameForCondition(): string | null;
}
export declare class CodeGenerationResult {
    #private;
    constructor(result: JsCodegenerationResult);
    get(sourceType: string): string;
}
export declare class CodeGenerationResults {
    #private;
    constructor(result: JsCodegenerationResults);
}
