const uuid = require('shortid')
const crypt = require('crypto-js')
const moment = require('moment')

const mongoose = require('../libs/mongoose')
const random = require('../libs/random')

const sessionSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: moment
    },
    updatedAt: {
        type: Date,
        default: moment
    },
    uuid: {
        type: String,
        index: true,
        default: uuid.generate
    },
    browser: String,
    os: String,
    source: String,
    token: String
})

const userSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: moment
    },
    updatedAt: {
        type: Date,
        default: moment
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    uuid: {
        type: String,
        unique: true,
        index: true,
        default: uuid.generate
    },
    hash: {
        type: String,
        index: true,
        default: random
    },
    sessions: [sessionSchema],
    name: String
})

sessionSchema.pre('save', function(next) {
    this.updatedAt = moment()
    next()
})

userSchema.pre('save', function(next) {
    this.updatedAt = moment()
    next()
})

userSchema.virtual('password').set(function(value) {
    this.hash = crypt.SHA512(value).toString()
})

userSchema.methods.signIn = function({ password, useragent }) {
    if (crypt.SHA512(password).toString() !== this.hash)
        throw { status: 403 }

    const index = this.sessions
        .findIndex(session => session.source == useragent.source)

    if (index !== -1)
        this.sessions.splice(index, 1)

    const session = {
        browser: useragent.browser,
        os: useragent.os,
        source: useragent.source,
        token: random()
    }

    this.sessions = [session, ...this.sessions]

    return this.save()
        .then(() => session.token || '')
}

module.exports = mongoose.model('user', userSchema)
