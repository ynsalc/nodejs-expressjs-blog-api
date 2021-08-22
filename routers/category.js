const router = require("express").Router();
const Category = require("../data/data-model");

router.get("/", (req, res, next) => {
  Category.getCategories().then((category) => {
    res.status(200).json(category);
  })
  .catch((error) => {
    next({
      statusCode: 500,
      errorMessage: "Kategoriler listelenirken hata oluştu.",
      error,
    });
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Category.getCategoryById(id)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Bu id değerine sahip kategori mevcut değil.",
        error,
      });
    });
});

router.post("/", (req, res, next) => {
  const addedCategory = req.body;
  Category.addCategory(addedCategory)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Kategori eklenirken hata oluştu.",
        error,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  Category.getCategoryById(id)
    .then((deleteCategory) => {
      Category.deleteCategory(id)
        .then((deleted) => {
          if (deleted) {
            res.status(204).end();
          }
        })
        .catch((error) => {
          next({
            statusCode: 500,
            errorMessage: "Kategori silinirken bir hata oluştu",
            error,
          });
        });
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Kategori bulunamadı",
        error,
      });
    });
});

module.exports = router;
