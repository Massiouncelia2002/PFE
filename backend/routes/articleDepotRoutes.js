const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const articleDepotController = require("../controllers/articleDepotController");

router.get("/depots-articles", articleDepotController.getDepotsAvecArticles);

router.get("/demandes/:codeDepot", verifyToken, articleDepotController.getArticlesWithDemandesByDepot);

router.get("/clients-par-article/:codeArticle", verifyToken, articleDepotController.getClientsByArticle);

router.get("/clients-avec-quantiteALivrer/:codeArticle", verifyToken,articleDepotController.getClientsAvecQuantiteALivrer);

router.get("/depots/:codeDepot/articles", articleDepotController.getArticlesByDepot);

router.put("/article-depot/:codeDepot/articles/:codeArticle", articleDepotController.updateStockInfos);

// router.get("/mes-articles", verifyToken, articleDepotController.getArticlesUtilisateurConnecte);



module.exports = router;