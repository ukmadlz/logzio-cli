const SearchValidator = require('../validators/search');
const axios = require('../helpers/axios');
const displayHits = require('../helpers/displayHits');

module.exports = (query, from, size, sort, _source, post_filter, aggs, dayOffset, accountIds) => {
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
        debug.log('Please provide valid parts of a search request');
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
}