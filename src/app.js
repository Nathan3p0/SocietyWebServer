require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const eventsRouter = require('./routes/events/events-router');
const authRouter = require('./auth/auth-router');
const teamMembersRouter = require('./routes/teamMembers/team-members-router');
const signupRouter = require('./routes/signup/signup-router');
const messageRouter = require('./routes/messages/messages-router');


const app = express();

const morganOption = (NODE_ENV === 'production' ? 'tiny' : 'common');

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());


app.use('/api/login', authRouter);
app.use('/api/events', eventsRouter);
app.use('/api/signup', signupRouter);
app.use('/api/members', teamMembersRouter);
app.use('/api/message', messageRouter);


const errorHandler = (error, req, res, next) => {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } };
    } else {
        console.error(error);
        response = { message: error.message, error };
    }
    res.status(500).json(response);
}

app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).send('Hello and welcome to Society Web Server');
})

module.exports = app;