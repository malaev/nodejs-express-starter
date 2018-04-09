const request = require('supertest');
const mongoose = require('mongoose');
const moment = require('moment');
const User = require('../models/user');

const app = require('../app');

describe('/todo', () => {
    let token;
    let uuid;

    const todoPayload = {
        title: Math.random().toString(),
        time: moment().format(),
    };

    beforeAll((done) => {
        mongoose.Promise = Promise;
        mongoose.connect('mongodb://localhost:27017/database-test', { poolSize: 4 });
        mongoose.connection.once('open', done);
    });

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    beforeEach( async (done) => {
        const body = {
            email: 'test@test.com',
            password: 'password',
        };

        await User.remove({});
        const authUpResponse = await request(app).post('/auth/up').type('form').send(body);
        token = authUpResponse.body;
        done();
    });

    test('It should be empty array of todos', async () => {
        const response = await request(app)
            .get('/todo')
            .set({ Authorization: token });

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    describe('create todo', () => {
        beforeEach(async (done) => {
            const createdTodoResponse = await request(app)
                .put('/todo')
                .type('form')
                .set({ Authorization: token })
                .send(todoPayload);

            uuid = createdTodoResponse.body.uuid;

            done();
        });

        test('It should be array with 1 todo', async () => {
            const response = await request(app)
                .get('/todo')
                .set({ Authorization: token });

            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
        });

        test('It should be valid todo response', async () => {
            const response = await request(app)
                .get(`/todo/${uuid}`)
                .set({ Authorization: token });

            expect(response.statusCode).toBe(200);
            expect(response.body.uuid).toBe(uuid);
            expect(response.body.title).toBe(todoPayload.title);
        });

        test('It should be not found response', async () => {
            const response = await request(app)
                .get('/todo/qwertyuiop')
                .set({ Authorization: token });

            expect(response.statusCode).toBe(404);
        });

        test('It should be deleted todo', async () => {
            await request(app)
                .delete(`/todo/${uuid}`)
                .set({ Authorization: token });

            const response = await request(app)
                .delete(`/todo/${uuid}`)
                .set({ Authorization: token });

            expect(response.statusCode).toBe(404);
        });

        test('It should be patched todo', async () => {
            const response = await request(app)
                .patch(`/todo/${uuid}`)
                .type('form')
                .send({ title: 'new_title' })
                .set({ Authorization: token });

            expect(response.statusCode).toBe(200);
            expect(response.body.title).toBe('new_title');
        });

        test('It should be validation error for bad uuid', async () => {
            const response = await request(app)
                .delete('/todo/1')
                .set({ Authorization: token });

            expect(response.statusCode).toBe(400);
        });
    });
});
