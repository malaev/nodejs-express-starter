const crypt = require('crypto-js')

module.exports = (length = 256) => crypt.lib.WordArray.random(length / 8).toString()
