const Axios = require('axios');
const Conf = require('conf');
const debug = require('./debug');

// Load the configs
const config = new Conf();

/**
 * Build the base URI for the API listener
 */
const apiBaseUri = () => {
    const confRegion = config.get('region');

    if (!confRegion) {
        debug.Debug.enable('logzio-cli:error');
        debug.error('Please configure the region for your Logz.IO account');
        process.exit(1);
    }

    const region = (confRegion !== 'us') ?
        `-${confRegion}` :
        '';
    return `https://api${region}.logz.io/v1`;
}


module.exports = Axios.create({
    baseURL: apiBaseUri(),
    responseType: 'json',
    headers: {
        'content-type': 'application/json',
        'X-API-TOKEN': config.get('API Token')
    },
});