const joi = require('joi');
const validate = require('../../middlewares/validate');

const sessionSchema = {
    uuid: joi.string().min(6).max(10).required(),
};

const patchUserSchema = {
    name: joi.string().optional(),
};

class Validator {
    static deleteSession() {
        return validate(sessionSchema);
    }

    static patchUser() {
        return validate(patchUserSchema);
    }
}

module.exports = Validator;
