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

    it('Responds with 200 when invite sent', () => {
        return authenticatedUser
            .set('Authorization', `bearer ${authToken}`)
            .post('/api/message/invite')
            .send({
                phone: '734-673-5101'
            })
            .expect(200)
    })

    it('Responds with 200 when email sent', () => {
        return authenticatedUser
            .set('Authorization', `bearer ${authToken}`)
            .post('/api/message/email')
            .send({
                to: 'ndszelag@gmail.com',
                from: 'nszelag@live.com',
                subject: 'Testing1234',
                text: 'This is just a test'
            })
            .expect(200)
    })
})