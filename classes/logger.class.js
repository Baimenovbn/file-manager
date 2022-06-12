export class Logger {
    username;

    constructor(username) {
        this.username = username;
    }

    greetByUsername() {
        console.log(`Welcome to the File Manager, ${this.username}!`)
    }

    thankByUsername() {
        console.log(`Thank you for using File Manager, ${this.username}!`)
    }

    logCwd(cwd) {
        console.log(`You are currently in ${cwd}`);
    }
}
