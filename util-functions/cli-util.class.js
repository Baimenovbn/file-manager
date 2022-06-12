import {InvalidInputError} from "../errors/invalid-input.error.js";

export class CliUtil {
    static possibleCommands = new Set([
        'up',
        'cd',
        'ls',
        'cat',
        'add',
        'rn',
        'cp',
        'mv',
        'rm',
        'os',
        'hash',
        'compress',
        'decompress',
    ]);

    static getCommand(expression) {
        const expressionValues = expression.split(' ');
        const command = expressionValues[0];
        if (!CliUtil.possibleCommands.has(command)) {
            throw new InvalidInputError();
        }

        return command;
    }
}

export const parseExpression = (expression) => {

}