export const getArgMap = () => {
    const keyValuePair = process.argv.slice(2).map((keyValue) => keyValue.split('='));

    return keyValuePair.reduce((argMap, keyValue) => argMap.set(keyValue[0].slice(2), keyValue[1]), new Map());
}