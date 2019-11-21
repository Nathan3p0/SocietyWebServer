require('dotenv').config();
const express = require('express');
const requireAuth = require('../../middleware/jwt-auth');
const MessageService = require('./messages-service');
const jsonBodyParser = express.json();
const messageRouter = express.Router();

messageRouter.post('/invite', requireAuth, jsonBodyParser, (req, res, next) => {

})


module.exports = messageRouter;