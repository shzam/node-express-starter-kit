import yargs from 'yargs';

const options = yargs
    .options('n', {
        alias: 'name of module',
        describe: 'name of the module thats needed to seed'
    })
    .help(true).argv;
