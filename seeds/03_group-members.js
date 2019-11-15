
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('group_members').del()
    .then(function () {
      // Inserts seed entries
      return knex('group_members').insert([
        { member_id: 1, group_id: 1 },
        { member_id: 2, group_id: 1 }
      ]);
    });
};
