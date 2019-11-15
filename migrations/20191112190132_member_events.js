
exports.up = function (knex) {
    return knex.schema.createTable('member_events', (memberEvent) => {
        memberEvent.increments();
        memberEvent.integer('member_id').references('members.id').onDelete('cascade');
        memberEvent.integer('event_id').references('events.id').onDelete('cascade');
        memberEvent.string('event_role');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('member_events');
};
