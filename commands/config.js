const Conf = require('conf');

// Instance of conf
const conf = new Conf();

/**
 * Stores the token for reuse within the CLI
 *
 * @apiToken  {string} The API Token to use with Logz.IO
 */
module.exports = (apiToken, region = 'us') => {
    if (!apiToken) {
        debug.Debug.enable('logzio-cli:error');
        debug.error('Please provide a valid Logz.IO Access Token');
        process.exit(1);
    }
    debug.log('Config saved');
    config.set('API Token', apiToken);
    config.set('region', region);
}