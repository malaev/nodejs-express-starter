const router = require('express').Router();

const Controller = require('./controller');
const Validator = require('./validator');

module.exports = ({ libs, models }) => {
    const routes = new Controller({ libs, models });

    // Routes configuration
    router.get('/:email', Validator.checkEmail(), routes.checkEmail);
    router.post('/in', Validator.checkAuth(), routes.authIn);
    router.post('/up', Validator.checkAuth(), routes.authUp);

    return router;
};
