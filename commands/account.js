const axios = require('../helpers/axios');
const errorHandler = require('../helpers/errorHandler');

module.exports = {
    whoami: () => {
        return axios.get('/account-management/whoami')
            .then(response => {
                console.log(`Account Name: %s`, response.data.accountName);
            })
            .catch(errorHandler);
    }
}