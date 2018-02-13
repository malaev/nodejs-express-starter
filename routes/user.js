const router = require('express').Router()
const User = require('../models/user')

router.get('/', function(req, res) {
    res.json(req.user)
})

router.patch('/', function(req, res) {
    User.findOneAndUpdate({ _id: req.user.id }, data, { new: true })
        .select('-hash -inviteHash -__v')
        .then(user => res.json(user))
        .catch(error => res.error(error))
})

router.delete('/session/:uuid?', function(req, res) {
    const { sessions } = req.user

    const index = req.params.uuid
        ? sessions.findIndex(session => session.uuid === req.params.uuid)
        : 0

    if (index === -1)
        return res.error(404)

    const session = sessions[index]
    const query = [
        { _id: req.user.id },
        { sessions: sessions.slice(0, index).concat(sessions.slice(index + 1))},
        { new: true }
    ]

    User.findOneAndUpdate(...query)
        .then(user => res.json(session))
        .catch(error => res.error(error))
})

module.exports = router
