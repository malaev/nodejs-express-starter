const router = require('express').Router();

const services = {
    authorize: require('../middlewares/authorize'),
    libs: {
        random: require('../libs/random')
    },
    models: {
        user: require('../models/user')
    }
};

const Auth = require('./auth')(services);
const User = require('./user/')(services);

router
    .use('/auth', Auth)
    .use('/user', User)
    .all('*', (req, res) => res.error(405));

module.exports = router;
