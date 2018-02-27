class Auth {
    constructor({ libs, models }) {
        this.libs = libs;
        this.models = models;

        this.checkEmail = this.checkEmail.bind(this);
        this.authIn = this.authIn.bind(this);
        this.authUp = this.authUp.bind(this);
    }

    checkEmail(req, res) {
        const { email } = req.params;

        this.models.user.findOne({ email })
            .then(user =>
                user
                    ? res.json({ email: user.email })
                    : res.error(404)
            )
            .catch(() => res.error(500));
    }

    authIn(req, res) {
        const { email, password } = req.body;

        this.models.user.findOne({ email })
            .then(user => {
                if (!user)
                    throw { status: 404 };

                return user.signIn({ password, useragent: req.useragent });
            })
            .then(session => res.json(session))
            .catch(err => res.error(err));
    }

    authUp(req, res) {
        const { email, password } = req.body;

        const sessions = [{
            browser: req.useragent.browser,
            os: req.useragent.os,
            source: req.useragent.source,
            token: this.libs.random(),
        }];

        this.models.user.create({ email, password, sessions })
            .then(user => user
                ? res.json(sessions[0].token)
                : res.error(500)
            )
            .catch(err => res.error(err));
    }
}

module.exports = Auth;
