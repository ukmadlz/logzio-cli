#! /usr/bin/env node
const Conf = require('conf');
const Fire = require('js-fire');
const debug = require('./helpers/debug');
// Commands 
const ConfigCommand = require('./commands/config');
const SearchCommand = require('./commands/search');
// Validators
const ScrollValidator = require('./validators/scroll');

// I command thee
const commands = {
    __description__: 'Interact with Logz.IO via the CLI',
    // Configure the API Token
    config: ConfigCommand,
    configure: ConfigCommand,
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
