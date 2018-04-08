class Todo {
    constructor({ models }) {
        this.models = models;

        this.getTodos = this.getTodos.bind(this);
        this.getTodoById = this.getTodoById.bind(this);
        this.putTodo = this.putTodo.bind(this);
        this.patchTodo = this.patchTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    getTodos(req, res) {
        res.json(req.user.todos);
    }

    getTodoById(req, res) {
        const { todos } = req.user;
        const index = req.user.todos.findIndex(todo => todo.uuid === req.params.uuid);

        return index === -1
            ? res.error(404)
            : res.json(todos[index]);
    }

    putTodo(req, res) {
        const { time, title } = req.body;
        const data = { todos: [{ time, title }, ...req.user.todos] };

        this.models.user
            .findOneAndUpdate({ uuid: req.user.uuid }, data, { new: true })
            .then(user => res.json(user.todos[0]))
            .catch(error => res.error(error));
    }

    patchTodo(req, res) {
        const { todos } = req.user;
        const index = req.user.todos
            .findIndex(todo => todo.uuid === req.params.uuid);

        if (index === -1) { return res.error(404); }

        const data = {
            todos: [
                ...todos.slice(0, index),
                Object.assign(todos[index], req.body),
                ...todos.slice(index + 1)
            ],
        };

        this.models.user
            .findOneAndUpdate({ uuid: req.user.uuid }, data, { new: true })
            .then(user => res.json(user.todos[index]))
            .catch(error => res.error(error));
    }

    deleteTodo(req, res) {
        const { todos } = req.user;
        const index = req.user.todos
            .findIndex(todo => todo.uuid === req.params.uuid);

        if (index === -1) { return res.error(404); }

        const data = {
            todos: [
                ...todos.slice(0, index),
                ...todos.slice(index + 1)
            ],
        };

        this.models.user
            .findOneAndUpdate({ uuid: req.user.uuid }, data, { new: true })
            .then(() => res.status(204).end())
            .catch(error => res.error(error));
    }
}

module.exports = Todo;
