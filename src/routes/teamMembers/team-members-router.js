const express = require('express');
const jsonBodyParser = express.json();
const requireAuth = require('../../middleware/jwt-auth');
const teamMemberService = require('./team-member-service');
const teamMembersRouter = express.Router();

teamMembersRouter.get('/', requireAuth, (req, res, next) => {
    const db = req.app.get('db');
    const user = req.user.id;

    teamMemberService.findGroupByAdminId(db, user)
        .then(group => {
            if (!group) {
                return res.status(404).json({
                    error: 'There was no group found for this account.'
                })
            }
            return group;
        })
        .then(group => {
            return teamMemberService.getAllTeamMembers(db, group.id)
                .then(members => {
                    if (members.length === 0) {
                        return res.status(404).json({
                            error: 'There are no members for this team.'
                        })
                    }
                    return res.json(members)
                })
        })
})

module.exports = teamMembersRouter;