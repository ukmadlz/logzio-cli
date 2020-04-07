const debug = require('./debug');

module.exports = (error) => {
    console.log('An error occured making the request');
    if (error.response) {
      debug.log(error.response.data);
      debug.log(error.response.status);
      debug.log(error.response.headers);
    } else if (error.request) {
      debug.log(error.request);
    } else {
      debug.log('Error', error.message);
    }
    debug.info(error.config);
  };