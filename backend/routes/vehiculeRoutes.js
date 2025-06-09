const express = require("express");
const router = express.Router();
const multer = require("multer");
const vehiculeController = require("../controllers/vehiculeController");


const upload = multer({ storage: multer.memoryStorage() });

router.post("/", vehiculeController.createVehicule);
router.get("/", vehiculeController.getVehicules);
router.get("/:matricule", vehiculeController.getVehiculeByMatricule); 
router.put("/:matricule", vehiculeController.updateVehicule);  
router.delete("/:matricule", vehiculeController.deleteVehicule); 


router.post("/import/excel", upload.single("file"), vehiculeController.importVehiculesFromExcel);

module.exports = router;
