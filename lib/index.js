// Registering ESM so we can use imports - https://github.com/standard-things/esm

require = require('esm')(module/*, options */)
module.exports = require('./app.js')
