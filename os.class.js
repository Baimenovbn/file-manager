import os from "os";

export class OS {
    possibleCommands;

    constructor() {
        this.possibleCommands = new Set([
            '--EOL', '--cpus', '--homedir',
            '--username', '--architecture'
        ]);
    }

    handleCommand(command) {
        const option = command.split(' ')[1];
        if (this.possibleCommands.has(option)) {
            console.log(this[option.slice(2).trim()]());
        } else {
            console.error('Invalid input');
        }
    }

    username() {
        return os.userInfo().username;
    }

    EOL() {
        return JSON.stringify(os.EOL);
    }

    cpus() {
        console.log(`Overall amount of cpus = ${os.cpus().length}`);
        return os.cpus()
            .map((cpu) => ({
                model: cpu.model,
                clockRate: cpu.speed / 1000 + 'GHz',
            }));
    }

    homedir() {
        return os.homedir();
    }

    architecture() {
        return os.arch();
    }
}