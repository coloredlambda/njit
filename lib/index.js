// Registering ESM so we can use imports instead of require - https://github.com/standard-things/esm

require = require('esm')(module/*, options */)
module.exports = require('./app.js')
