const router = require('express').Router()

const Controller = require('./controller')
const Validator = require('./validator')

module.exports = ({ authorize, models }) => {
    const routes = new Controller({ models })

    // Check all user routes for valid token
    router.use(authorize)

    // Routes configuration
    router.get('/', routes.getUser)
    router.patch('/', Validator.patchUser(), routes.patchUser)
    router.delete('/session/:uuid?', Validator.deleteSession(), routes.deleteSession)

    return router
}
