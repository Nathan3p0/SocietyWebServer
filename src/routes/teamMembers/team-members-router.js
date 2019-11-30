const express = require('express');
const xss = require('xss');
const requireAuth = require('../../middleware/jwt-auth');
const teamMemberService = require('./team-member-service');
const teamMembersRouter = express.Router();

teamMembersRouter.get('/member', requireAuth, (req, res, next) => {
    const db = req.app.get('db');
    const user = req.user;

    teamMemberService.findGroupByAdminId(db, user.id)
        .then(group => {
            if (!group) {
                return res.status(404).json({
                    error: 'There was no group found for this account.'
                });
            }
            return res.status(200).json({
                group_name: xss(group.group_name),
                name: xss(user.full_name)
            })
        })
})

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