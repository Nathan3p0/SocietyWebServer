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
                return res.status(400).json({
                    error: `There was no group found.`
                })
            }
            return eventsService.findEventsByGroupId(db, group.id)
                .then(events => {
                    if (!events || events.length === 0) {
                        return res.status(400).json({
                            error: 'There were no events found.'
                        })
                    }
                    return res.status(200).json({ events })
                })
        })
})

eventsRouter.post('/', requireAuth, jsonBodyParser, (req, res, next) => {
    const { event_date, event_time, event_name, event_description, event_location } = req.body;
    const db = req.app.get('db');
    const user = req.user.id;

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
                return res.status(400).json({
                    error: `There was no group found.`
                })
            }
            return group;
        })
        .then(group => {
            newEvent.event_group = group.id;

            return eventsService.postEventsByGroupId(db, group.id, newEvent)
                .then(event => {
                    console.log(event)
                    return res
                        .status(201)
                        .location(path.posix.join(req.originalUrl, `/${event.id}`))
                        .json(eventsService.serializeEvent(event))
                }
                )
        })
})

module.exports = eventsRouter;

