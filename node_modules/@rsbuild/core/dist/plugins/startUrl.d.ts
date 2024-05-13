import type { RsbuildPlugin } from '../types';
/**
 * This method is modified based on source found in
 * https://github.com/facebook/create-react-app
 *
 * MIT Licensed
 * Copyright (c) 2015-present, Facebook, Inc.
 * https://github.com/facebook/create-react-app/blob/master/LICENSE
 */
export declare function openBrowser(url: string): Promise<boolean>;
export declare const replacePlaceholder: (url: string, port: number) => string;
export declare function pluginStartUrl(): RsbuildPlugin;
