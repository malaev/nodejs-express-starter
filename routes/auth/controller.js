class AuthController {
    constructor({ models }) {
        this.models = models;

        this.checkEmail = this.checkEmail.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    /**
     * @path [get] /:email
     *
     * @param request
     * @param response
     * @param next
     */
    checkEmail(request, response, next) {
        const { email } = request.params;

        this.models.user
            .findOne({ email })
            .then(user => {
                response.json({
                    email: user.email,
                    icon: user.icon,
                    name: user.name,
                });
            })
            .catch(next);
    }

    /**
     * @path [post] /in
     *
     * @param request
     * @param response
     * @param next
     */
    signIn(request, response, next) {
        const { email, password } = request.body;

        this.models.user
            .findOne({ email })
            .then(user => user.signIn({
                password,
                ip: request.ip,
                useragent: request.useragent,
            }))
            .then(session => response.json(session))
            .catch(next);
    }
}

/**
 * @type {AuthController}
 */
module.exports = AuthController;
