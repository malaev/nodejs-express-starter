const joi = require('joi');
const validate = require('../../middlewares/validate');

class Validator {
    static updateUser() {
        return validate({
            name: joi.string().optional(),
            icon: joi.string().optional(),
        });
    }
}

/**
 * @type {Validator}
 */
module.exports = Validator;
