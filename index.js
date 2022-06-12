import os from 'os';

import { getArgMap } from "./util-functions/get-arg-map.js";
import { Logger } from "./classes/logger.class.js";
import { App } from "./classes/app.class.js";
import {FileSystem} from "./classes/file-system.class.js";

const main = () => {
    const username = getArgMap().get('username');
    const logger = new Logger(username);
    const fileSystem = new FileSystem(os.homedir(), logger);
    const app = new App(logger, fileSystem);
    app.initApp();
    app.initOnAppDestroyHandler();
}

main();
