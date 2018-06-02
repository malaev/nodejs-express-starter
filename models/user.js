const uuid = require('shortid');
const crypt = require('crypto-js');
const moment = require('moment');

const config = require('../config');
const MongoError = require('../errors/MongoError');
const mongoose = require('../libs/mongoose');
const random = require('../libs/random');

const contactsSchema = new mongoose.Schema({
    uuid: {
        default: uuid.generate,
        index: true,
        type: String,
    },
    type: String,
    value: String,
}, { timestamps: true, _id: false, id: false });

const sessionSchema = new mongoose.Schema({
    uuid: {
        default: uuid.generate,
        index: true,
        type: String,
    },
    browser: String,
    ip: String,
    os: String,
    source: String,
    token: String,
}, { timestamps: true, _id: false, id: false });

const todoSchema = new mongoose.Schema({
    uuid: {
        default: uuid.generate,
        index: true,
        type: String,
    },
    done: {
        default: false,
        type: Boolean,
    },
    time: {
        default: moment,
        type: Date,
    },
    title: String,
}, { timestamps: true, _id: false, id: false });

const settingsSchema = new mongoose.Schema({
    compact: {
        default: false,
        type: Boolean,
    },
}, { _id: false, id: false });

const userSchema = new mongoose.Schema({
    uuid: {
        default: uuid.generate,
        index: true,
        type: String,
        unique: true,
    },
    email: {
        index: true,
        required: true,
        type: String,
        unique: true,
    },
    hash: {
        default: random,
        index: true,
        type: String,
    },
    icon: {
        default: config.get('ASSETS:ICON'),
        type: String,
    },
    name: String,
    contacts: contactsSchema,
    sessions: [sessionSchema],
    settings: settingsSchema,
    todos: [todoSchema],
}, { timestamps: true, id: false });

userSchema.static('checkSession', function(token) {
    return this.findOne({ 'sessions.token': token })
        .select('-hash -_id -__v')
        .catch(() => { throw new MongoError(401); });
});

userSchema.virtual('password').set(function(value) {
    this.hash = crypt.SHA512(value).toString();
});

userSchema.post('findOne', function(result, next) {
    if (!result) {
        return next(new MongoError(404));
    }

    return next();
});

userSchema.methods.signIn = function({ password, ip, useragent }) {
    if (crypt.SHA512(password).toString() !== this.hash) {
        throw new MongoError(403);
    }

    const index = this.sessions
        .findIndex(session => session.ip === ip && session.source === useragent.source);

    if (index !== -1) {
        this.sessions.splice(index, 1);
    }

    const session = {
        ip,
        browser: useragent.browser,
        os: useragent.os,
        source: useragent.source,
        token: random(),
    };

    this.sessions.unshift(session);

    return this.save()
        .then(() => session.token || '');
};

userSchema.statics.signUp = function({ email, name, password, ip, useragent }) {
    const session = {
        ip,
        browser: useragent.browser,
        os: useragent.os,
        source: useragent.source,
        token: random(),
    };

    return this.create({ name, email, password, sessions: [session] })
        .then(() => session.token);
};

module.exports = mongoose.model('user', userSchema);
