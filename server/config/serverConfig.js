import minimist from 'minimist'

const argv = minimist(process.argv.slice(2));
const productionMode = argv.mode === 'production';

export const serverConfig =
    productionMode ?
        require('../production.server.config')
        :
        require('../development.server.config');