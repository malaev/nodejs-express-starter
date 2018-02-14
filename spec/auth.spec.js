const request = require('supertest')
const app = require('../app')

describe('/auth/:email', () => {
    test('It should be 400 for invalid email', async () => {
        const response = await request(app).get(`/auth/invalid@email`)

        expect(response.statusCode).toBe(400)
    }, 10000)

    test('It should be 404 for valid email', async () => {
        const response = await request(app).get(`/auth/valid@email.com`)
        expect(response.statusCode).toBe(404)
    }, 10000)
})

describe('/auth/up', () => {
    test('It should be 200 for created member', async () => {
        const data = {
            email: 'test@test.ru',
            password: 'password'
        }

        const response = await request(app)
            .post('/auth/up')
            .type('form')
            .send(data)
            .then(() => request(app).get(`/auth/${data.email}`))

        expect(response.statusCode).toBe(200)
    }, 10000)
})
