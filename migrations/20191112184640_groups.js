
exports.up = function (knex) {
    return knex.schema.createTable('groups', (group) => {
        group.increments();
        group.string('group_name').notNullable();
        group.string('invite_code').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('groups');
};
