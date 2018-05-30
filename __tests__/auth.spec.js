const request = require('supertest');
const mongoose = require('mongoose');

const User = require('../models/user');
const app = require('../app');

describe('/notfound', () => {
    beforeAll((done) => {
        mongoose.Promise = Promise;
        mongoose.connect('mongodb://localhost:27017/database-test', { poolSize: 4 });
        mongoose.connection.once('open', done);
    });

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    test('It should be 405 for not found path', async () => {
        const response = await request(app).get('/notfound');
        expect(response.statusCode).toBe(405);
    });
});

describe('/auth/:email', () => {
    beforeAll((done) => {
        mongoose.Promise = Promise;
        mongoose.connect('mongodb://localhost:27017/database-test', { poolSize: 4 });
        mongoose.connection.once('open', done);
    });

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    beforeEach((done) => {
        User.remove({}, done);
    });

    test('It should be 400 for invalid email', async () => {
        const response = await request(app).get('/auth/invalid@email');

        expect(response.statusCode).toBe(400);
    });

    test('It should be 404 for valid email', async () => {
        const response = await request(app).get('/auth/valid@email.com');
        expect(response.statusCode).toBe(404);
    });
});

describe('/auth/in', () => {
    beforeAll((done) => {
        mongoose.Promise = Promise;
        mongoose.connect('mongodb://localhost:27017/database-test', { poolSize: 4 });
        mongoose.connection.once('open', done);
    });

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    beforeEach((done) => {
        User.remove({}, done);
    });

    test('It should be 400 for invalid email', async () => {
        const data = {
            email: 'invalid@email',
            password: 'password',
        };

        const response = await request(app)
            .post('/auth/in')
            .type('form')
            .send(data);

        expect(response.statusCode).toBe(400);
    });

    test('It should be 400 for short (<8) password', async () => {
        const data = {
            email: 'invalid@email.com',
            password: 'pass',
        };

        const response = await request(app)
            .post('/auth/in')
            .type('form')
            .send(data);

        expect(response.statusCode).toBe(400);
    });

    test('It should be 404 for missed member', async () => {
        const data = {
            email: 'undefined@test.com',
            password: 'password',
        };

        const response = await request(app)
            .post('/auth/in')
            .type('form')
            .send(data);

        expect(response.statusCode).toBe(404);
    });
});
