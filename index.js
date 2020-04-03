#! /usr/bin/env node
// CLI framework
const Fire = require('js-fire');
// Commands
const AccountCommand = require('./commands/account');
const ConfigCommand = require('./commands/config');
const EndpointCommand = require('./commands/endpoints');
const SearchCommand = require('./commands/search');
const ScrollCommand = require('./commands/scroll');

// I command thee
const commands = {
    __description__: 'Interact with Logz.IO via the CLI',
    // Configure the API Token
    config: ConfigCommand,
    configure: ConfigCommand,
    // Basic Search
    search: SearchCommand,
    // Scroll
    scroll: ScrollCommand,
    // Account
    account: AccountCommand,
    // Notifications Endpoints
    endpoints: EndpointCommand,
};

Fire(commands);
