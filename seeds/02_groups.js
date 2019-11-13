const uuidv4 = require('uuid/v4')
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups').insert([
        { group_name: 'The Slime Society', invite_code: uuidv4(), group_admin: 2 },
        { group_name: 'Troop 40197', invite_code: uuidv4(), group_admin: 1 }
      ]);
    });
};
