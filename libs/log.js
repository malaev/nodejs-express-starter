const colors = require('colors')

module.exports = (message, color = 'white') => {
    console.log(colors[color](message))
}
