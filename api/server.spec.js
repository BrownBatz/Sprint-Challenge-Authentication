const request = require('supertest');

const server = require('./server.js');

// holds tests
describe("server.js", () => {
    describe('authRouter', () => {
        it('should return 201 on register success', async () => {
            const expectedStatusCode = 201;

            const response = await request(server)
                .post('/api/auth/register')
                .send({username: "test2", password: "test2"}); // needs a unique username every time this test runs
            
            expect(response.status).toBe(expectedStatusCode);
        });

        it('should return 200 on login success', async () => {
            const expectedStatusCode = 200;

            // using a user that is already in the database
            const response = await request(server)
                .post('/api/auth/login')
                .send({username: "Test", password: "password"});

            expect(response.status).toBe(expectedStatusCode);
        });
    });

    describe('jokeRouter', () => {
        it('should return 401 on no credentials', async () => {
            const expectedStatusCode = 401;

            const response = await request(server).get('/api/jokes');

            expect(response.status).toBe(expectedStatusCode);
        });

        it('should return json on proper login', async () => {
            // mocking login
            const loginResponse = await request(server)
                .post('/api/auth/login')
                .send({username: "Test", password: "password"});

            const jokesResponse = await request(server)
                .get('/api/jokes')
            
            expect(jokesResponse.type).toBe('application/json');
        });
    });
});