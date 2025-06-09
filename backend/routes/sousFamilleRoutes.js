const express = require("express");
const router = express.Router();
const sousFamilleController = require("../controllers/sousFamilleController");

router.get("/", sousFamilleController.getSousFamilles);
router.post("/", sousFamilleController.createSousFamille);
router.get("/:code", sousFamilleController.getSousFamilleById);
router.put("/:code", sousFamilleController.updateSousFamille);
router.delete("/:code", sousFamilleController.deleteSousFamille);


module.exports = router;
