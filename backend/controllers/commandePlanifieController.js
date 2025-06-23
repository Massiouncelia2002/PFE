
// const ArticleDepot = require("../models/ArticleDepot");
// const ArticleCommandeClient = require("../models/ArticleCommandeClient");

// exports.partagerCommandes = async (req, res) => {
//   try {
//     const { clients, codeArticle, codeDepot } = req.body;

//     if (!Array.isArray(clients) || !codeArticle || !codeDepot) {
//       return res.status(400).json({ message: "Paramètres manquants." });
//     }

//     // 🔍 Vérifier l'article dans le dépôt
//     const articleDepot = await ArticleDepot.findOne({
//       where: { codeArticle, codeDepot },
//     });

//     if (!articleDepot) {
//       return res.status(404).json({ message: "Article non trouvé dans le dépôt." });
//     }

//     const quantiteStockee = parseFloat(articleDepot.quantiteStockee);

//     // 🔢 Somme des quantités demandées
//     const totalDemandee = clients.reduce((sum, c) => {
//       const q = parseFloat(c.quantiteDemandee);
//       return sum + (isNaN(q) ? 0 : q);
//     }, 0);

//     const repartition = [];

//     for (const client of clients) {
//       const qDemandee = parseFloat(client.quantiteDemandee) || 0;

//       const quantiteALivrer =
//         totalDemandee <= quantiteStockee
//           ? qDemandee
//           : Math.min(qDemandee, Math.floor((qDemandee / totalDemandee) * quantiteStockee));

//       // 🧩 Mise à jour dans la base
//       await ArticleCommandeClient.update(
//         { quantiteALivrer },
//         {
//           where: {
//             codeCommande: client.codeCommande,
//             codeArticle: codeArticle
//           }
//         }
//       );

//       // Ajouter au résultat
//       repartition.push({
//         codeClient: client.codeClient,
//         nomClient: client.nomClient,
//         codeCommande: client.codeCommande,
//         dateCommande: client.dateCommande,
//         quantiteDemandee: qDemandee,
//         quantiteALivrer
//       });
//     }

//     res.json(repartition);
//   } catch (error) {
//     console.error("❌ Erreur de partage :", error);
//     res.status(500).json({ message: "Erreur serveur lors du partage des quantités." });
//   }
// };





const ArticleDepot = require("../models/ArticleDepot");
const ArticleCommandeClient = require("../models/ArticleCommandeClient");

exports.partagerCommandes = async (req, res) => {
  try {
    const { clients, codeArticle, codeDepot } = req.body;

    if (!Array.isArray(clients) || !codeArticle || !codeDepot) {
      return res.status(400).json({ message: "Paramètres manquants." });
    }

    // 🔍 Vérifier l'article dans le dépôt
    const articleDepot = await ArticleDepot.findOne({
      where: { codeArticle, codeDepot },
    });

    if (!articleDepot) {
      return res.status(404).json({ message: "Article non trouvé dans le dépôt." });
    }

    const quantiteStockee = parseFloat(articleDepot.quantiteStockee);

    // 🔢 Somme des quantités demandées
    const totalDemandee = clients.reduce((sum, c) => {
      const q = parseFloat(c.quantiteDemandee);
      return sum + (isNaN(q) ? 0 : q);
    }, 0);

    const repartition = [];

    for (const client of clients) {
      const qDemandee = parseFloat(client.quantiteDemandee) || 0;

      const quantiteALivrer =
        totalDemandee <= quantiteStockee
          ? qDemandee
          : Math.min(qDemandee, Math.floor((qDemandee / totalDemandee) * quantiteStockee));

      // ✅ On ne met plus à jour la BDD ici

      // 📝 On prépare la suggestion à retourner
      repartition.push({
        codeClient: client.codeClient,
        nomClient: client.nomClient,
        codeCommande: client.codeCommande,
        dateCommande: client.dateCommande,
        quantiteDemandee: qDemandee,
        quantiteALivrer: quantiteALivrer
      });
    }

    // ✅ Renvoi des suggestions
    res.json(repartition);
  } catch (error) {
    console.error("❌ Erreur de partage :", error);
    res.status(500).json({ message: "Erreur serveur lors du partage des quantités." });
  }
};





const { Op } = require("sequelize");
const {
  CommandePlanifie, Vehicule, CommandeClient
} = require("../models");

exports.planifierCommande = async (req, res) => {
  try {
    const {
      codeCommande,
      matricule,
      datePrevue,
      heurePrevue,
      dureePrevue,
      quantiteTransporte
    } = req.body;

    if (!codeCommande || !matricule || !datePrevue || !heurePrevue || !dureePrevue) {
      return res.status(400).json({ message: "Paramètres manquants." });
    }

    const cmd = await CommandeClient.findByPk(codeCommande);
    if (!cmd) return res.status(404).json({ message: "Commande introuvable." });

    const veh = await Vehicule.findByPk(matricule);
    if (!veh || veh.statut !== "disponible") {
      return res.status(400).json({ message: "Véhicule indisponible ou inconnu." });
    }

    const start = new Date(`${datePrevue}T${heurePrevue}`);
    const end = new Date(start.getTime() + parseInt(dureePrevue) * 60 * 60 * 1000);

    const conflit = await CommandePlanifie.findOne({
      where: {
        matricule,
        [Op.or]: [
          {
            datePrevue: datePrevue,
            heurePrevue: {
              [Op.between]: [
                start.toTimeString().substr(0,8),
                end.toTimeString().substr(0,8)
              ]
            }
          }
        ]
      }
    });

    if (conflit) {
      return res.status(409).json({ message: "Conflit de planning." });
    }

    await CommandePlanifie.create({
      codeCommande,
      codeVehicule: matricule,
      datePlanification: new Date(),
      datePrevue,
      heurePrevue,
      dureePrevue,
      quantiteTransporte,
      statutLivraison: "planifiée"
    });

    veh.statut = "non disponible";
    await veh.save();

    return res.status(201).json({ message: "Planification enregistrée." });
  } catch (error) {
    console.error("Erreur planification:", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
