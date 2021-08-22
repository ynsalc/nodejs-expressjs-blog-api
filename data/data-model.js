const db = require("./db");

module.exports = {
  getUsers,
  getCategories,
  getPosts,
  getPostById,
  getUserById,
  getCategoryById,
  addCategory,
  addPost,
  updatePost,
  deletePost,
  deleteCategory,
  registerUser,
  loginUser,
  getPostByCategoryId,
};

function getUsers() {
  return db("user");
}

function getCategories() {
  return db("category");
}

function getPosts() {
  return db("post");
}

function getPostById(id) {
  return db("post").where({ id }).first();
}

function getUserById(id) {
  return db("user").where({ id }).first();
}

function getCategoryById(id) {
  return db("category").where({ id }).first();
}

function addCategory(newCategory) {
  return db("category")
    .insert(newCategory, "id")
    .then(([id]) => {
      return db("category").where({ id }).first();
    });
}

function addPost(newPost) {
  return db("post")
    .insert(newPost, "id")
    .then(([id]) => {
      return db("post").where({ id }).first();
    });
}

function updatePost(updatePost, id) {
  return db("post")
    .update(updatePost)
    .where({ id })
    .then((updated) => {
      if (updated) {
        return db("post").where({ id }).first();
      }
    });
}

function deletePost(id) {
  return db("post").del().where({ id });
}

function deleteCategory(id) {
  return db("category").del().where({ id });
}

function registerUser(newUser) {
  return db("user")
    .insert(newUser, "id")
    .then(([id]) => {
      return db("user").where({ id }).first();
    });
}

function loginUser(user) {
  return db("user").where(user).first();
}

function getPostByCategoryId(categoryId) {
  return db("post")
    .where({ categoryId })
    .then((data) => {
      if (data) {
        return db("post").where({ categoryId });
      }
    });
}
