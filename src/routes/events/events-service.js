const xss = require('xss');

const eventsService = {
    findGroupByAdminId(knex, id) {
        return knex('groups')
            .where('group_admin', id)
            .first()
    },
    findEventsByGroupId(knex, id) {
        return knex('events')
            .where('event_group', id)
    },
    postEventsByGroupId(knex, id, newEvent) {
        return knex('events')
            .insert(newEvent)
            .where('event_group', id)
            .returning('*')
            .then(([event]) => {
                return event;
            })
    },
    serializeEvent(event) {
        return {
            id: event.id,
            event_date: xss(event.event_date),
            event_time: xss(event.event_time),
            event_name: xss(event.event_name),
            event_description: xss(event.event_description),
            event_location: xss(event.event_location),
            event_group: event.event_group
        }
    }
}

module.exports = eventsService;