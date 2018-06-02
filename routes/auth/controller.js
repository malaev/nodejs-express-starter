class AuthController {
    constructor({ models }) {
        this.models = models;

        this.checkEmail = this.checkEmail.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    /**
     * @path [get] /check/:email
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
            .then(token => response.json(token))
            .catch(next);
    }

    /**
     * @path [post] /up
     *
     * @param request
     * @param response
     * @param next
     */
    signUp(request, response, next) {
        const { email, password, name } = request.body;
        const { ip, useragent } = request;

        this.models.user
            .signUp({ email, password, name, ip, useragent })
            .then(token => response.json(token))
            .catch(next);
    }
}

/**
 * @type {AuthController}
 */
module.exports = AuthController;
