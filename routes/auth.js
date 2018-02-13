const router = require('express').Router()

const isEmailValid = require('../libs/isEmailValid')
const random = require('../libs/random')

const User = require('../models/user')

router.get('/:email', function(req, res, next) {
    const { email } = req.params

    User.findOne({ email })
        .then(
            user => user
                ? res.json({
                    email: user.email
                })
                : res.error(404)
        )
        .catch(err => res.error(500))
})

router.post('/in', function(req, res) {
    const { email, password } = req.body

    User.findOne({ email })
        .then(user => {
            if (!user)
                throw { status: 404 }

            return user.signIn({ password, useragent: req.useragent })
        })
        .then(session => res.json(session))
        .catch(err => res.error(err))
})

router.post('/up', function(req, res) {
    const { email, password } = req.body

    const session = {
        browser: req.useragent.browser,
        os: req.useragent.os,
        source: req.useragent.source,
        token: random()
    }

    User.create({ email, password, sessions: [session] })
        .then(user => {
            return user.sessions[0]
                ? res.json(session.token)
                : res.error(500)
        })
        .catch(err => res.error(err))
})

module.exports = router
