
exports.up = function (knex) {
    return knex.schema.createTable('group_members', (groupMember) => {
        groupMember.integer('member_id').references('members.id').onDelete('cascade');
        groupMember.integer('group_id').references('groups.id').onDelete('cascade');
        groupMember.integer('group_admin').references('members.id').onDelete('cascade');
        groupMember.primary(['member_id', 'group_id']);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('group_members');
};
