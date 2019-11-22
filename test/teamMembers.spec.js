const app = require('../src/app');
const request = require('supertest');
const knex = require('knex');
const { DATABASE_URL } = require('../src/config');


const db = knex({
    client: 'pg',
    connection: DATABASE_URL
})

app.set('db', db)

const userCredentials = {
    username: 'nathan3p0',
    password: 'password'
}

let authToken;

const authenticatedUser = request.agent(app);

describe('Team Members', () => {
    before((done) => {
        authenticatedUser
            .post('/api/login')
            .send(userCredentials)
            .end((err, response) => {
                authToken = response.body.authToken;
                done();
            })
    })

    it('Responds with all Team Members for group', () => {
        return authenticatedUser
            .set('Authorization', `bearer ${authToken}`)
            .get('/api/members')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
    })
})