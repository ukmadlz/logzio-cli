const axios = require('../helpers/axios');
const debug = require('../helpers/debug');

module.exports = {
    whoami: () => {
        return axios.get('/account-management/whoami')
            .then(response => {
                debug.log(`Account Name: %s`, response.data.accountName);
            });
    }
}