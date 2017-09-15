const common = require('./env/common');

const env = process.env.NODE_ENV || 'development'
const config = require(`./env/${env}`).default

module.exports = Object.assign({}, common, config)
