const router = require("express").Router();
const User = require("../data/data-model");

router.get("/", (req, res, next) => {
  User.getUsers().then((users) => {
    res.status(200).json(users);
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  User.getUserById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Bu id değerine sahip kullanıcı mevcut değil.",
        error,
      });
    });
});

router.post("/register", (req, res, next) => {
  let addedUser = req.body;
  console.log(addedUser);
  User.registerUser(addedUser)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Kullanıcı kayıt olurken hata oluştu.",
        error,
      });
    });
});

router.post("/login/", (req, res, next) => {
  let userBody = req.body;
  console.log(userBody)
  User.loginUser(userBody)
    .then((user) => {
      console.log(user)
      if (user) {
        res
          .status(200)
          .json({ ...user, success: true, message: "Giriş başarılı" });
      } else {
        res.status(400).json({ success: false, message: "Kullanıcı adı veya şifre hatalı" });
      }
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Kullanıcı Bulunamadı",
        error,
      });
    });
});

module.exports = router;
