const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');

const app = require('../app');

describe('/user', () => {
    const body = {
        email: 'valid@email.com',
        password: 'password',
    };

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

    test('It should be 200 with valid user email', async () => {
        const authUpResponse = await request(app)
            .post('/auth/up')
            .type('form')
            .send(body);

        const userResponse = await request(app)
            .get('/user')
            .set({ Authorization: authUpResponse.body });

        expect(userResponse.statusCode).toBe(200);
        expect(userResponse.body.email).toBe(body.email);
    });

    test('It should be 200 with valid user name', async () => {
        const authUpResponse = await request(app)
            .post('/auth/up')
            .type('form')
            .send(body);

        const userResponse = await request(app)
            .patch('/user')
            .type('form')
            .send({ name: 'Test' })
            .set({ Authorization: authUpResponse.body });

        expect(userResponse.statusCode).toBe(200);
        expect(userResponse.body.name).toBe('Test');
    });

    test('It should be 204 for delete session and 403 for user', async () => {
        const authUpResponse = await request(app)
            .post('/auth/up')
            .type('form')
            .send(body);

        const userResponse = await request(app)
            .patch('/user')
            .type('form')
            .send({ name: 'Test' })
            .set({ Authorization: authUpResponse.body });

        const { uuid } = userResponse.body.sessions[0];

        const deleteSessionResponse = await request(app)
            .delete(`/user/session/${uuid}`)
            .set({ Authorization: authUpResponse.body });

        const userResponseAfterDeleteSession = await request(app)
            .get('/user')
            .set({ Authorization: authUpResponse.body });

        expect(deleteSessionResponse.statusCode).toBe(204);
        expect(userResponseAfterDeleteSession.statusCode).toBe(403);
    });

    test('It should be 404 for delete undefined session and 200 for user', async () => {
        const authUpResponse = await request(app)
            .post('/auth/up')
            .type('form')
            .send(body);

        await request(app)
            .patch('/user')
            .type('form')
            .send({ name: 'Test' })
            .set({ Authorization: authUpResponse.body });

        const deleteSessionResponse = await request(app)
            .delete('/user/session/000000')
            .set({ Authorization: authUpResponse.body });

        const userResponseAfterDeleteSession = await request(app)
            .get('/user')
            .set({ Authorization: authUpResponse.body });

        expect(deleteSessionResponse.statusCode).toBe(404);
        expect(userResponseAfterDeleteSession.statusCode).toBe(200);
    });
});
