const router = require('express').Router();

const Controller = require('./controller');
const Validator = require('./validator');

module.exports = ({ authorize, models }) => {
    const routes = new Controller({ models });

    // Check all ещвщы routes for valid token
    router.use(authorize);

    // Routes configuration
    router.get('/', routes.getTodos);
    router.get('/:uuid', Validator.getTodoById(), routes.getTodoById);
    router.put('/', Validator.putTodo(), routes.putTodo);
    router.patch('/:uuid', Validator.patchTodo(), routes.patchTodo);
    router.delete('/:uuid', Validator.deleteTodo(), routes.deleteTodo);

    return router;
};
