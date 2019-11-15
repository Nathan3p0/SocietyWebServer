const express = require('express');
const uuidv4 = require('uuid/v4');
const path = require('path');
const signUpServices = require('./signup-service');
const jsonBodyParser = express.json();
const signupRouter = express.Router();

signupRouter.post('/admin', jsonBodyParser, (req, res, next) => {
    const { full_name, username, password, email, phone, group_name } = req.body;
    const db = req.app.get('db');

    for (const field of ['full_name', 'username', 'password', 'email', 'phone', 'group_name']) {
        if (!req.body[field]) {
            return res.status(400).json(
                { error: `Please enter a ${field}` }
            )
        }
    }

    const isPasswordValid = signUpServices.validatePassword(password);

    if (isPasswordValid) {
        return res.status(400).json({
            error: isPasswordValid
        });
    }

    signUpServices.hasUserWithUsername(db, username)
        .then(hasUserWithUsername => {
            if (hasUserWithUsername) {
                return res.status(400).json(
                    { error: 'Username is already taken.' }
                );
            }
            return signUpServices.hasGroupWithGroupName(db, group_name)
                .then(hasGroupWithGroupName => {
                    if (hasGroupWithGroupName) {
                        return res.status(400).json(
                            { error: 'Club name is already taken.' }
                        );
                    }

                    return signUpServices.hashPassword(password)
                        .then(hashedPassword => {
                            const newAdmin = {
                                full_name,
                                username,
                                password: hashedPassword,
                                email,
                                phone
                            }

                            return signUpServices.insertMember(db, newAdmin)
                                .then(admin => {
                                    return admin;
                                })
                                .then(admin => {
                                    const newGroup = {
                                        group_name,
                                        group_admin: admin.id,
                                        invite_code: uuidv4()
                                    }

                                    return signUpServices.insertGroup(db, newGroup)
                                        .then(group => {
                                            return res.status(201)
                                                .location(path.posix.join(req.originalUrl, `/admin/${admin.id}`))
                                                .json(signUpServices.serializeMember(admin))
                                        });
                                })
                        })
                })
        })
        .catch(next);


})

signupRouter.post('/member', jsonBodyParser, (req, res, next) => {
    const { full_name, username, password, email, phone, invite_code } = req.body;
    const db = req.app.get('db');

    for (const field of ['full_name', 'username', 'password', 'email', 'phone', 'invite_code']) {
        if (!req.body[field]) {
            return res.status(400).json(
                { error: `Please enter a ${field}` }
            )
        }
    }

    const isPasswordValid = signUpServices.validatePassword(password);

    if (isPasswordValid) {
        return res.status(400).json({
            error: isPasswordValid
        });
    }

    signUpServices.hasUserWithUsername(db, username)
        .then(hasUserWithUsername => {
            if (hasUserWithUsername) {
                return res.status(400).json({
                    error: 'This username is already taken.'
                });
            }
            return signUpServices.hashPassword(password)
                .then(hashedPassword => {
                    const newMember = {
                        full_name,
                        username,
                        password: hashedPassword,
                        email,
                        phone
                    }
                    return signUpServices.findGroupIdByCode(db, invite_code)
                        .then(group => {
                            return signUpServices.insertMember(db, newMember)
                                .then(member => {
                                    const groupMember = {
                                        member_id: member.id,
                                        group_id: group.id
                                    }
                                    const newMember = member;
                                    return signUpServices.insertGroupMember(db, groupMember)
                                        .then(member => {
                                            return res.status(201)
                                                .location(path.posix.join(req.originalUrl, `/member/${newMember.id}`))
                                                .json(signUpServices.serializeMember(newMember))
                                        })
                                })
                        })
                })
        })
})

module.exports = signupRouter;

