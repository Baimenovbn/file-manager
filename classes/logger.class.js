import path from 'path';
import fs from 'fs/promises';

export class Logger {
    username;
    _cwd;

    constructor(username, cwd) {
        this.username = username;
        this._cwd = cwd;
    }

    greetByUsername() {
        console.log(`Welcome to the File Manager, ${this.username}!`)
    }

    thankByUsername() {
        console.log(`Thank you for using File Manager, ${this.username}!`)
    }

    logCwd() {
        console.log(`You are currently in ${this._cwd}`);
    }

    async setCwd(dir) {
        if (!path.isAbsolute(dir)) {
            dir = path.resolve(this._cwd, dir);
        }
        const normalized = path.normalize(dir);
        let stat;

        try {
            stat = await fs.stat(dir);
            if (stat.isFile()) {
                throw new Error();
            }
        } catch (e) {
            console.error('Operation failed');
            return;
        }

        this._cwd = normalized;
        this.logCwd();
    }

    getCwd() {
        return this._cwd;
    }
}
