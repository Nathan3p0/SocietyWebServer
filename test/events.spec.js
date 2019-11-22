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

describe('Events', () => {

    before((done) => {
        authenticatedUser
            .post('/api/login')
            .send(userCredentials)
            .end((err, response) => {
                authToken = response.body.authToken;
                done();
            })
    })

    it('It should require authorization', () => {
        return supertest(app)
            .get('/api/events/')
            .expect(400);
    });

    it('Responds with all groups', () => {
        return authenticatedUser
            .set('Authorization', `bearer ${authToken}`)
            .get('/api/events/')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
    })

    it('Responds with event by ID', () => {
        return authenticatedUser
            .set('Authorization', `bearer ${authToken}`)
            .get('/api/events/2')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
    })

    it('Responds with Members attending Event by ID', () => {
        return authenticatedUser
            .set('Authorization', `bearer ${authToken}`)
            .get('/api/events/members/2')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
    })

    it('Responds with all events belonging to Member', () => {
        return authenticatedUser
            .set('Authorization', `bearer ${authToken}`)
            .get('/api/events/members')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
    })

    it('Allow member to rsvp to new event', () => {
        return request(app)
            .set('Authorization', `bearer ${authToken}`)
            .post('/api/events/members')
            .send({
                event_id: 3,
                event_role: 'Volunteer'
            })
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201)
    })

    it('Create new event', () => {
        return request(app)
            .set('Authorization', `bearer ${authToken}`)
            .post('/api/events/members')
            .send({
                event_date: '2019-12-01',
                event_time: '12:00:00',
                event_name: 'Fun Fest 2019',
                event_description: 'Best party on earth',
                event_location: 'VFW Hall'
            })
            .expect(201)
    })
})