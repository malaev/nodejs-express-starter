const joi = require('joi');
const validate = require('../../middlewares/validate');

const emailSchema = {
    email: joi.string().email({ minDomainAtoms: 2 }).required(),
};

const authSchema = {
    email: joi.string().email({ minDomainAtoms: 2 }).required(),
    password: joi.string().min(8).required(),
};

class Validator {
    static checkAuth() {
        return validate(authSchema);
    }

    static checkEmail() {
        return validate(emailSchema);
    }
}

module.exports = Validator;
