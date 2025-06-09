const express = require("express");
const router = express.Router();
const articleDepotController = require("../controllers/articleDepotController");

router.get("/depots-articles", articleDepotController.getDepotsAvecArticles);

router.get('/depots/:codeDepot/articles', articleDepotController.getArticlesByDepot);

router.put("/article-depot/:codeDepot/articles/:codeArticle", articleDepotController.updateStockInfos);

module.exports = router;