const express = require("express");
const router = express.Router();
const utilisateurController = require("../controllers/utilisateurController");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: "uploads/" });
const verifyToken = require("../middleware/authMiddleware");

router.get("/profil", verifyToken, utilisateurController.getProfil);


router.post("/import-excel", upload.single("file"), utilisateurController.importerDepuisExcel);
router.post("/", utilisateurController.creerUtilisateur);
router.get("/", utilisateurController.getTousLesUtilisateurs);


router.put("/:codeUtilisateur", utilisateurController.modifierUtilisateur);
router.delete("/:codeUtilisateur", utilisateurController.supprimerUtilisateur);
router.get("/utilisateurs-depot-groupe", utilisateurController.getUtilisateursDepotGroupes);

router.get("/:codeUtilisateur", utilisateurController.getUtilisateurParId);



module.exports = router;
