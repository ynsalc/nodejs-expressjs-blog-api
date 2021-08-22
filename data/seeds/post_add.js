var d = new Date();
var day = d.getDate();
var year = d.getFullYear();
var month = parseInt(d.getMonth())+1;
var fullDate = day+"/0"+month+"/"+year;
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("post")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("post").insert([
        {
          id: 1,
          title: "React Redux",
          content: "React Redux Content",
          created_at: fullDate,
          category_id: 1,
          user_id: 1,
          image:
            "https://sledsworth.gallerycdn.vsassets.io/extensions/sledsworth/react-redux-es6-snippets/0.5.3/1530106605209/Microsoft.VisualStudio.Services.Icons.Default"
        },
      ]);
    });
};
