const router = require('express').Router();
const AuthController = require('./controller');
const Validator = require('./validator');

/**
 * @path /auth
 *
 * @param services
 * @return {*}
 */
module.exports = services => {
    const controller = new AuthController(services);

    router.get('/check/:email', Validator.checkEmail(), controller.checkEmail);
    router.post('/in', Validator.signIn(), controller.signIn);
    router.post('/up', Validator.signUp(), controller.signUp);

    return router;
};
