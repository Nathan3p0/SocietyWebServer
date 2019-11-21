require('dotenv').config();
const express = require('express');
const requireAuth = require('../../middleware/jwt-auth');
const MessageService = require('./messages-service');
const jsonBodyParser = express.json();
const messageRouter = express.Router();

messageRouter.post('/invite', requireAuth, jsonBodyParser, (req, res, next) => {
    const { phone } = req.body;
    const db = req.app.get('db');
    const { id } = req.user;
    console.log(req.user)
    MessageService.findGroupByAdminId(db, id)
        .then(group => {
            if (!group) {
                return res.status(400).json({
                    error: `Please check that you are logged in as an Admin.`
                })
            }
            return group;
        })
})


module.exports = messageRouter;