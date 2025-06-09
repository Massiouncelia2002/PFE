const express = require("express");
const router = express.Router();
const UniteController = require("../controllers/uniteDeMesureController");

// GET toutes les unités
router.get("/", UniteController.findAll);

// POST ajouter une unité
router.post("/", UniteController.create);

// DELETE supprimer une unité par id
router.delete("/:id", UniteController.delete);

module.exports = router;
