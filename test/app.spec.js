const app = require('../src/app');

describe('App', () => {
    it(`GET / responds with 200 containing "Hello and welcome to Society Web Server"`, () => {
        return supertest(app)
            .get('/')
            .expect(200, 'Hello and welcome to Society Web Server')
    })
})