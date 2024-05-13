"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThreadsafeNodeFSFromRaw = void 0;
const util_1 = __importDefault(require("util"));
const path_1 = require("path");
const memoize_1 = require("./util/memoize");
function createThreadsafeNodeFSFromRaw(fs) {
    let writeFile = (0, memoize_1.memoizeFn)(() => util_1.default.promisify(fs.writeFile.bind(fs)));
    let removeFile = (0, memoize_1.memoizeFn)(() => util_1.default.promisify(fs.unlink.bind(fs)));
    let mkdir = (0, memoize_1.memoizeFn)(() => util_1.default.promisify(fs.mkdir.bind(fs)));
    return {
        writeFile,
        removeFile,
        mkdir,
        mkdirp: dir => {
            return mkdir(dir, {
                recursive: true
            });
        },
        removeDirAll: dir => {
            // memfs don't support rmSync
            return rmrfBuild(fs)(dir);
        }
    };
}
exports.createThreadsafeNodeFSFromRaw = createThreadsafeNodeFSFromRaw;
const rmrfBuild = (fs) => {
    async function exists(path) {
        try {
            await util_1.default.promisify(fs.access.bind(fs))(path);
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    const rmrf = async (dir) => {
        if (await exists(dir)) {
            const files = await util_1.default.promisify(fs.readdir.bind(fs))(dir);
            await Promise.all(files
                .map(f => (0, path_1.join)(dir, f))
                .map(async (filePath) => {
                if ((await util_1.default.promisify(fs.lstat.bind(fs))(filePath)).isDirectory()) {
                    await rmrf(filePath);
                }
                else {
                    await util_1.default.promisify(fs.unlink.bind(fs))(filePath);
                }
            }));
            await util_1.default.promisify(fs.rmdir.bind(fs))(dir);
        }
    };
    return rmrf;
};
