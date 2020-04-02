const Joi = require('@hapi/joi');
const ElasticsearchQuery = require('./elasticsearchquery');

module.exports = ElasticsearchQuery.append({
    aggs: Joi.object(),
});