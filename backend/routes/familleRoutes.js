const express = require("express");
const router = express.Router();
const familleController = require('../controllers/familleController');


router.get("/with-sous-familles", familleController.getFamillesWithSousFamilles);
router.get("/", familleController.getFamilles);
router.post("/", familleController.createFamille);
router.get("/:code", familleController.getFamilleById);
router.put("/:code", familleController.updateFamille);
router.delete("/:code", familleController.deleteFamille);




  




module.exports = router;
