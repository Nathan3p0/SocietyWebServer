
exports.up = function (knex) {
    return knex.schema.createTable('group_members', (groupMember) => {
        groupMember.increments();
        groupMember.integer('member_id').references('members.id').onDelete('cascade');
        groupMember.integer('group_id').references('groups.id').onDelete('cascade');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('group_members');
};
