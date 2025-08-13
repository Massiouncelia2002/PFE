
// const sequelize = require("../config/database");

const { sequelize } = require("../models"); // ou "../config/database" selon ton projet
const { CommandeClient,Client, Vehicule, CommandePlanifie, ArticleCommandeClient, ArticleDepot } = require("../models");

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










// exports.planifierCommande = async (req, res) => {
//   const t = await sequelize.transaction(); // ✅ Démarrage de la transaction
//   try {
//     const affectations = Array.isArray(req.body) ? req.body : [req.body];

//     if (affectations.length === 0) {
//       return res.status(400).json({ message: "Aucune affectation reçue." });
//     }

//     const resultats = [];
//     const erreurs = [];

//     for (const aff of affectations) {
//       try {
//         const {
//           codeCommande,
//           matricule,
//           datePrevue,
//           heurePrevue,
//           dureePrevue,
//           quantiteTransporte
//         } = aff;

//         if (!codeCommande || !matricule || !datePrevue || !heurePrevue || !dureePrevue) {
//           throw new Error("Données incomplètes");
//         }

//         const [commande, vehicule] = await Promise.all([
//           CommandeClient.findByPk(codeCommande),
//           Vehicule.findByPk(matricule)
//         ]);

//         if (!commande) throw new Error(`Commande ${codeCommande} introuvable`);
//         if (!vehicule) throw new Error(`Véhicule ${matricule} introuvable`);

//         // ✅ Récupération du codeDepot et du codeArticle
//         const liaison = await ArticleCommandeClient.findOne({
//           where: { codeCommande },
//         });

//         if (!liaison) throw new Error("❌ Article non trouvé pour cette commande");

//         const { codeArticle } = liaison;
//         const codeDepot = commande.codeDepot;

//         // ✅ Vérification dépassement capacité
//         const totalTransporteCeJour = await CommandePlanifie.sum("quantiteTransporte", {
//           where: { matricule, datePrevue }
//         });

//         const quantiteTotale = (totalTransporteCeJour || 0) + parseFloat(quantiteTransporte || 0);
//         if (quantiteTotale > vehicule.capaciteVehicule) {
//           throw new Error(`🚫 Capacité dépassée pour le véhicule ${matricule} le ${datePrevue} : ${quantiteTotale} > ${vehicule.capaciteVehicule}`);
//         }

//         // ✅ Vérification chevauchement horaires
//         const heureDebutNouvelle = parseInt(heurePrevue.split(':')[0]);
//         const heureFinNouvelle = heureDebutNouvelle + parseInt(dureePrevue);

//         const conflits = await CommandePlanifie.findAll({ where: { matricule, datePrevue } });

//         const chevauchement = conflits.some(c => {
//           const debutExist = parseInt(c.heurePrevue.split(':')[0]);
//           const finExist = debutExist + parseInt(c.dureePrevue);
//           return (heureDebutNouvelle < finExist) && (heureFinNouvelle > debutExist);
//         });

//         if (chevauchement) {
//           throw new Error(`🕒 Conflit horaire pour ${matricule} entre ${heureDebutNouvelle}:00 et ${heureFinNouvelle}:00`);
//         }

//         // ✅ Mise à jour du stock via ArticleDepot
//         const articleDepot = await ArticleDepot.findOne({
//           where: { codeDepot, codeArticle },
//           transaction: t
//         });

//         if (!articleDepot) throw new Error("❌ Stock non trouvé pour cet article dans ce dépôt");

//         if (articleDepot.quantiteStockee < quantiteTransporte) {
//           throw new Error(`❌ Stock insuffisant. Disponible: ${articleDepot.quantiteStockee}, demandé: ${quantiteTransporte}`);
//         }

//         // 🔻 Déduction du stock
//         articleDepot.quantiteStockee -= parseFloat(quantiteTransporte);
//         await articleDepot.save({ transaction: t });

//         // ✅ Création de la planification
//         const planification = await CommandePlanifie.create({
//           codeCommande,
//           matricule,
//           datePrevue,
//           heurePrevue,
//           dureePrevue,
//           quantiteTransporte: quantiteTransporte || null,
//           statutLivraison: "en_cours"
//         }, { transaction: t });

//         resultats.push({
//           success: true,
//           commandePlanifieId: planification.commandePlanifieId,
//           codeCommande,
//           matricule
//         });

//       } catch (error) {
//         erreurs.push({
//           input: aff,
//           error: error.message
//         });
//       }
//     }

//     await t.commit(); // ✅ Valider toutes les opérations
//     return res.status(erreurs.length ? 207 : 201).json({
//       message: `✅ Planifications terminées - ${resultats.length} succès, ${erreurs.length} échecs`,
//       resultats,
//       erreurs
//     });

//   } catch (error) {
//     await t.rollback(); // ❌ Annuler en cas de problème
//     console.error("Erreur globale du contrôleur :", error);
//     return res.status(500).json({
//       message: "Erreur serveur",
//       details: error.message
//     });
//   }
// };
  







// exports.planifierCommande = async (req, res) => {
//   const t = await sequelize.transaction(); // ✅ Démarrage de la transaction
//   try {
//     const affectations = Array.isArray(req.body) ? req.body : [req.body];

//     if (affectations.length === 0) {
//       return res.status(400).json({ message: "Aucune affectation reçue." });
//     }

//     const resultats = [];
//     const erreurs = [];

//     for (const aff of affectations) {
//       try {
//         const {
//           codeCommande,
//           matricule,
//           datePrevue,
//           heurePrevue,
//           dureePrevue,
//           quantiteTransporte
//         } = aff;

//         if (!codeCommande || !matricule || !datePrevue || !heurePrevue || !dureePrevue) {
//           throw new Error("Données incomplètes");
//         }

//         const [commande, vehicule] = await Promise.all([
//           CommandeClient.findByPk(codeCommande),
//           Vehicule.findByPk(matricule)
//         ]);

//         if (!commande) throw new Error(`Commande ${codeCommande} introuvable`);
//         if (!vehicule) throw new Error(`Véhicule ${matricule} introuvable`);

//         // ✅ Récupération du codeArticle
//         const liaison = await ArticleCommandeClient.findOne({
//           where: { codeCommande },
//         });
//         if (!liaison) throw new Error("❌ Article non trouvé pour cette commande");
//         const { codeArticle } = liaison;

//         // ✅ Récupération du codeDepot via le client
//         const client = await Client.findByPk(commande.codeClient);
//         if (!client) throw new Error("❌ Client introuvable");
//         const codeDepot = client.codeDepot;
//         if (!codeDepot) throw new Error("❌ Aucun dépôt associé à ce client");

//         // ✅ Vérification capacité
//         const totalTransporteCeJour = await CommandePlanifie.sum("quantiteTransporte", {
//           where: { matricule, datePrevue }
//         });
//         const quantiteTotale = (totalTransporteCeJour || 0) + parseFloat(quantiteTransporte || 0);
//         if (quantiteTotale > vehicule.capaciteVehicule) {
//           throw new Error(`🚫 Capacité dépassée pour ${matricule} le ${datePrevue} : ${quantiteTotale} > ${vehicule.capaciteVehicule}`);
//         }

//         // ✅ Vérification chevauchement horaires
//         const heureDebutNouvelle = parseInt(heurePrevue.split(':')[0]);
//         const heureFinNouvelle = heureDebutNouvelle + parseInt(dureePrevue);
//         const conflits = await CommandePlanifie.findAll({ where: { matricule, datePrevue } });
//         const chevauchement = conflits.some(c => {
//           const debutExist = parseInt(c.heurePrevue.split(':')[0]);
//           const finExist = debutExist + parseInt(c.dureePrevue);
//           return (heureDebutNouvelle < finExist) && (heureFinNouvelle > debutExist);
//         });
//         if (chevauchement) {
//           throw new Error(`🕒 Conflit horaire pour ${matricule} entre ${heureDebutNouvelle}:00 et ${heureFinNouvelle}:00`);
//         }

//         // ✅ Mise à jour du stock ArticleDepot
//         const articleDepot = await ArticleDepot.findOne({
//           where: { codeDepot, codeArticle },
//           transaction: t
//         });
//         if (!articleDepot) throw new Error(`❌ Article ${codeArticle} introuvable dans le dépôt ${codeDepot}`);
//         if (articleDepot.quantiteStockee < quantiteTransporte) {
//           throw new Error(`❌ Stock insuffisant. Disponible: ${articleDepot.quantiteStockee}, demandé: ${quantiteTransporte}`);
//         }
//         articleDepot.quantiteStockee -= parseFloat(quantiteTransporte);
//         await articleDepot.save({ transaction: t });

//         // ✅ Création de la planification
//         const planification = await CommandePlanifie.create({
//           codeCommande,
//           matricule,
//           datePrevue,
//           heurePrevue,
//           dureePrevue,
//           quantiteTransporte: quantiteTransporte || null,
//           statutLivraison: "en_cours"
//         }, { transaction: t });

//         resultats.push({
//           success: true,
//           commandePlanifieId: planification.commandePlanifieId,
//           codeCommande,
//           matricule
//         });

//       } catch (error) {
//         erreurs.push({
//           input: aff,
//           error: error.message
//         });
//       }
//     }

//     await t.commit(); // ✅ Valider toutes les opérations
//     return res.status(erreurs.length ? 207 : 201).json({
//       message: `✅ Planifications terminées - ${resultats.length} succès, ${erreurs.length} échecs`,
//       resultats,
//       erreurs
//     });

//   } catch (error) {
//     await t.rollback(); // ❌ Annuler en cas de problème
//     console.error("Erreur globale du contrôleur :", error);
//     return res.status(500).json({
//       message: "Erreur serveur",
//       details: error.message
//     });
//   }
// };







exports.planifierCommande = async (req, res) => {
  console.log("📥 Données reçues du frontend :", req.body);

  const t = await sequelize.transaction(); // ✅ Démarrage de la transaction

  try {
    const affectations = Array.isArray(req.body) ? req.body : [req.body];

    if (affectations.length === 0) {
      return res.status(400).json({ message: "Aucune affectation reçue." });
    }

    const resultats = [];
    const erreurs = [];

    for (const aff of affectations) {
      try {
        const {
          codeCommande,
          matricule,
          datePrevue,
          heurePrevue,
          dureePrevue,
          quantiteTransporte
        } = aff;

        if (!codeCommande || !matricule || !datePrevue || !heurePrevue || !dureePrevue) {
          throw new Error("Données incomplètes");
        }

        const [commande, vehicule] = await Promise.all([
          CommandeClient.findByPk(codeCommande),
          Vehicule.findByPk(matricule)
        ]);

        if (!commande) throw new Error(`Commande ${codeCommande} introuvable`);
        if (!vehicule) throw new Error(`Véhicule ${matricule} introuvable`);

        // ✅ Récupération du codeArticle
        const liaison = await ArticleCommandeClient.findOne({
          where: { codeCommande },
          transaction: t
        });

        if (!liaison) throw new Error("❌ Article non trouvé pour cette commande");
        const { codeArticle } = liaison;

        // ✅ Récupération du codeDepot via le client lié à la commande
        const commandeAvecClient = await CommandeClient.findOne({
          where: { codeCommande },
          include: {
            model: Client,
            as: 'client',
            attributes: ['codeDepot']
          },
          transaction: t
        });

        if (!commandeAvecClient || !commandeAvecClient.client) {
          throw new Error("❌ Impossible de récupérer le dépôt depuis le client.");
        }

        const codeDepot = commandeAvecClient.client.codeDepot;

        // ✅ Vérification dépassement capacité
        const totalTransporteCeJour = await CommandePlanifie.sum("quantiteTransporte", {
          where: { matricule, datePrevue },
          transaction: t
        });

        const quantiteTotale = (totalTransporteCeJour || 0) + parseFloat(quantiteTransporte || 0);
        if (quantiteTotale > vehicule.capaciteVehicule) {
          throw new Error(`🚫 Capacité dépassée pour ${matricule} le ${datePrevue} : ${quantiteTotale} > ${vehicule.capaciteVehicule}`);
        }

        // ✅ Vérification chevauchement horaires
        const heureDebutNouvelle = parseInt(heurePrevue.split(':')[0]);
        const heureFinNouvelle = heureDebutNouvelle + parseInt(dureePrevue);

        const conflits = await CommandePlanifie.findAll({
          where: { matricule, datePrevue },
          transaction: t
        });

        const chevauchement = conflits.some(c => {
          const debutExist = parseInt(c.heurePrevue.split(':')[0]);
          const finExist = debutExist + parseInt(c.dureePrevue);
          return (heureDebutNouvelle < finExist) && (heureFinNouvelle > debutExist);
        });

        if (chevauchement) {
          throw new Error(`🕒 Conflit horaire pour ${matricule} entre ${heureDebutNouvelle}:00 et ${heureFinNouvelle}:00`);
        }

        // ✅ Mise à jour du stock dans ArticleDepot
        const articleDepot = await ArticleDepot.findOne({
          where: { codeDepot, codeArticle },
          transaction: t
        });

        if (!articleDepot) {
          throw new Error(`❌ Article ${codeArticle} introuvable dans le dépôt ${codeDepot}`);
        }

        if (articleDepot.quantiteStockee < quantiteTransporte) {
          throw new Error(`❌ Stock insuffisant. Disponible: ${articleDepot.quantiteStockee}, demandé: ${quantiteTransporte}`);
        }

        articleDepot.quantiteStockee -= parseFloat(quantiteTransporte);
        await articleDepot.save({ transaction: t });

        console.log(`✅ Stock mis à jour : article ${codeArticle}, nouveau stock = ${articleDepot.quantiteStockee}`);


        // ✅ Création de la planification
        const planification = await CommandePlanifie.create({
          codeCommande,
          matricule,
          datePrevue,
          heurePrevue,
          dureePrevue,
          quantiteTransporte: quantiteTransporte || null,
          statutLivraison: "en_cours"
        }, { transaction: t });

        console.log("✅ Planification créée :", planification?.dataValues);

        resultats.push({
          success: true,
          commandePlanifieId: planification.commandePlanifieId,
          codeCommande,
          matricule
        });

      } catch (error) {
        erreurs.push({
          input: aff,
          error: error.message
        });
      }
    }

    await t.commit(); // ✅ Valider toutes les opérations
    return res.status(erreurs.length ? 207 : 201).json({
      message: `✅ Planifications terminées - ${resultats.length} succès, ${erreurs.length} échecs`,
      resultats,
      erreurs
    });

  } catch (error) {
    await t.rollback(); // ❌ Annuler en cas de problème
    console.error("Erreur globale du contrôleur :", error);
    return res.status(500).json({
      message: "Erreur serveur",
      details: error.message
    });
  }
};





exports.getCommandesPlanificationStatut = async (req, res) => {
  try {
    const { codeDepot } = req.query;

    if (!codeDepot) {
      return res.status(400).json({ message: "Code dépôt requis" });
    }

    const commandes = await CommandeClient.findAll({ where: { codeDepot } });

    const codesCommande = commandes.map(c => c.codeCommande);

    const planifiees = await CommandePlanifie.findAll({
      where: {
        codeCommande: {
          [Op.in]: codesCommande
        }
      }
    });

    const planificationMap = {};

    for (const p of planifiees) {
      if (!planificationMap[p.codeCommande]) {
        planificationMap[p.codeCommande] = 0;
      }
      planificationMap[p.codeCommande] += parseFloat(p.quantiteTransporte || 0);
    }

    const completementPlanifiees = [];
    const partiellementPlanifiees = [];
    const nonPlanifiees = [];

    for (const commande of commandes) {
      const totalPlanifie = planificationMap[commande.codeCommande] || 0;
      const qteCommandee = parseFloat(commande.quantiteCommandee || 0);

      if (totalPlanifie === 0) {
        nonPlanifiees.push(commande);
      } else if (totalPlanifie >= qteCommandee) {
        completementPlanifiees.push(commande);
      } else {
        partiellementPlanifiees.push(commande);
      }
    }

    res.json({
      completementPlanifiees,
      partiellementPlanifiees,
      nonPlanifiees
    });
  } catch (error) {
    console.error("Erreur récupération planification/statut:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

















exports.getCommandesParClientAvecSuggestions = async (req, res) => {
  const { codeDepot } = req.query;

  if (!codeDepot) {
    return res.status(400).json({ message: "Code dépôt manquant." });
  }

  try {
    // Étape 1 : Récupérer toutes les commandes clients actives pour ce dépôt
    const commandes = await CommandeClient.findAll({
      include: [
        {
          model: Client,
          as: 'client',
          where: { codeDepot },
          attributes: ['codeClient', 'nomClient']
        },
        {
          model: ArticleCommandeClient,
          as: 'articlesCommande',
          attributes: ['codeArticle', 'quantiteCommandee']
        }
      ]
    });

    // Étape 2 : Grouper les commandes par client
    const regroupementParClient = {};

    for (const cmd of commandes) {
      const { codeClient, nomClient } = cmd.client;
      if (!regroupementParClient[codeClient]) {
        regroupementParClient[codeClient] = {
          codeClient,
          nomClient,
          commandes: []
        };
      }

      for (const art of cmd.articlesCommande) {
        regroupementParClient[codeClient].commandes.push({
          codeCommande: cmd.codeCommande,
          dateCommande: cmd.dateCommande,
          codeArticle: art.codeArticle,
          quantiteCommandee: parseFloat(art.quantiteCommandee),
        });
      }
    }

    // Étape 3 : Récupérer le stock pour chaque article du dépôt
    const codesArticles = [
      ...new Set(commandes.flatMap(cmd => cmd.articlesCommande.map(ac => ac.codeArticle)))
    ];

    const articlesDepot = await ArticleDepot.findAll({
      where: {
        codeDepot,
        codeArticle: codesArticles
      }
    });

    const stockDisponibleParArticle = {};
    articlesDepot.forEach(a => {
      stockDisponibleParArticle[a.codeArticle] = parseFloat(a.quantiteStockee || 0);
    });

    // Étape 4 : Calculer la quantité à livrer par client + article (répartition simple)
    const totalDemandesParArticle = {};
    for (const client of Object.values(regroupementParClient)) {
      for (const cmd of client.commandes) {
        totalDemandesParArticle[cmd.codeArticle] =
          (totalDemandesParArticle[cmd.codeArticle] || 0) + cmd.quantiteCommandee;
      }
    }

    for (const client of Object.values(regroupementParClient)) {
      client.commandes = client.commandes.map(cmd => {
        const stock = stockDisponibleParArticle[cmd.codeArticle] || 0;
        const totalDemande = totalDemandesParArticle[cmd.codeArticle] || 1;

        const proportion = cmd.quantiteCommandee / totalDemande;
        const quantiteALivrer = parseFloat((stock * proportion).toFixed(2));

        return {
          ...cmd,
          quantiteALivrer,
          quantiteStockee: stock
        };
      });
    }

    return res.status(200).json({
      data: Object.values(regroupementParClient)
    });

  } catch (error) {
    console.error("❌ Erreur lors de la récupération des commandes clients :", error);
    return res.status(500).json({
      message: "Erreur serveur lors de la récupération des commandes par client",
      error: error.message
    });
  }
};
