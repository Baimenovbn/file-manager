import path from "path";

export class FileSystem {
    _cwd;
    logger;

    constructor(cwd, logger) {
        this._cwd = cwd;
        this.logger = logger;
    }

    goUp() {

    }

    validatePath() {
        const upperDir = path.parse(this._cwd).dir;
        this.logDir();
    }

    logDir() {
        this.logger.logCwd(this._cwd);
    }
}