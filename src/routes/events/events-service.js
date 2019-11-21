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
    findGroupByUserId(knex, id) {
        return knex.select('groups.group_name', 'groups.id')
            .from('members')
            .join('group_members', { 'members.id': 'group_members.member_id' })
            .join('groups', { 'group_members.group_id': 'groups.id' })
            .where('group_members.member_id', id)
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
    getMembersAttendingByEventId(knex, id) {
        return knex.select('members.username', 'members.full_name', 'members.phone', 'members.email', 'member_events.event_role')
            .from('members')
            .join('member_events', { 'members.id': 'member_events.member_id' })
            .join('events', { 'member_events.event_id': 'events.id' })
            .where('member_events.event_id', id)
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
    },
    serializeMember(member) {
        return {
            username: xss(member.username),
            full_name: xss(member.full_name),
            phone: xss(member.phone),
            email: xss(member.email),
            event_role: xss(member.event_role)
        }
    }
}

module.exports = eventsService;