import { type Logger, logger } from '../compiled/rslog';
export declare const isDebug: () => boolean;
export declare const debug: (message: string | (() => string)) => void;
export { logger };
export type { Logger };
