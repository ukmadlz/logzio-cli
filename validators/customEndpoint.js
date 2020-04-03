const Joi = require('@hapi/joi');

module.exports = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    url: Joi.string().required(),
    method: Joi.string(),
    headers: Joi.string(),
    bodyTemplate: Joi.object(),
});