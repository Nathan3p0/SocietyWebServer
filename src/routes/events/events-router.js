const express = require('express');
const jsonBodyParser = express.json();
const path = require('path');
const requireAuth = require('../../middleware/jwt-auth');
const eventsService = require('./events-service');
const eventsRouter = express.Router();

eventsRouter.get('/', requireAuth, (req, res, next) => {
    const db = req.app.get('db');

    eventsService.findGroupByAdminId(db, req.user.id)
        .then(group => {
            if (!group.id) {
                return res.status(404).json({
                    error: `There was no group found.`
                })
            }
            return eventsService.findEventsByGroupId(db, group.id)
                .then(events => {
                    if (!events || events.length === 0) {
                        return res.status(404).json({
                            error: 'There were no events found.'
                        })
                    }
                    return res.status(200).json({
                        events,
                        name: req.user.full_name,
                        group: group.group_name
                    })
                })
        })
})

eventsRouter.post('/', requireAuth, jsonBodyParser, (req, res, next) => {
    const { event_date, event_time, event_name, event_description, event_location } = req.body;
    const db = req.app.get('db');

    for (const field of ['event_date', 'event_time', 'event_name', 'event_description', 'event_location']) {
        if (!req.body[field]) {
            return res.status(400).json({
                error: `Please enter a ${field}`
            })
        }
    }

    const newEvent = {
        event_date,
        event_time,
        event_name,
        event_description,
        event_location
    }

    eventsService.findGroupByAdminId(db, req.user.id)
        .then(group => {
            if (!group.id) {
                return res.status(404).json({
                    error: `There was no group found.`
                })
            }
            return group;
        })
        .then(group => {
            newEvent.event_group = group.id;

            return eventsService.postEventsByGroupId(db, group.id, newEvent)
                .then(event => {
                    return res
                        .status(201)
                        .location(path.posix.join(req.originalUrl, `/${event.id}`))
                        .json(eventsService.serializeEvent(event))
                }
                )
        })
})

eventsRouter.get('/:id', requireAuth, (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get('db');

    eventsService.findEventById(db, id)
        .then(event => {
            if (!event) {
                return res.status(404).json({
                    error: 'There was no event found'
                })
            }

            return res.status(200).json(eventsService.serializeEvent(event));
        })
})

eventsRouter.get('/members', requireAuth, (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.user;

    eventsService.findGroupByUserId(db, id)
        .then(group => {
            if (group.length === 0) {
                return res.status(404).json({
                    error: `There was no group found.`
                })
            }
            return eventsService.findEventsByGroupId(db, group[0].id)
                .then(events => {
                    if (!events || events.length === 0) {
                        return res.status(404).json({
                            error: 'There were no events found.'
                        })
                    }
                    return res.status(200).json({
                        events,
                        name: req.user.full_name,
                        group: group[0].group_name
                    })
                })
        })
})

eventsRouter.post('/members', requireAuth, jsonBodyParser, (req, res, next) => {
    const { event_id, event_role } = req.body;
    const db = req.app.get('db');
    const member_id = req.user.id;

    for (const field of ['event_id', 'event_role']) {
        if (!req.body[field]) {
            return res.status(400).json({
                error: `You are missing ${field}`
            })
        }
    }

    const newRsvp = {
        member_id: member_id,
        event_id: event_id,
        event_role: event_role
    }

    eventsService.postNewRsvp(db, newRsvp)
        .then(rsvp => {
            return res.status(201).json(rsvp)
        })

})

eventsRouter.get('/members/:id', requireAuth, (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;

    eventsService.getMembersAttendingByEventId(db, id)
        .then(members => {
            if (members.length === 0) {
                return res.status(404).json({
                    error: 'We could not find anyone attending this event.'
                })
            }
            const serializedMembers = members.map(member => eventsService.serializeMember(member))
            res.json(serializedMembers)
        })
})

module.exports = eventsRouter;

