const Debug = require('debug');
const Package = require('../package.json');

module.exports = {
    log: Debug(`${Package.name}:log`),
    info: Debug(`${Package.name}:info`),
    debug: Debug(`${Package.name}:debug`),
    error: Debug(`${Package.name}:error`),
    Debug: Debug,
}