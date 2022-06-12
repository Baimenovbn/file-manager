import fs from "fs/promises";
import { OperationFailedError } from "../errors/operation-failed.error.js";

export const validateArgPath = async (command) => {
    const pathToFile = command.slice(command.indexOf(' ') + 1);

    try {
        return await fs.stat(pathToFile);
    } catch (e) {
        throw new OperationFailedError();
    }
}

export const isFile = async (command) => {
    const stat = await validateArgPath(command);
    if (!stat.isFile()) {
        throw new OperationFailedError();
    }
}

export const isDir = async (command) => {
    const stat = await validateArgPath(command);
    if (!stat.isDirectory()) {
        throw new OperationFailedError();
    }
}
