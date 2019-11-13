
exports.up = function (knex) {
    return knex.schema.createTable('members', (member) => {
        member.increments();
        member.string('username').notNullable();
        member.string('password').notNullable();
        member.string('email').notNullable();
        member.string('phone').notNullable();
        member.timestamp('registered').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('members');
};
