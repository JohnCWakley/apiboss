module.exports = function ArgsParser(argv) {
    let args = {};

    for (let i = 0; i < argv.length; i++) {
        let a = argv[i];

        if (a.startsWith('--')) {
            a = a.slice(a.lastIndexOf('-') + 1).split('=');

            if (a.length == 2) {
                args[a[0]] = a[1];
            }
        }
    }

    return args;
}