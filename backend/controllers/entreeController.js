const { Entree, ArticlesEntree, ArticleDepot, Article } = require('../models');
const { Op } = require('sequelize');




// const ajouterEntree = async (req, res) => {
//   try {
//     const { codeDepot, dateEntree, articles } = req.body;

//     // Vérifications de base
//     if (!codeDepot || !dateEntree || !Array.isArray(articles) || articles.length === 0) {
//       return res.status(400).json({ message: "Champs requis manquants ou invalides." });
//     }

//     // Créer l'entrée principale
//     const entree = await Entree.create({ codeDepot, dateEntree });

//     // Pour chaque article, insérer dans ArticlesEntree et mettre à jour ArticleDepot
//     for (const article of articles) {
//       const { codeArticle, quantiteEntree, commentaire } = article;

//       if (!codeArticle || !quantiteEntree || isNaN(quantiteEntree) || quantiteEntree <= 0) {
//         continue; // ignorer les lignes incorrectes
//       }

//       // Créer la liaison dans la table ArticlesEntree
//       await ArticlesEntree.create({
//         codeArticle,
//         codeEntree: entree.codeEntree,
//         quantiteEntree,
//         commentaire
//       });

//       // Mettre à jour le stock dans ArticleDepot
//       const articleDepot = await ArticleDepot.findOne({
//         where: { codeArticle, codeDepot }
//       });

//       if (articleDepot) {
//         articleDepot.quantiteStockee += parseFloat(quantiteEntree);
//         await articleDepot.save();
//       }
//     }

//     res.status(201).json({ message: "Entrée et articles enregistrés avec succès." });

//   } catch (error) {
//     console.error("Erreur ajout entrée :", error);
//     res.status(500).json({ message: "Erreur serveur." });
//   }
// };

// module.exports = { ajouterEntree };




// const ajouterEntree = async (req, res) => {
//   try {
//     const { codeArticle, codeDepot, quantiteEntree, dateEntree, commentaire } = req.body;

//     if (!codeArticle || !codeDepot || !quantiteEntree || !dateEntree) {
//       return res.status(400).json({ message: "Champs manquants." });
//     }

//     // ✅ Étape 1 : créer l'entrée sans mettre de codeEntree manuellement
//     const entree = await Entree.create({
//       dateEntree,
//       codeDepot
//     });

//     // ✅ Étape 2 : associer les articles à l'entrée
//     await ArticlesEntree.create({
//       codeEntree: entree.codeEntree,
//       codeArticle,
//       quantiteEntree,
//       commentaire
//     });

//     // ✅ Étape 3 : mettre à jour le stock
//     const articleDepot = await ArticleDepot.findOne({
//       where: { codeArticle, codeDepot }
//     });

//     if (!articleDepot) {
//       return res.status(404).json({ message: "Article non trouvé dans ce dépôt." });
//     }

//     articleDepot.quantiteStockee += parseFloat(quantiteEntree);
//     await articleDepot.save();

//     res.status(201).json({ message: "Entrée enregistrée avec succès." });
//   } catch (error) {
//     console.error("Erreur ajout entrée :", error);
//     res.status(500).json({ message: "Erreur serveur." });
//   }
// };
// module.exports = { ajouterEntree };





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





// const ajouterEntree = async (req, res) => {
//   try {
//     const { codeArticle, codeDepot, quantiteEntree, dateEntree, commentaire } = req.body;

//     // Vérifier que les champs nécessaires sont là
//     if (!codeArticle || !codeDepot || !quantiteEntree || !dateEntree) {
//       return res.status(400).json({ message: "Champs manquants." });
//     }

//     // 1. Créer l'entrée
//     await Entree.create({
//       codeArticle,
//       codeDepot,
//       quantiteEntree,
//       dateEntree,
//       commentaire
//     });

//     // 2. Mettre à jour quantiteStockee dans ArticleDepot
//     const articleDepot = await ArticleDepot.findOne({
//       where: { codeArticle, codeDepot }
//     });

//     if (!articleDepot) {
//       return res.status(404).json({ message: "Article non trouvé dans ce dépôt." });
//     }

//     articleDepot.quantiteStockee += parseFloat(quantiteEntree);
//     await articleDepot.save();

//     res.status(201).json({ message: "Entrée ajoutée et stock mis à jour." });

//   } catch (error) {
//     console.error("Erreur ajout entrée :", error);
//     res.status(500).json({ message: "Erreur serveur." });
//   }
// };

// module.exports = { ajouterEntree };

