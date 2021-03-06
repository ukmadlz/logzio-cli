const Joi = require('@hapi/joi');
const axios = require('../helpers/axios');
const debug = require('../helpers/debug');
const errorHandler = require('../helpers/errorHandler');
const CustomEndpointValidator = require('../validators/customEndpoint');

module.exports = {
    // List endpoints
    list: () => {
        return axios.get('/endpoints')
            .then(response => {
                console.log('Notification Endpoints:');
                console.table(response.data);
            })
            .catch(errorHandler);
    },
    // Get Endpoint Data
    get: (id) => {
        // Validate the Endpoint ID
        const idJoiValidate = Joi.number().required().validate(id);
        if(idJoiValidate.error) {
            console.log('Please provide a valid Endpoint ID');
            debug.error(idJoiValidate.error);
            process.exit(1);
        }
        return axios.get(`/endpoints/${id}`)
            .then(response => {
                const { title, description, url, method, headers, bodyTemplate} = response.data;
                console.log('Endpoint: %s', id)
                console.log(' Title: %s', title);
                console.log(' Description: %s', description);
                console.log(' URL: %s', url);
                console.log(' Method: %s', method);
                console.log(' Headers: %O', headers);
                console.log(' Body Template: %O', bodyTemplate);
            }
            .catch(errorHandler);
    },
    // Delete an endpoint
    delete: (id) => {
        // Validate the Endpoint ID
        const idJoiValidate = Joi.number().required().validate(id);
        if(idJoiValidate.error) {
            console.log('Please provide a valid Endpoint ID');
            debug.error(idJoiValidate.error);
            process.exit(1);
        }
        return axios.delete(`/endpoints/${id}`)
            .then(response => {
                debug.log('Successfully deleted endpoint %s', id);
            })
            .catch(errorHandler);
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
            console.log('Please provide valid parts of a custom endpoint request');
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
                console.log('Created Custom Endpoint: %s', response.data.id);
            })
            .catch(errorHandler);
    },
    'custom:update': (id, title, description, url, method='POST', headers, bodyTemplate, test=false) => {
        // Validate the Custom Endpoint ID
        const idJoiValidate = Joi.number().required().validate(id);
        if(idJoiValidate.error) {
            console.log('Please provide a valid Custom Endpoint ID');
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
            console.log('Please provide valid parts of a custom endpoint request');
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
                console.log('Updated Custom Endpoint: %s', response.data.id);
            })
            .catch(errorHandler);
    },
}