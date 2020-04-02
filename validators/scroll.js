const Joi = require('@hapi/joi');
const ElasticsearchQuery = require('./elasticsearchquery');

module.exports = ElasticsearchQuery.append({
    scroll: Joi.string(),
});