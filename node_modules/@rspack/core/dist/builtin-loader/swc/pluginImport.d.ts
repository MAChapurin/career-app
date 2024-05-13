import type { RawPluginImportConfig } from "@rspack/binding";
type PluginImportConfig = {
    libraryName: string;
    libraryDirectory?: string;
    customName?: string;
    customStyleName?: string;
    style?: string | boolean;
    styleLibraryDirectory?: string;
    camelToDashComponentName?: boolean;
    transformToDefaultImport?: boolean;
    ignoreEsComponent?: string[];
    ignoreStyleComponent?: string[];
};
type PluginImportOptions = PluginImportConfig[] | undefined;
declare function resolvePluginImport(pluginImport: PluginImportOptions): RawPluginImportConfig[] | undefined;
export { resolvePluginImport };
export type { PluginImportOptions };
