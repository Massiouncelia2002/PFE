const express = require("express");
const router = express.Router();
const controller = require("../controllers/articleUniteController");

router.post("/article-unites", controller.ajouterArticleUnites);
router.get("/articles-avec-unites", controller.listerArticlesAvecUnites);

module.exports = router;
