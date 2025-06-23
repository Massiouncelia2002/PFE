const express = require("express");
const router = express.Router();
const commandePlanifieController = require("../controllers/commandePlanifieController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/planification/partager-commandes", commandePlanifieController.partagerCommandes);

router.post("/planification/affecter", verifyToken,commandePlanifieController.planifierCommande);

module.exports = router;
