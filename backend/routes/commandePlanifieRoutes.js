const express = require("express");
const router = express.Router();
const commandePlanifieController = require("../controllers/commandePlanifieController");

router.post("/planifier", commandePlanifieController.planifierCommande);

module.exports = router;
