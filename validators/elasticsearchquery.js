const Joi = require('@hapi/joi');

module.exports = Joi.object({
    query: Joi.object(),
    from: Joi.number().min(0),
    size: Joi.number(),
    sort: Joi.array().items(Joi.object()),
    _source: Joi.array().items(Joi.string()),
    post_filter: Joi.object(),
});