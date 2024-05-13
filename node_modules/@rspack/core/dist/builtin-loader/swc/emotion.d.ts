type EmotionConfigImportMap = {
    [packageName: string]: {
        [exportName: string]: {
            canonicalImport?: [string, string];
        };
    };
};
type EmotionConfig = {
    sourceMap?: boolean;
    autoLabel?: "never" | "dev-only" | "always";
    labelFormat?: string;
    importMap?: EmotionConfigImportMap;
};
type EmotionOptions = boolean | EmotionConfig | undefined;
declare function resolveEmotion(emotion: EmotionOptions, isProduction: boolean): EmotionConfig | undefined;
export { resolveEmotion };
export type { EmotionOptions };
