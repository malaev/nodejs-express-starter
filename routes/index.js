const router = require('express').Router();

const auth = require('./auth');
const user = require('./user');

const authorize = require('../middlewares/authorize');
const HttpError = require('../errors/HttpError');
const status = require('../middlewares/statusHandler');
const userModel = require('../models/user');

const services = {
    models: {
        user: userModel,
    },
};

router
    .use('/status', status)
    .use('/auth', auth(services))
    .use('/user', authorize, user(services))
    .all('*', () => { throw new HttpError(405); });

module.exports = router;
