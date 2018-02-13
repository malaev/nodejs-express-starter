const router = require('express').Router()

const auth = require('./auth')
const echo = require('./echo')
const time = require('./time')
const user = require('./user')
const authorize = require('../middlewares/authorize')

router
    .use('/auth', auth)
    .use('/echo', echo)
    .use('/time', time)
    .all('*', authorize)
    .use('/user', user)
    .all('*', (req, res) => res.error(405))

module.exports = router
