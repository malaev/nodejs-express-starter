const inspect = require('../libs/inspect');

/**
 * @param {number} status
 * @return {string}
 */
const parseErrorMessage = status => {
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

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).end(err.message || parseErrorMessage(err.status));
    }

    if (err.code && err.code === 11000) {
        return res.status(409).end(parseErrorMessage(409));
    }

    inspect(err);
    return res.status(500).end('internal_server_error');
};
