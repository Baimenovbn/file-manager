export const smartSplit = (fullCommand) => {
    const commandEnd = fullCommand.indexOf(' ');
    const options = fullCommand.slice(commandEnd + 1);

    const args = [fullCommand.slice(0, commandEnd)];

    const charArr = options.split('');

    let currArg = '';

    for (let i = 0; i < charArr.length; i++) {
        const char = charArr[i];

        if (char === ' ') {
            continue;
        } else if (char === '"') {
            const nextDoubleQuote = options.indexOf('"');
            if (!nextDoubleQuote) {
                throw new OperationFailedError();
            }

            args.push(options.slice(i, nextDoubleQuote));
        } else {
            const nextSpace = options.indexOf(' ');
            if (!nextSpace) {
                throw new OperationFailedError();
            }

            args.push(options.slice(i, nextSpace));
        }

    }
}


// cd     fi/cvbrst "asd/a second"
// cd first "second"
// cd asd/sd/sad/a/ asdasdsa/asd asd asd
// cd "asdasd/asdasd" asdasd/asda asdasd
// command=initialStr.substring(+1
// if (cut[i] = ' ') {
//     if (cur[i+1] = '"') {
//         str2 = initialStr.substring(i+1);
//         str2.indexOf('"')
//
//     }
// }

//"fi/cvb rst" "fi/cvb rst"