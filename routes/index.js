const router = require('express').Router();

const auth = require('./auth');

const authorize = require('../middlewares/authorize');
const HttpError = require('../errors/HttpError');

const userModel = require('../models/user');

const services = {
    models: {
        user: userModel,
    },
};

router
    .use('/auth', auth(services))
    .use('/status', authorize, (req, res) => res.json({ status: 'ok' }))
    .all('*', () => { throw new HttpError(405); });

module.exports = router;
