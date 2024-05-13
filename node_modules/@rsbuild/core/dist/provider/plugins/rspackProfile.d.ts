/// <reference types="node" />
import inspector from 'node:inspector';
import type { RsbuildPlugin } from '../../types';
export declare const stopProfiler: (output: string, profileSession?: inspector.Session) => void;
export declare const pluginRspackProfile: () => RsbuildPlugin;
