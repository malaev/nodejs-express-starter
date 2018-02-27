class User {
    constructor({ models }) {
        this.models = models;

        this.getUser = this.getUser.bind(this);
        this.patchUser = this.patchUser.bind(this);
        this.deleteSession = this.deleteSession.bind(this);
    }

    getUser(req, res) {
        res.json(req.user);
    }

    patchUser(req, res) {
        this.models.user
            .findOneAndUpdate({ uuid: req.user.uuid }, req.body, { new: true })
            .select('-hash -inviteHash -__v')
            .then(user => res.json(user))
            .catch(error => res.error(error));
    }

    deleteSession(req, res) {
        const { sessions } = req.user;

        const index = req.params.uuid
            ? sessions.findIndex(session => session.uuid === req.params.uuid)
            : 0;

        if (index === -1)
            return res.error(404);

        const data = { sessions: [...sessions.slice(0, index), ...sessions.slice(index + 1)]};

        this.models.user
            .findOneAndUpdate({ uuid: req.user.uuid }, data, { new: true })
            .then(() => res.status(204).end())
            .catch(error => res.error(error));
    }
}

module.exports = User;
