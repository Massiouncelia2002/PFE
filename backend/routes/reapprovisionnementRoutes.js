const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { ArticleDepot } = require("../models"); // Sequelize

router.get("/reapprovisionnement", async (req, res) => {
  const previsionsPath = path.join(__dirname, "..", "..", "python_scripts", "previsions.csv");
  const results = [];

  fs.createReadStream(previsionsPath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        const rapport = [];

        for (const row of results) {
          const codeArticle = row.codeArticle;
          const mois = row.mois;
          const quantitePrevue = parseFloat(row.quantitePrevue);

          // Chercher le stock actuel dans la base
          const articleDepot = await ArticleDepot.findOne({
            where: { codeArticle }, // adapte si besoin selon ta structure
          });

          if (articleDepot) {
            const stockActuel = articleDepot.quantiteStockee;
            const quantiteACommander = quantitePrevue - stockActuel;

            if (quantiteACommander > 0) {
              rapport.push({
                codeArticle,
                mois,
                quantitePrevue,
                stockActuel,
                quantiteACommander: Math.round(quantiteACommander),
              });
            }
          }
        }

        res.json(rapport);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
      }
    });
});

module.exports = router;
