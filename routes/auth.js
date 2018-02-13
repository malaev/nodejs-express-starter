const router = require('express').Router()

const isEmailValid = require('../libs/isEmailValid')
const random = require('../libs/random')

const User = require('../models/user')

router.get('/:email', (req, res, next) => {
    const { email } = req.params

    User.findOne({ email })
        .then(user => user
            ? res.json({
                email: user.email
            })
            : res.error(404))
        .catch(err => res.error(500))
})

router.post('/in', (req, res) => {
    const { email, password } = req.body

    User.findOne({ email })
        .then(user => user
            ? user.signIn({ password, useragent: req.useragent })
            : throw { status: 404 }
        )
        .then(session => res.json(session))
        .catch(err => res.error(err))
})

router.post('/up', (req, res) => {
    const { email, password } = req.body

    const sessions = [{
        browser: req.useragent.browser,
        os: req.useragent.os,
        source: req.useragent.source,
        token: random()
    }]

    User.create({ email, password, sessions })
        .then(user => user
            ? res.json(session[0].token)
            : res.error(500)
        )
        .catch(err => res.error(err))
})

module.exports = router
