import path from "path";
import fs from "fs/promises";
import syncFs from 'fs';
import {getHashByFile} from "./util-functions/get-hash-by-file.js";

export class Commander {
    logger;
    osHandler;

    constructor(logger, osHandler) {
        this.logger = logger;
        this.osHandler = osHandler;
    }

    handleCommand(command) {
        command = command.trim();
        if (command === '.exit') {
            this.logger.thankByUsername();
            process.exit(0);
        }

        if (command.startsWith('os')) {
            this.osHandler.handleCommand(command);
        } else if (command === 'up') {
            const upperDir = path.parse(this.logger.getCwd()).dir;
            this.logger.setCwd(upperDir);
        } else if (command.startsWith('cd')) {
            const path = command.split(' ').slice(1);
            this.logger.setCwd(path.join(' '));
        } else if (command === 'ls') {
            fs.readdir(this.logger.getCwd())
                .then(console.log);
        } else if (command.startsWith('hash')) {
            let pathToFile = command.slice(command.indexOf(' ') + 1);
            if (!path.isAbsolute(pathToFile)) {
                pathToFile = path.join(this.logger.getCwd().trim(), pathToFile);
            }
            getHashByFile(pathToFile).then(console.log);
        } else if (command.startsWith('cat')) {
            let pathToFile = command.slice(command.indexOf(' ') + 1);
            if (!path.isAbsolute(pathToFile)) {
                pathToFile = path.join(this.logger.getCwd().trim(), pathToFile);
            }
            const fileContentSource = syncFs.createReadStream(pathToFile);
            fileContentSource.setEncoding('utf-8');
            fileContentSource.on('data', console.log);
        } else {
            console.log('Invalid input');
        }
    }
}