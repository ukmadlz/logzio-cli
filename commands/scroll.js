const ScrollValidator = require('../validators/scroll');
const axios = require('../helpers/axios');
const debug = require('../helpers/debug');
const displayHits = require('../helpers/displayHits');

module.exports = (query, from, size, sort, _source, post_filter, scroll, scrollId) => {
    const data = {};
    if (query) data.query = (typeof query === 'object') ? query : JSON.parse(query);
    if (from) data.from = from;
    if (size) data.size = size;
    if (sort) data.sort = sort;
    if (_source) data._source = (''+_source).split(',');
    if (post_filter) data.post_filter = post_filter;
    const { error } = ScrollValidator.validate(data);

    if (error) {
        console.log('Please provide valid parts of a request');
        debug.error(error);
        process.exit(1);
    }
    const config = {};
    return axios.post('/scroll', data, config)
        .then(response => {
            const { scrollId, hits } = response.data;
            console.log('Scroll ID: %s', scrollId);
            displayHits(JSON.parse(hits));
        });
}