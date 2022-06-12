import path from "path";
import fs from "fs/promises";
import {OperationFailedError} from "../errors/operation-failed.error.js";
import {InvalidInputError} from "../errors/invalid-input.error.js";

export class FileSystem {
    _cwd;
    logger;

    constructor(cwd, logger) {
        this._cwd = cwd;
        this.logger = logger;
    }

    up() {
        this._cwd = path.parse(this._cwd).dir;
        this.logDir();
    }

    async throwIfInvalidPath(path) {
        try {
            return await fs.stat(path);
        } catch (e) {
            throw new OperationFailedError();
        }
    }

    logDir() {
        this.logger.logCwd(this._cwd);
    }

    async setCwd(dir) {
        if (!path.isAbsolute(dir)) {
            dir = path.join(this._cwd, dir);
        }
        const normalized = path.normalize(dir);
        const stat = await this.throwIfInvalidPath(normalized)

        if (stat.isFile()) {
            throw new InvalidInputError();
        }

        this._cwd = normalized;
        this.logDir();
    }

    getCwd() {
        return this._cwd;
    }
}