export type PluginOptions = {
    include?: string | RegExp | (string | RegExp)[] | null;
    exclude?: string | RegExp | (string | RegExp)[] | null;
    library?: string;
    forceEnable?: boolean;
};
export declare function normalizeOptions(options: PluginOptions): PluginOptions;
