
exports.up = function (knex) {
    return knex.schema.createTable('events', (event) => {
        event.increments();
        event.date('event_date').notNullable();
        event.time('event_time').notNullable();
        event.string('event_name').notNullable();
        event.string('event_description');
        event.integer('event_group').references('groups.id').onDelete('cascade');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('events');
};
