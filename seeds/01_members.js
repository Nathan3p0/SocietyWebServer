
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('members').del()
    .then(function () {
      // Inserts seed entries
      return knex('members').insert([
        { username: 'nathan3p0', full_name: 'Nathan Szelag', password: '$2a$10$PTspYAd9L5oF.3hUkSxkxesh6t8tO8nBk9pLs33tRKPqR6vet2meO', email: 'nszelag@live.com', phone: '7346735101' },
        { username: 'doragil', full_name: 'Dora', password: '$2a$10$Huk2vI1YglHKRBE6KoXcmO0Gs/E9iNDBlKbO2iPeJ4.cxkmaj0aVe', email: 'thinkful@doragil.me', phone: '5959595959' }
      ]);
    });
};
