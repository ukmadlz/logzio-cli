const Joi = require('@hapi/joi');
const axios = require('../helpers/axios');
const debug = require('../helpers/debug');
const CustomEndpointValidator = require('../validators/customEndpoint');

module.exports = {
    // List endpoints
    list: () => {
        return axios.get('/endpoints')
            .then(response => {
                debug.log('Notification Endpoints:');
                console.table(response.data);
            })
    },
    // Custom Endpoints
    'custom:create': (title, description, url, method='POST', headers, bodyTemplate, test=false) => {
        const data = {};
        if (title) data.title = title
        if (description) data.description = description
        if (url) data.url = url
        if (method) data.method = method.toUpperCase();
        if (headers) data.headers = headers
        if (bodyTemplate) {
            data.bodyTemplate = (typeof bodyTemplate === 'object') ?
                bodyTemplate :
                JSON.parse(bodyTemplate);
        }
        const { error } = CustomEndpointValidator.validate(data);
        if (error) {
            debug.log('Please provide valid parts of a custom endpoint request');
            debug.error(error);
            process.exit(1);
        }
        const config = {
            params: {
                test,
            },
        };
        return axios.post('/endpoints/custom', data, config)
            .then(response => {
                debug.log('Created Custom Endpoint: %s', response.data.id);
            })
    },
    'custom:update': (id, title, description, url, method='POST', headers, bodyTemplate, test=false) => {
        // Validate the Custom Endpoint ID
        const idJoiValidate = Joi.number().required().validate(id);
        if(idJoiValidate.error) {
            debug.log('Please provide a valid Custom Endpoint ID');
            debug.error(idJoiValidate.error);
            process.exit(1);
        }
        const data = {};
        if (title) data.title = title
        if (description) data.description = description
        if (url) data.url = url
        if (method) data.method = method.toUpperCase();
        if (headers) data.headers = headers
        if (bodyTemplate) {
            data.bodyTemplate = (typeof bodyTemplate === 'object') ?
                bodyTemplate :
                JSON.parse(bodyTemplate);
        }
        const { error } = CustomEndpointValidator.validate(data);
        if (error) {
            debug.log('Please provide valid parts of a custom endpoint request');
            debug.error(error);
            process.exit(1);
        }
        const config = {
            params: {
                test,
            },
        };
        return axios.put(`/endpoints/custom/${id}`, data, config)
            .then(response => {
                debug.log('Updated Custom Endpoint: %s', response.data.id);
            })
    },
}