const express = require('express');
const jsonBodyParser = express.json();
const requireAuth = require('../../middleware/jwt-auth');
const teamMemberService = require('./team-member-service');
const teamMembersRouter = express.Router();

teamMembersRouter.get('/', (req, res, next) => {
    const db = req.app.get('db');

    teamMemberService.getAllTeamMembers(db, 1)
        .then(members => {
            return res.json(members)
        })
})

module.exports = teamMembersRouter;