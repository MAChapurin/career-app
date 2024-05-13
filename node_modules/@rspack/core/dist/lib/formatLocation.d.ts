export = formatLocation;
/**
 * @param {DependencyLocation} loc location
 * @returns {string} formatted location
 */
declare function formatLocation(loc: DependencyLocation): string;
declare namespace formatLocation {
    export { DependencyLocation, SourcePosition };
}
type DependencyLocation = any;
type SourcePosition = any;
