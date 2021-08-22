const router = require("express").Router();
const Post = require("../data/data-model");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", (req, res, next) => {
  Post.getPosts()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Postlar listelenirken hata oluştu",
        error,
      });
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Post.getPostById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Bu id değerine sahip post mevcut değil.",
        error,
      });
    });
});

router.post("/", upload.single("image"), (req, res, next) => {
  const addedPost = req.body;
  addedPost.image = req.file.filename;
  console.log(req.file)
  Post.addPost(addedPost)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Post eklenirken bir hata oluştu",
        error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  let updatedData = req.body;
  Post.updatePost(updatedData, id)
    .then((updated) => {
      res.status(200).json(updated);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Post güncellenirken bir hata oluştu",
        error,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  Post.getPostById(id)
    .then((deletePost) => {
      Post.deletePost(id)
        .then((deleted) => {
          if (deleted) {
            res.status(204).end();
          }
        })
        .catch((error) => {
          next({
            statusCode: 500,
            errorMessage: "Post silinirken bir hata oluştu",
            error,
          });
        });
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Post bulunamadı",
        error,
      });
    });
});

router.get("/category/:id", (req, res, next) => {
  let postBody = req.body;
  let categoryId = parseInt(postBody.category_id);
  console.log(categoryId)
  Post.getPostByCategoryId(categoryId)
    .then((data) => {
      console.log(data)
      res.status(200).json(data);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Kategoriye göre ürünler listelenemedi",
        error,
      });
    });
});

module.exports = router;
