const app = require('../src/app');
const request = require('supertest');
const knex = require('knex');
const { TEST_DATABASE_URL } = require('../src/config');


const db = knex({
    client: 'pg',
    connection: TEST_DATABASE_URL
})

app.set('db', db)

describe('Signup', () => {

    it('Successfully signup as new team', () => {
        return request(app)
            .post('/api/signup/admin')
            .send({
                full_name: 'john doe',
                username: 'Jdoe09',
                password: 'Password1.',
                email: 'jdoe09@gmail.com',
                phone: '734-555-0505',
                group_name: 'Ninj4 W4rriors'
            })
            .expect(201)
    })

    it('Successfully signup as new member', () => {
        return request(app)
            .post('/api/signup/member')
            .send({
                full_name: 'Bob Dylan',
                username: 'Bdylan98',
                password: 'Password1.',
                email: 'jdoe09@gmail.com',
                phone: '734-555-0505',
                invite_code: '653c3de7-4e6c-4e4e-8cdd-705794f2ddeb'
            })
            .expect(201)
    })

})