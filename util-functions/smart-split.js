let smartSplit = (fullCommand) => {
    const commandEnd = fullCommand.indexOf(' ');
    let options = fullCommand.slice(commandEnd + 1);

    const args = [fullCommand.slice(0, commandEnd)];

    const charArr = options.split('');

    let currArg = '';

    for (let i = 0; i < options.length; i++) {
        const char = options[i];
        options = options.slice(i + 1);
        if (char === '"') {
            const nextDoubleQuote = options.indexOf('"', );
            console.log(`k=${options.slice(i, nextDoubleQuote)}`);
            args.push(options.slice(i, nextDoubleQuote));
            i = nextDoubleQuote + 2;
        } else {
            let nextSpace = options.indexOf(' ');
            if (nextSpace === -1) {
                nextSpace = options.length - 1;
            }
            console.log(i, 'space', nextSpace);
            let k = options.slice(i, nextSpace);
            console.log("k2="+k);
            args.push(options.slice(i, nextSpace));
            if (!nextSpace) {
                i = charArr.length-1;
            } else {
                i = nextSpace;
            }
        }
    }
}

smartSplit('cd "aaaa/bbbb ccc" ddd/eeee/ffff');
