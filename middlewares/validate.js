const Joi = require('joi');

/**
 * @param {Joi} schema
 * @return {Function}
 */
module.exports = schema => (request, response, next) => {
    const body = request.method === 'GET' || request.method === 'DELETE'
        ? request.params
        : request.body;

    Joi.validate(body, schema)
        .then(() => next())
        .catch((data) => {
            const errors = data.details.reduce((result, error) => `${result + error.message}\n`, '');

            response.status(400).end(errors);
        });
};
