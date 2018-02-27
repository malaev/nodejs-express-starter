const request = require('supertest');
const app = require('../app');
const mongoose = require('../libs/mongoose');
const CIDELAY = 300000;

describe('/notfound', () => {
    afterAll(() => {
        mongoose.connection.db.dropDatabase();
    });

    test('It should be 405 for not found path', async () => {
        const response = await request(app).get('/notfound');
        expect(response.statusCode).toBe(405);
    }, CIDELAY);
});

describe('/auth/:email', () => {
    afterAll(() => {
        mongoose.connection.db.dropDatabase();
    });

    test('It should be 400 for invalid email', async () => {
        const response = await request(app).get('/auth/invalid@email');

        expect(response.statusCode).toBe(400);
    }, CIDELAY);

    test('It should be 404 for valid email', async () => {
        const response = await request(app).get('/auth/valid@email.com');
        expect(response.statusCode).toBe(404);
    }, CIDELAY);
});

describe('/auth/up', () => {
    afterAll(() => {
        mongoose.connection.db.dropDatabase();
    });

    test('It should be 400 for invalid email', async () => {
        const data = {
            email: 'invalid@email',
            password: 'password',
        };

        const response = await request(app)
            .post('/auth/up')
            .type('form')
            .send(data);

        expect(response.statusCode).toBe(400);
    }, CIDELAY);

    test('It should be 400 for short (<8) password', async () => {
        const data = {
            email: 'invalid@email.com',
            password: 'pass',
        };

        const response = await request(app)
            .post('/auth/up')
            .type('form')
            .send(data);

        expect(response.statusCode).toBe(400);
    }, CIDELAY);

    test('It should be 200 and 64 symbols hash for exist member', async () => {
        const data = {
            email: 'test@test.com',
            password: 'password',
        };

        const response = await request(app)
            .post('/auth/up')
            .type('form')
            .send(data);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(64);
    }, CIDELAY);

    test('It should be 200 for created member', async () => {
        const response = await request(app).get('/auth/test@test.com');

        expect(response.statusCode).toBe(200);
    }, CIDELAY);
});

describe('/auth/in', () => {
    afterAll(() => {
        mongoose.connection.db.dropDatabase();
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
    }, CIDELAY);

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
    }, CIDELAY);

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
    }, CIDELAY);

    test('It should be 403 for wrong email or password', async () => {
        const data = {
            email: 'test@test.com',
            password: 'password',
        };

        const payload = {
            email: 'test@test.com',
            password: 'undefined_password',
        };

        await request(app)
            .post('/auth/up')
            .type('form')
            .send(data);

        const response = await request(app)
            .post('/auth/in')
            .type('form')
            .send(payload);

        expect(response.statusCode).toBe(403);
    }, CIDELAY);

    test('It should be 200 and 64 symbols hash for exist member', async () => {
        const data = {
            email: 'test@test.com',
            password: 'password',
        };

        await request(app)
            .post('/auth/up')
            .type('form')
            .send(data);

        const authInResponse = await request(app)
            .post('/auth/in')
            .type('form')
            .send(data);

        expect(authInResponse.statusCode).toBe(200);
        expect(authInResponse.body.length).toBe(64);
    }, CIDELAY);
});
