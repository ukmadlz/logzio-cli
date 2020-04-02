#! /usr/bin/env node
const Conf = require('conf');
const Fire = require('js-fire');
const Axios = require('axios');
const debug = require('./helpers/debug');
// Validators
const SearchValidator = require('./validators/search');
const ScrollValidator = require('./validators/scroll');

// Default logs on
debug.Debug.enable('logzio-cli:log');

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

const axios = Axios.create({
    baseURL: apiBaseUri(),
    responseType: 'json',
    headers: {
        'content-type': 'application/json',
        'X-API-TOKEN': config.get('API Token')
    },
});

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

const displayHits = (responseHits) => {
    const { total, max_score, hits } = responseHits;
    debug.log(`Total: %s`, total);
    debug.log(`Max Score: %s`, max_score);
    debug.log('Hits:')
    debug.log('-----');
    hits.forEach((hit) => {
        const { _index, _type, _id, _score, _source } = hit;
        debug.log('');
        debug.log(`  _index: %s`, _index);
        debug.log(`  _type: %s`, _type);
        debug.log(`  _id: %s`, _id);
        debug.log(`  _score: %s`, _score);
        debug.log(`  _source: %O`, _source);
    });
}

// I command thee
const commands = {
    __description__: 'Interact with Logz.IO via the CLI',
    // Configure the API Token
    config: configure,
    configure,
    // Basic Search
    search: (query, from, size, sort, _source, post_filter, aggs, dayOffset, accountIds) => {
        const data = {};
        if (query) data.query = (typeof query === 'object') ? query : JSON.parse(query);
        if (from) data.from = from;
        if (size) data.size = size;
        if (sort) data.sort = sort;
        if (_source) data._source = (''+_source).split(',');
        if (post_filter) data.post_filter = post_filter;
        if (aggs) data.aggs = aggs;
        const { error } = SearchValidator.validate(data);
        if (error) {
            debug.log('Please provide valid parts of a request');
            debug.error(error);
            process.exit(1);
        }
        const config = {
            params: {},
        };
        if (dayOffset) {
            config.params.dayOffset = dayOffset;
        }
        if (accountIds) {
            config.params.accountIds = accountIds.split(',');
        }
        return axios.post('/search', data, config)
            .then(response => {
                displayHits(response.data.hits);
            });
    },
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
