const { Entree, ArticlesEntree, ArticleDepot, Article } = require('../models');
const { Op } = require('sequelize');
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");



const ajouterEntree = async (req, res) => {
  try {
    const { codeDepot, dateEntree, articles } = req.body;

    if (!codeDepot || !dateEntree || !Array.isArray(articles) || articles.length === 0) {
      return res.status(400).json({ message: "Champs manquants ou articles vides." });
    }

    // 1. Créer l'entrée principale
    const entree = await Entree.create({
      
      dateEntree,
      codeDepot
    });

    // 2. Pour chaque article, ajouter dans ArticlesEntree et mettre à jour le stock
    for (const article of articles) {
      const { codeArticle, quantiteEntree, commentaire } = article;

      if (!codeArticle || isNaN(parseFloat(quantiteEntree))) continue; // ignorer article invalide

      const quantite = parseFloat(quantiteEntree);

      await ArticlesEntree.create({
        codeEntree: entree.codeEntree,
        codeArticle,
        quantiteEntree: quantite,
        commentaire
      });

      // Mettre à jour stock
      const articleDepot = await ArticleDepot.findOne({ where: { codeArticle, codeDepot } });

      if (articleDepot) {
        articleDepot.quantiteStockee += quantite;
        await articleDepot.save();
      }
    }

    res.status(201).json({ message: "Entrée enregistrée avec les articles." });

  // } catch (error) {
  //   console.error("❌ Erreur ajout entrée :", error);
  //   res.status(500).json({ message: "Erreur serveur." });
  // }
  } catch (error) {
  console.error("❌ Erreur ajout entrée (détails) :", error);
  console.error(error.stack);
  return res.status(500).json({ message: "Erreur serveur." });
}

};

module.exports = { ajouterEntree };





// exports.importerEntreesDepuisExcel = async (req, res) => {
//     try {
//         const file = req.file;
//         const { dateEntree } = req.body;

//         if (!file) return res.status(400).json({ message: "Aucun fichier reçu." });
//         if (!dateEntree) return res.status(400).json({ message: "La date d'entrée est obligatoire." });

//         const workbook = xlsx.readFile(file.path);
//         const sheetName = workbook.SheetNames[0];
//         const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

//         const entreesValides = data.filter(row =>
//             row.codeArticle && row.codeEntree && row.quantiteEntree
//         );

//         if (entreesValides.length === 0) {
//             return res.status(400).json({ message: "Aucune ligne valide trouvée." });
//         }

//         const results = [];
//         for (const row of entreesValides) {
//             const created = await ArticlesEntree.create({
//                 codeArticle: row.codeArticle,
//                 codeEntree: row.codeEntree,
//                 quantiteEntree: row.quantiteEntree,
//                 commentaire: row.commentaire || "",
//                 dateEntree: new Date(dateEntree),
//             });
//             results.push(created);
//         }

//         return res.status(200).json({ message: "Importation réussie", data: results });
//     } catch (error) {
//         console.error("Erreur d'importation :", error);
//         return res.status(500).json({ message: "Erreur serveur" });
//     }
// };




