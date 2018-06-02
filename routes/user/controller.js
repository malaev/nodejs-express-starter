class UserController {
    constructor({ models }) {
        this.models = models;

        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    /**
     * @path [get] /
     *
     * @param request
     * @param response
     * @param next
     */
    getUser(request, response) {
        response.json(request.user);
    }

    /**
     * @path [patch] /
     *
     * @param request
     * @param response
     * @param next
     */
    updateUser(request, response, next) {
        const { uuid } = request.user;

        this.models.user
            .findOneAndUpdate({ uuid }, request.body, { new: true })
            .select('-_id -hash -__v')
            .then(user => response.json(user))
            .catch(next);
    }
}

/**
 * @type {UserController}
 */
module.exports = UserController;
