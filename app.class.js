import {Commander} from "./commander.js";
import {OS} from "./os.class.js";

export class App {
    logger;

    constructor(logger) {
        this.logger = logger;
    }

    initApp() {
        this.logger.greetByUsername();
        this.logger.logCwd();
        const osHandler = new OS();
        const commander = new Commander(this.logger, osHandler);

        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', (command) => commander.handleCommand(command));
    }

    initOnAppDestroyHandler() {
        process.on('SIGINT', () => {
            this.logger.thankByUsername();
            process.exit(0);
        });
    }
}