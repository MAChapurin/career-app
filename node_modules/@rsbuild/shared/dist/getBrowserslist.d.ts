import type { OverrideBrowserslist, RsbuildTarget } from './types';
export declare function getBrowserslist(path: string): Promise<string[] | null>;
export declare function getBrowserslistWithDefault(path: string, config: {
    output?: {
        overrideBrowserslist?: OverrideBrowserslist;
    };
}, target: RsbuildTarget): Promise<string[]>;
declare enum ESVersion {
    es5 = 5,
    es2015 = 2015,
    es2016 = 2016,
    es2017 = 2017,
    es2018 = 2018
}
export declare function browserslistToESVersion(browsers: string[]): ESVersion;
export {};
