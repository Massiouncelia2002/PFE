const express = require("express");
const router = express.Router();
const livraisonController = require("../controllers/livraisonController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/affecter-vehicules", verifyToken, livraisonController.affecterVehicules);
router.get("/vehicules-disponibles", verifyToken, livraisonController.getVehiculesDisponiblesPourPlage);

module.exports = router;