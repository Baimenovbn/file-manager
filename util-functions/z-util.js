import { createBrotliCompress, createBrotliDecompress } from "zlib";
import {pipeline} from "stream";

import { OperationFailedError } from "../errors/operation-failed.error.js";

export function handleCompression(command, source, destination) {
    let transformer;

    if (command === 'compress') {
        transformer = createBrotliCompress();
    } else {
        transformer = createBrotliDecompress();
    }

    pipeline(
        source,
        transformer,
        destination,
        () => throw new OperationFailedError(),
    );
}


