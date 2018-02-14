const joi = require('joi')
const validate = require('../../middlewares/validate')

const sessionSchema = {
    uuid: joi.string().length(9).required()
}

const userSchema = {
    name: joi.string().optional()
}

class Validator {
    static deleteSession() {
        return validate(sessionSchema)
    }

    static patchUser() {
        return validate(userSchema)
    }
}

module.exports = Validator
