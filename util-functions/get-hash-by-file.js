import crypto from "crypto";
import fs from 'fs/promises';

export const getHashByFile = async (pathToFile) => {
    const hash = crypto.createHash('sha256');

    const file = await fs.readFile(pathToFile);
    hash.update(file);
    return hash.digest('hex');
}