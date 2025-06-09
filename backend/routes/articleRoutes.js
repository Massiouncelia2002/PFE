const express = require("express");
const router = express.Router();
const { getArticleById,getArticles, addArticle,updateArticle,deleteArticle} = require("../controllers/articleController");



router.get('/', getArticles);
router.post("/", addArticle);
router.get('/:codeArticle', getArticleById);
router.put("/:codeArticle", updateArticle);
router.delete("/:codeArticle", deleteArticle);

module.exports = router;
