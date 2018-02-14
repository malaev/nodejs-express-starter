// const http = require('http')
const app = require('./app')
const config = require('./config')

// const server = http.createServer(app)
app.listen(config.get('PORT'))
