const { Depot, Article, ArticleDepot, CommandeClient, ArticleCommandeClient,AffectationDepot, Client } = require("../models");
const { sequelize } = require("../models");
const { Op } = require("sequelize");


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


/////////////////////////////////////


exports.getArticlesWithDemandesByDepot = async (req, res) => {
  const codeDepot = req.params.codeDepot;

  try {
    if (!codeDepot) {
      return res.status(400).json({ message: "Code dépôt manquant" });
    }

    // 1. Récupérer les articles + stock du dépôt
    const depot = await Depot.findByPk(codeDepot, {
      include: {
        model: Article,
        as: "articles",
        through: {
          attributes: ["quantiteStockee", "stockMax", "stockAlert"]
        }
      }
    });

    if (!depot) {
      return res.status(404).json({ message: "Dépôt introuvable" });
    }

    // 2. Récupérer les clients de ce dépôt
    const clients = await Client.findAll({
      where: { codeDepot },
      attributes: ["codeClient"]
    });
    const codesClients = clients.map(c => c.codeClient);

    // 3. Pour chaque article, calculer la somme des quantités demandées
    const results = await Promise.all(depot.articles.map(async (article) => {
      const commandes = await ArticleCommandeClient.findAll({
        include: [{
          model: CommandeClient,
          as: 'commande',
          where: {
            codeClient: {
              [Op.in]: codesClients
            }
          },
          attributes: []
        }],
        where: {
          codeArticle: article.codeArticle
        },
        attributes: [
          [sequelize.fn("SUM", sequelize.col("quantiteDemandee")), "quantiteDemandeeTotale"]
        ],
        raw: true
      });

      //   const quantiteDemandeeTotale = parseFloat(commandes[0]?.quantiteDemandeeTotale || 0);

      //   return {
      //     codeArticle: article.codeArticle,
      //     designation: article.designation,
      //     quantiteStockee: article.ArticleDepot?.quantiteStockee || 0,
      //     quantiteDemandee: quantiteDemandeeTotale,
      //     stockMax: article.ArticleDepot?.stockMax || 0,
      //     stockAlert: article.ArticleDepot?.stockAlert || 0
      //   };
      // }));

      const quantiteDemandeeTotale = parseFloat(commandes[0]?.quantiteDemandeeTotale || 0);

      // ✅ Affichage dans la console
      console.log(`🔢 Article ${article.designation} (${article.codeArticle}) — Quantité demandée : ${quantiteDemandeeTotale}`);

      return {
        codeArticle: article.codeArticle,
        designation: article.designation,
        quantiteStockee: article.ArticleDepot?.quantiteStockee || 0,
        quantiteDemandeeTotale, // ✅ bien nommé dans l'objet de réponse
        stockMax: article.ArticleDepot?.stockMax || 0,
        stockAlert: article.ArticleDepot?.stockAlert || 0
      };
      }));

      res.status(200).json(results);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles avec demandes :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };



  ///////////////////////////////

  exports.getClientsByArticle = async (req, res) => {
  const { codeArticle } = req.params;
  const codeUtilisateur = req.user.id; // utilisateur connecté

  try {
    // Étape 1 : récupérer les dépôts de l'utilisateur connecté
    const affectations = await AffectationDepot.findAll({
      where: { codeUtilisateur }
    });
    const codesDepot = affectations.map(a => a.codeDepot);

    if (codesDepot.length === 0) {
      return res.status(403).json({ message: "Aucun dépôt affecté à cet utilisateur." });
    }

    // Étape 2 : récupérer les clients qui appartiennent à ces dépôts
    const clients = await Client.findAll({
      where: { codeDepot: { [Op.in]: codesDepot } },
      attributes: ["codeClient", "nomClient"]
    });
    const codesClients = clients.map(c => c.codeClient);

    if (codesClients.length === 0) {
      return res.status(404).json({ message: "Aucun client trouvé pour les dépôts de l'utilisateur." });
    }

    // Étape 3 : récupérer les commandes de ces clients pour l'article donné
    const commandes = await ArticleCommandeClient.findAll({
      where: { codeArticle },
      include: [
        {
          model: CommandeClient,
          as: "commande",
          where: { codeClient: { [Op.in]: codesClients } },
          include: [{ model: Client, as: "client" }]
        }
      ]
    });

    // Étape 4 : formater le résultat
    const result = commandes.map(cmd => ({
      codeCommande: cmd.commande.codeCommande, 
      codeClient: cmd.commande.client.codeClient,
      nomClient: cmd.commande.client.nomClient,
      quantiteDemandee: cmd.quantiteDemandee,
      dateCommande: cmd.commande.dateCommande
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur récupération clients par article :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/////////////////////////////////////


// exports.getClientsAvecQuantiteALivrer = async (req, res) => {
//   const { codeArticle } = req.params;

//   try {
//     // 1. Récupérer toutes les lignes de commandes de clients pour l'article
//     const commandes = await ArticleCommandeClient.findAll({
//       where: { codeArticle },
//       include: [{ model: Client }],
//     });

//     if (!commandes.length) {
//       return res.status(404).json({ message: "Aucune commande trouvée." });
//     }

//     // 2. Répartition (exemple simple : 80% de la quantité demandée comme règle de partage)
//     const repartition = commandes.map((cmd) => ({
//       codeClient: cmd.codeClient,
//       nomClient: cmd.Client.nomClient,
//       codeCommande: cmd.codeCommande,
//       dateCommande: cmd.dateCommande,
//       quantiteDemandee: cmd.quantiteDemandee,
//       quantiteALivrer: Math.floor(cmd.quantiteDemandee * 0.8), // règle fictive à adapter
//     }));

//     res.json(repartition);
//   } catch (err) {
//     console.error("Erreur récupération clients avec quantiteALivrer :", err);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };




exports.getClientsAvecQuantiteALivrer = async (req, res) => {
  const { codeArticle } = req.params;

  try {
    const commandes = await ArticleCommandeClient.findAll({
      where: { codeArticle },
      include: [
        {
          model: CommandeClient,
          as: "commande", // 🔁 mets le même alias que dans la définition du modèle
          include: [
            {
              model: Client,
              as: "client", // 🔁 pareil, selon ton alias défini
            }
          ]
        }
      ]
    });

    if (!commandes.length) {
      return res.status(404).json({ message: "Aucune commande trouvée." });
    }

    // 🎯 Répartition simulée
    const repartition = commandes.map((cmd) => ({
      codeClient: cmd.commande.client.codeClient,
      nomClient: cmd.commande.client.nomClient,
      codeCommande: cmd.codeCommande,
      dateCommande: cmd.commande.dateCommande,
      quantiteDemandee: cmd.quantiteDemandee,
      quantiteALivrer: cmd.quantiteALivrer,
    }));

    res.json(repartition);
  } catch (err) {
    console.error("❌ Erreur récupération clients avec quantiteALivrer :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/////////////////////////////////////////////////


































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