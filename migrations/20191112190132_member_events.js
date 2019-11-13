
exports.up = function (knex) {
    return knex.schema.createTable('member_events', (memberEvent) => {
        memberEvent.integer('member_id').references('members.id').onDelete('cascade');
        memberEvent.integer('event_id').references('events.id').onDelete('cascade');
        memberEvent.string('event_role');
        memberEvent.primary(['member_id', 'event_id']);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('member_events');
};
