const { Depot, Article, ArticleDepot } = require('../models');


//lister les depots avec leurs article et stock 
exports.getDepotsAvecArticles = async (req, res) => {
  try {
    const depots = await Depot.findAll({
      include: {
        model: Article,
        through: {
          attributes: ['quantiteStockee', 'stockMax', 'stockAlert']
        }
      }
    });

    res.status(200).json(depots);
  } catch (error) {
    console.error("Erreur récupération dépôts avec articles :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};





// exports.getArticlesByDepot = async (req, res) => {
//   const depotId = req.params.depotId;

//   try {
//     // On cherche le dépôt avec l'id donné, et on inclut ses articles
//     const depot = await Depot.findByPk(depotId, {
//       include: {
//         model: Article,
//         through: {
//           attributes: ['quantiteStockee', 'stockMax', 'stockAlert'] // infos stock dans la table de liaison
//         }
//       }
//     });

//     if (!depot) {
//       return res.status(404).json({ message: "Dépôt non trouvé" });
//     }

//     // On retourne uniquement les articles liés à ce dépôt
//     res.status(200).json(depot.Articles);
//   } catch (error) {
//     console.error("Erreur récupération articles du dépôt :", error);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };










// exports.getArticlesByDepot = async (req, res) => {
//   const depotId = req.params.codeDepot;
//   console.log("🔍 Requête reçue pour récupérer les articles du dépôt :", depotId);

//   try {
//     // Vérification que l'ID du dépôt est bien reçu
//     if (!depotId) {
//       console.warn("⚠️ Aucun ID de dépôt reçu !");
//       return res.status(400).json({ message: "ID de dépôt manquant" });
//     }

//     // On cherche le dépôt avec l'id donné, et on inclut ses articles
//     const depot = await Depot.findByPk(depotId, {
//       include: {
//         model: Article,
//         through: {
//           attributes: ['quantiteStockee', 'stockMax', 'stockAlert'] // infos stock dans la table de liaison
//         }
//       }

//       // include: {
//       //   model: Article,
//       //   as: 'articles', // Utiliser le même alias défini dans la relation
//       //   through: {
//       //     attributes: ['quantiteStockee', 'stockMax', 'stockAlert']
//       //   }
//       //    }
//       });

//     if (!depot) {
//       console.warn("❌ Aucun dépôt trouvé avec cet ID :", depotId);
//       return res.status(404).json({ message: "Dépôt non trouvé" });
//     }

//     console.log("✅ Dépôt trouvé. Nombre d'articles :", depot.Articles?.length || 0);
//     res.status(200).json(depot.Articles);
//   } catch (error) {
//     console.error("💥 Erreur récupération articles du dépôt :", error);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };


exports.getArticlesByDepot = async (req, res) => {
  const depotId = req.params.codeDepot;
  console.log("🔍 Requête reçue pour récupérer les articles du dépôt :", depotId);

  try {
    if (!depotId) {
      console.warn("⚠️ Aucun ID de dépôt reçu !");
      return res.status(400).json({ message: "ID de dépôt manquant" });
    }

    const depot = await Depot.findByPk(depotId, {
      include: {
        model: Article,
        as: 'articles', // ✅ ALIAS requis ici !
        through: {
          attributes: ['quantiteStockee', 'stockMax', 'stockAlert']
        }
      }
    });

    if (!depot) {
      console.warn("❌ Aucun dépôt trouvé avec cet ID :", depotId);
      return res.status(404).json({ message: "Dépôt non trouvé" });
    }

    console.log("✅ Dépôt trouvé. Nombre d'articles :", depot.articles?.length || 0);
    res.status(200).json(depot.articles);
  } catch (error) {
    console.error("💥 Erreur récupération articles du dépôt :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};










// //inserer les valeurs de stock 
// exports.updateStockInfos = async (req, res) => {
//   const { codeArticle, codeDepot } = req.params;
//   const { stockMax, stockAlert,quantiteStockee } = req.body;

//   try {
//     const record = await ArticleDepot.findOne({
//       where: { codeArticle, codeDepot }
//     });

//     if (!record) {
//       return res.status(404).json({ message: "Relation article/dépôt non trouvée." });
//     }

//     record.stockMax = stockMax;
//     record.stockAlert = stockAlert;
//     record.quantiteStockee = quantiteStockee;
//     await record.save();

//     res.status(200).json({ message: "Stock mis à jour avec succès." });
//   } catch (error) {
//     console.error("Erreur mise à jour stock :", error);
//     res.status(500).json({ message: "Erreur serveur." });
//   }
// };


exports.updateStockInfos = async (req, res) => {
  const { codeArticle, codeDepot } = req.params;
  const { stockMax, stockAlert, quantiteStockee } = req.body;

  try {
    const record = await ArticleDepot.findOne({
      where: { codeArticle, codeDepot }
    });

    if (!record) {
      return res.status(404).json({ message: "Relation article/dépôt non trouvée." });
    }

    // On accepte 0, mais on refuse undefined ou null
    if (quantiteStockee === undefined || quantiteStockee === null) {
      return res.status(400).json({ message: "Le champ quantiteStockee est requis." });
    }

    if (stockMax !== undefined) record.stockMax = stockMax;
    if (stockAlert !== undefined) record.stockAlert = stockAlert;
    record.quantiteStockee = quantiteStockee;

    await record.save();

    res.status(200).json({ message: "Stock mis à jour avec succès." });

  } catch (error) {
    console.error("Erreur mise à jour stock :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};









// exports.affecterTousLesArticlesADepots = async () => {
//   try {
//     const articles = await Article.findAll();
//     const depots = await Depot.findAll();

//     for (const depot of depots) {
//       for (const article of articles) {
//         const exist = await ArticleDepot.findOne({
//           where: {
//             codeArticle: article.codeArticle,
//             codeDepot: depot.codeDepot
//           }
//         });

//         if (!exist) {
//           await ArticleDepot.create({
//             codeArticle: article.codeArticle,
//             codeDepot: depot.codeDepot,
//             quantiteStockee: 0,
//             stockMax: 0,
//             stockAlert: 0
//           });
//         }
//       }
//     }

//     console.log('✅ Tous les articles ont été affectés à tous les dépôts.');
//   } catch (err) {
//     console.error('❌ Erreur lors de l’affectation :', err);
//   }
// };









exports.getArticlesUtilisateurConnecte = async (req, res) => {
  const codeUtilisateur = req.user.id;

  try {
    // Étape 1 : Récupérer tous les dépôts affectés à cet utilisateur
    const affectations = await AffectationDepot.findAll({
      where: { codeUtilisateur }
    });

    const codesDepot = affectations.map(a => a.codeDepot);

    if (codesDepot.length === 0) {
      return res.status(404).json({ message: "Aucun dépôt affecté à cet utilisateur." });
    }

    // Étape 2 : Récupérer tous les articles liés à ces dépôts via la table ArticleDepot
    const articles = await Article.findAll({
      include: [
        {
          model: Depot,
          as: 'depots', // IMPORTANT : doit correspondre à l'alias défini dans index.js
          where: { codeDepot: codesDepot },
          through: {
            attributes: ['quantiteStockee', 'stockMax', 'stockAlert']
          }
        }
      ]
    });

    res.status(200).json(articles);
  } catch (error) {
    console.error("💥 Erreur lors de la récupération des articles de l'utilisateur connecté :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};