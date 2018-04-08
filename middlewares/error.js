/* eslint-disable no-underscore-dangle */
const inspect = require('../libs/inspect');

const parse = (status) => {
    switch (status) {
    case 400:
        return 'bad_request';

    case 401:
        return 'unauthorized';

    case 402:
        return 'payment_required';

    case 403:
        return 'forbidden';

    case 404:
        return 'not_found';

    case 405:
        return 'not_allowed';

    case 409:
        return 'conflict';

    case 423:
        return 'locked';

    default:
        return 'internal_server_error';
    }
};

module.exports = (req, res, next) => {
    res.error = (error, message = null) => {
        if (typeof error === 'number') {
            return res.status(error).end(message || parse(error));
        }

        if (error.code && error.code === 11000) {
            inspect(error);

            return res.status(409).end(message || parse(409));
        }

        if (error.name && (error.name === 'ValidationError' || error.name === 'CastError')) {
            inspect(error);

            res.statusMessage = error._message;
            return res.status(400).end();
        }

        if (error.status && error.message) {
            inspect(error);

            return res.status(error.status).end(error.message);
        }

        if (error.status) {
            inspect(error);

            return res.status(error.status).end(message || parse(error.status));
        }

        inspect(error);
        return res.status(500).end(message || parse(500));
    };

    next();
};
