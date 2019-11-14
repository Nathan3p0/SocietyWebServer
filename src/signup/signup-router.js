const express = require('express');
const uuidv4 = require('uuid/v4');
const path = require('path');
const jsonBodyParser = express.json();

const signupRouter = express.Router();

signupRouter.post('/admin', jsonBodyParser, (req, res, next) => {
    const { full_name, username, password, email, phone, group_name } = req.body;

    if (!full_name) {
        return res.status(400).json(
            { error: 'Please enter a full name.' }
        );
    }

    if (!username) {
        return res.status(400).json(
            { error: 'Please enter a username.' }
        );
    }

    if (!password) {
        return res.status(400).json(
            { error: 'Please enter a password.' }
        );
    }

    if (!email) {
        return res.status(400).json(
            { error: 'Please enter an email.' }
        )
    }

    if (!phone) {
        return res.status(400).json(
            { error: 'Please enter a phone number.' }
        )
    }

    if (!group_name) {
        return res.status(400).json(
            { error: 'Please enter a club name.' }
        )
    }

    res.send('It passed!')
})

module.exports = signupRouter;

