const User = require('../models/user');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token || token.length < 60)
        return res.error(401);

    User.findOne({ 'sessions.token': token })
        .select('-hash -inviteHash -__v')
        .populate({
            path: 'sessions',
            select: '-_id'
        })
        .then(user => {
            if (!user)
                return res.error(403);

            req.user = user;
            next();
        })
        .catch(() => res.error(500));
};
