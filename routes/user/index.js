const router = require('express').Router();
const AuthController = require('./controller');
const Validator = require('./validator');

/**
 * @path /user
 *
 * @param services
 * @return {*}
 */
module.exports = services => {
    const controller = new AuthController(services);

    router.get('/', controller.getUser);
    router.patch('/', Validator.updateUser(), controller.updateUser);

    return router;
};
