const User = require('../models/user');
const HttpError = require('../errors/HttpError');

module.exports = (request, response, next) => {
    const token = request.headers.authorization;

    if (!token || token.length < 60) {
        throw new HttpError(401);
    }

    return User.checkSession(token)
        .then((user) => {
            request.user = user;

            next();
        })
        .catch(next);
};
