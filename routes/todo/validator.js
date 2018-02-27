const joi = require('joi');
const validate = require('../../middlewares/validate');

const getTodoSchema = {
    uuid: joi.string().min(6).max(10).required(),
};

const patchTodoSchema = {
    done: joi.bool().optional(),
    time: joi.date().optional(),
    title: joi.string().optional(),
};

const putTodoSchema = {
    time: joi.date().optional(),
    title: joi.string().required(),
};

class Validator {
    static putTodo() {
        return validate(putTodoSchema);
    }

    static getTodoById() {
        return validate(getTodoSchema);
    }

    static deleteTodo() {
        return validate(getTodoSchema);
    }

    static patchTodo() {
        return validate(patchTodoSchema);
    }
}

module.exports = Validator;
