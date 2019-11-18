
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        { event_date: '12/01/2019', event_time: '12:00:00', event_name: 'Slime Fest 2019', event_description: 'The biggest slime convention in the world.', event_location: 'Kroger', event_group: 1 }
      ]);
    });
};
