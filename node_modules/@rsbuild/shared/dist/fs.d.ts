import fse from '../compiled/fs-extra';
import type { DistPathConfig, FilenameConfig, NormalizedConfig, RsbuildConfig } from './types';
export { fse };
export declare const getDistPath: (config: RsbuildConfig | NormalizedConfig, type: keyof DistPathConfig) => string;
export declare function isFileExists(file: string): Promise<boolean>;
export declare const isFileSync: (filePath: string) => boolean | undefined;
/**
 * Find first already exists file.
 * @param files - Absolute file paths with extension.
 * @returns The file path if exists, or false if no file exists.
 */
export declare const findExists: (files: string[]) => string | false;
export declare const getFilename: (config: NormalizedConfig, type: keyof FilenameConfig, isProd: boolean) => string;
export declare function findUp({ filename, cwd, }: {
    filename: string;
    cwd?: string;
}): Promise<string | undefined>;
