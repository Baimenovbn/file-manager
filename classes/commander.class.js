import path from "path";
import fs from "fs/promises";
import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from "zlib";

import {getHashByFile} from "../util-functions/get-hash-by-file.js";
import {CliUtil} from "../util-functions/cli-util.class.js";


export class Commander {
    logger;
    osHandler;
    classMap;

    constructor(logger, osHandler) {
        this.logger = logger;
        this.osHandler = osHandler;
        this.classMap = new Map().set('os', this.osHandler);
    }

    handleCommand(expression) {
        expression = expression.trim();

        this.checkForExitCommand(expression);
        const command = CliUtil.getCommand(expression);


        if (expression.startsWith('os')) {
            this.osHandler.handleExpression(expression);
        }

        else if (expression === 'up') {
            const upperDir = path.parse(this.logger.getCwd()).dir;
            this.logger.setCwd(upperDir);
        }

        else if (expression.startsWith('cd')) {
            const path = expression.split(' ').slice(1);
            this.logger.setCwd(path.join(' '));
        }

        else if (expression === 'ls') {
            fs.readdir(this.logger.getCwd())
                .then(console.log);
        }

        else if (expression.startsWith('hash')) {
            let pathToFile = expression.slice(expression.indexOf(' ') + 1);
            if (!path.isAbsolute(pathToFile)) {
                pathToFile = path.join(this.logger.getCwd().trim(), pathToFile);
            }
            getHashByFile(pathToFile).then(console.log);
        }

        else if (expression.startsWith('cat')) {
            let pathToFile = getFilePath(expression, this.logger.getCwd());

            const fileContentSource = createReadStream(pathToFile);
            fileContentSource.setEncoding('utf-8');
            fileContentSource.on('data', console.log);
        }

        else if (expression.startsWith('add')) {
            fs.writeFile(getFilePath(expression, this.logger.getCwd()), '').then();
        }

        else if (expression.startsWith('rn')) {
            const [oldPath, newPath]  = getFilePaths(expression, this.logger.getCwd());
            fs.rename(oldPath, newPath).then();
        }

        else if (expression.startsWith('mv')) {
            const [oldPath, newPath]  = getFilePaths(expression, this.logger.getCwd());
            fs.copyFile(oldPath, newPath)
                .then(() => fs.rm(oldPath));
        }

        else if (expression.startsWith('rm')) {
            fs.rm(getFilePath(expression, this.logger.getCwd())).then();
        }

        else if (expression.startsWith('compress')) {
            const [fileToCompress, destinationPath] = getFilePaths(expression, this.logger.getCwd());
            const compresser = createBrotliCompress();
            const source = createReadStream(fileToCompress);
            const destination = createWriteStream(destinationPath);

            pipeline(
                source,
                compresser,
                destination,
                (err) => console.error('Operation failed'),
            );
        }

        else if (expression.startsWith('decompress')) {
            const decompresser = createBrotliDecompress();
            const [fileToDecompress, destinationPath] = getFilePaths(expression, this.logger.getCwd());
            const source = createReadStream(fileToDecompress);
            const destination = createWriteStream(destinationPath);

            pipeline(
                source,
                decompresser,
                destination,
                (err) => console.error('Operation failed'),
            );
        }
    }

    checkForExitCommand(expression) {
        if (expression === '.exit') {
            this.logger.thankByUsername();
            process.exit(0);
        }
    }
}

function getFilePath(command, cwd) {
    let pathToFile = command.slice(command.indexOf(' ') + 1);
    return path.isAbsolute(pathToFile) ? pathToFile :  path.join(cwd, pathToFile);
}

function getFilePaths(command, cwd) {
    let paths = command.split(' ').slice(1);
    return paths.map((curPath) => path.isAbsolute(curPath) ? curPath : path.join(cwd, curPath));
}

function goUp() {

}
