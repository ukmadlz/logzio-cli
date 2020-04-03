#! /usr/bin/env node
const Conf = require('conf');
const Fire = require('js-fire');
const debug = require('./helpers/debug');
// Commands 
const SearchCommand = require('./commands/search');
// Validators
const ScrollValidator = require('./validators/scroll');

/**
 * Stores the token for reuse within the CLI
 *
 * @apiToken  {string} The API Token to use with Logz.IO
 */
const configure = (apiToken, region = 'us') => {
    if (!apiToken) {
        debug.Debug.enable('logzio-cli:error');
        debug.error('Please provide a valid Logz.IO Access Token');
        process.exit(1);
    }
    debug.log('Config saved');
    config.set('API Token', apiToken);
    config.set('region', region);
}

// I command thee
const commands = {
    __description__: 'Interact with Logz.IO via the CLI',
    // Configure the API Token
    config: configure,
    configure,
    // Basic Search
    search: SearchCommand,
    // Scroll
    // scroll: (query, from, size, sort, _source, post_filter, scroll, scrollId) => {
    //     const data = {};
    //     if (query) data.query = (typeof query === 'object') ? query : JSON.parse(query);
    //     if (from) data.from = from;
    //     if (size) data.size = size;
    //     if (sort) data.sort = sort;
    //     if (_source) data._source = (''+_source).split(',');
    //     if (post_filter) data.post_filter = post_filter;
    //     const { error } = ScrollValidator.validate(data);

    //     if (error) {
    //         debug.log('Please provide valid parts of a request');
    //         debug.error(error);
    //         process.exit(1);
    //     }
    //     const config = {};
    //     return axios.post('/scroll', data, config)
    //         .then(response => {
    //             const { scrollId, hits } = response.data;
    //             debug.log('Scroll ID: %s', scrollId);
    //             displayHits(JSON.parse(hits));
    //         });
    // }
}

Fire(commands);
