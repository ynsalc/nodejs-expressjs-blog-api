
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {id: 1, category_name: 'Software'},
        {id: 2, category_name: 'Technology'},
        {id: 3, category_name: 'Science'}
      ]);
    });
};
