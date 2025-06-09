const express = require("express");
const router = express.Router();
const multer = require("multer");
const depotController = require("../controllers/depot.controller");



const upload = multer({ storage: multer.memoryStorage() });

router.post("/", depotController.createDepot);
router.get("/", depotController.getDepots);

router.put("/:codeDepot", depotController.updateDepot);  
router.delete("/:codeDepot", depotController.deleteDepot);
router.post('/affecter-multiple', depotController.affecterUtilisateurMultiple);
router.get("/check/:codeDepot/:role", depotController.checkDepotStatut);
router.get('/utilisateurs-avec-depots', depotController.getUtilisateursAvecDepots);

router.get("/:codeDepot", depotController.getDepotByCode); 

router.post("/import/excel", upload.single("file"), depotController.importDepotsFromExcel);

router.post('/affecter-article', depotController.affecterArticlesADepots);

module.exports = router;
