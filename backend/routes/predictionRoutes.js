// backend/routes/prediction.routes.js

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { AffectationDepot, Article, Depot } = require("../models");
const verifyToken = require("../middleware/authMiddleware");





// NOUVELLE ROUTE - GET /api/prediction/previsions/utilisateur
router.get("/previsions/utilisateur", verifyToken, async (req, res) => {
  try {
    const codeUtilisateur = req.user.id;

    const affectations = await AffectationDepot.findAll({ where: { codeUtilisateur } });
    const codesDepot = affectations.map(a => a.codeDepot);

    if (codesDepot.length === 0) {
      return res.status(404).json({ message: "Aucun dépôt affecté à cet utilisateur." });
    }

    const articles = await Article.findAll({
      include: [{
        model: Depot,
        as: "depots",
        where: { codeDepot: codesDepot },
        through: { attributes: [] }
      }]
    });

    const codesArticle = articles.map(a => a.codeArticle);
    const results = [];
    const csvPath = path.join(__dirname, "..", "..", "python_scripts", "previsions.csv");

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        // if (codesArticle.includes(row.codeArticle)) {
        //   results.push(row);
        // }
        if (
          codesArticle.includes(row.codeArticle) &&
          codesDepot.includes(row.codeDepot)
        ) {
          results.push(row);
        }
      })
      .on("end", () => res.json(results))
      .on("error", (err) => {
        console.error("Erreur lecture fichier:", err);
        res.status(500).json({ error: "Erreur lecture CSV" });
      });

  } catch (error) {
    console.error("Erreur prévisions utilisateur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});




// NOUVELLE ROUTE - GET /api/prediction/historique/utilisateur
router.get("/historique/utilisateur", verifyToken, async (req, res) => {
  try {
    const codeUtilisateur = req.user.id;
    const affectations = await AffectationDepot.findAll({ where: { codeUtilisateur } });
    const codesDepot = affectations.map(a => a.codeDepot);

    const articles = await Article.findAll({
      include: [{
        model: Depot,
        as: "depots",
        where: { codeDepot: codesDepot },
        through: { attributes: [] }
      }]
    });

    const codesArticle = articles.map(a => a.codeArticle);
    const results = [];
    const csvPath = path.join(__dirname, "..", "..", "python_scripts", "data_grouped.csv");

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        // if (codesArticle.includes(row.codeArticle)) {
        //   results.push(row);
        // }
        if (
          codesArticle.includes(row.codeArticle) &&
          codesDepot.includes(row.codeDepot)
        ) {
          results.push(row);
        }
      })
      .on("end", () => res.json(results))
      .on("error", (err) => {
        console.error("Erreur lecture historique:", err);
        res.status(500).json({ error: "Erreur lecture historique" });
      });

  } catch (error) {
    console.error("Erreur historique utilisateur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});




// GET /api/previsions
router.get("/previsions", (req, res) => {
  const results = [];
  const csvPath = path.join(__dirname, "..", "..", "python_scripts", "previsions.csv");

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.json(results);
    })
    .on("error", (err) => {
      console.error("Erreur lors de la lecture du fichier :", err);
      res.status(500).json({ error: "Erreur lecture CSV" });
    });
});






router.get("/historique", (req, res) => {
  const results = [];
  const csvPath = path.join(__dirname, "..", "..", "python_scripts", "data_grouped.csv");


  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => res.json(results))
    .on("error", (err) => {
      console.error("Erreur lecture historique :", err);
      res.status(500).json({ error: "Erreur lecture CSV historique" });
    });
});


module.exports = router;








