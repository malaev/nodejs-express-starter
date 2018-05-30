const joi = require('joi');
const validate = require('../../middlewares/validate');

class Validator {
    static checkEmail() {
        return validate({
            email: joi.string().email({ minDomainAtoms: 2 }).required(),
        });
    }

    static signIn() {
        return validate({
            email: joi.string().email({ minDomainAtoms: 2 }).required(),
            password: joi.string().min(8).required(),
        });
    }
}

/**
 * @type {Validator}
 */
module.exports = Validator;
