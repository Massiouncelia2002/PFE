const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CommandePlanifie } = require("../models");
const { Op } = require("sequelize");
const vehiculeController = require("../controllers/vehiculeController");


const upload = multer({ storage: multer.memoryStorage() });

router.post("/", vehiculeController.createVehicule);
router.get("/", vehiculeController.getVehicules);
router.get("/:matricule", vehiculeController.getVehiculeByMatricule); 
router.put("/:matricule", vehiculeController.updateVehicule);  
router.delete("/:matricule", vehiculeController.deleteVehicule); 


router.post("/import/excel", upload.single("file"), vehiculeController.importVehiculesFromExcel);


router.put('/:matricule/statut', vehiculeController.updateStatut);


router.get("/:matricule/plages-occupees", async (req, res) => {
  const { matricule } = req.params;

  try {
    const plages = await CommandePlanifie.findAll({
      where: {
        matricule,
        statutLivraison: { [Op.notIn]: ["annule"] } // on exclut les annulations
      },
      attributes: ["datePrevue", "heurePrevue", "dureePrevue"]
    });

    const result = plages.map((p) => {
      const [h, m] = p.heurePrevue.split(":").map(Number);
      const [dh, dm] = p.dureePrevue.includes(":")
        ? p.dureePrevue.split(":").map(Number)
        : [parseInt(p.dureePrevue), 0];

      const start = new Date(p.datePrevue);
      start.setHours(h, m, 0);

      const end = new Date(start);
      end.setHours(end.getHours() + dh);
      end.setMinutes(end.getMinutes() + dm);

      return {
        date: p.datePrevue,
        heureDebut: p.heurePrevue,
        duree: p.dureePrevue,
        heureFin: end.toTimeString().slice(0, 5) // format HH:MM
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur récupération plages occupées:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
