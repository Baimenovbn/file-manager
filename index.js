import os from 'os';

import { getArgMap } from "./get-arg-map.js";
import { Logger } from "./logger.class.js";
import { App } from "./app.class.js";

const main = () => {
    const username = getArgMap().get('username');
    const logger = new Logger(username, os.homedir());
    const app = new App(logger);
    app.initApp();
    app.initOnAppDestroyHandler();
}

main();
