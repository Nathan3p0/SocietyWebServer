
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('member_events').del()
    .then(function () {
      // Inserts seed entries
      return knex('member_events').insert([
        { member_id: 1, event_id: 1, event_role: 'Volunteer' }
      ]);
    });
};
