// controllers/CommandeController.js

const XLSX = require("xlsx");
const { Client, Depot, CommandeClient, Article, ArticleDepot, ArticleCommandeClient, AffectationDepot, CommandePlanifie } = require("../models");


const { Op } = require("sequelize");


function generateCodeCommande(codeClient, dateCommande) {
  const datePart = new Date(dateCommande).toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `${codeClient}-${datePart}-${randomPart}`;
}

// const importerCommandes = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Aucun fichier téléchargé." });
//     }

//     // 1. Récupérer les dépôts du planificateur
//     const affectations = await AffectationDepot.findAll({
//       where: { codeUtilisateur: req.user.id },
//       include: [{ model: Depot }]
//     });
//     const codeDepotsAutorises = affectations.map((a) => a.Depot.codeDepot);

//     // 2. Lire le fichier Excel
//     const workbook = XLSX.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = XLSX.utils.sheet_to_json(sheet);

//     // 3. Initialiser les compteurs et le cache de commandes
//     let lignesIgnorees = 0;
//     let lignesDupliquees = 0;
//     let lignesHorsDepots = 0;
//     const commandesMap = new Map(); // clé = `${codeClient}-${date}`, valeur = codeCommande

//     for (const row of data) {
//       const codeClient = (row.codeClient || "").toString().trim().toUpperCase();
//       const nomClient = (row.nomClient || "").toString().trim();
//       const dateCommande = new Date(row.dateCommande);
//       const codeArticle = (row.codeArticle || "").toString().trim().toUpperCase();
//       const designation = (row.designation || "").toString().trim();
//       const quantiteDemandee = parseInt(row.QuantiteDemandee ?? row.quantiteDemandee);

//       if (!codeClient || !codeArticle || isNaN(quantiteDemandee) || isNaN(dateCommande.getTime())) {
//         lignesIgnorees++;
//         continue;
//       }

//       const client = await Client.findByPk(codeClient);
//       const article = await Article.findByPk(codeArticle);

//       if (!client || !article) {
//         lignesIgnorees++;
//         continue;
//       }

//       if (!codeDepotsAutorises.includes(client.codeDepot)) {
//         lignesHorsDepots++;
//         continue;
//       }

//       const commandeKey = `${codeClient}-${dateCommande.toISOString().slice(0, 10)}`;
//       let codeCommande;

//       // Vérifier ou créer la commande
//       if (commandesMap.has(commandeKey)) {
//         codeCommande = commandesMap.get(commandeKey);
//       } else {
//         codeCommande = generateCodeCommande(codeClient, dateCommande);

//         await CommandeClient.create({
//           codeCommande,
//           codeClient,
//           dateCommande
//         });

//         commandesMap.set(commandeKey, codeCommande);
//       }

//       // Éviter doublons d’articles dans la même commande
//       const doublon = await ArticleCommandeClient.findOne({
//         where: {
//           codeCommande,
//           codeArticle,
//           quantiteDemandee
//         }
//       });

//       if (doublon) {
//         lignesDupliquees++;
//         continue;
//       }

//       // Ajouter l'article à la commande
//       await ArticleCommandeClient.create({
//         codeCommande,
//         codeArticle,
//         quantiteDemandee
//       });
//     }

//     // 4. Résumé
//     let message = "✅ Commandes importées avec succès.";
//     if (lignesIgnorees > 0) message += ` ${lignesIgnorees} ligne(s) ignorée(s) (informations invalides).`;
//     if (lignesDupliquees > 0) message += ` ${lignesDupliquees} doublon(s) détecté(s).`;
//     if (lignesHorsDepots > 0) message += ` ${lignesHorsDepots} client(s) hors de vos dépôts.`;

//     return res.status(200).json({ success: true, message });

//   } catch (error) {
//     console.error("❌ Erreur d'importation :", error);
//     return res.status(500).json({ error: "Erreur serveur lors de l'importation." });
//   }
// };
const importerCommandes = async (req, res) => {
  try {
    console.log("📥 Importation appelée");

    if (!req.file) {
      console.log("⚠️ Aucun fichier reçu");
      return res.status(400).json({ error: "Aucun fichier téléchargé." });
    }

    // 1. Récupérer les dépôts autorisés
    const affectations = await AffectationDepot.findAll({
      where: { codeUtilisateur: req.user.id },
      include: [{ model: Depot }]
    });
    const codeDepotsAutorises = affectations.map((a) => a.Depot.codeDepot);
    console.log("✅ Dépôts autorisés :", codeDepotsAutorises);

    // 2. Lire le fichier Excel
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    // 3. Initialiser
    let lignesIgnorees = 0;
    let lignesDupliquees = 0;
    let lignesHorsDepots = 0;
    const commandesMap = new Map();

    for (const row of data) {
      console.log("➡️ Traitement ligne : ", row);

      const codeClient = (row.codeClient || "").toString().trim().toUpperCase();
      const nomClient = (row.nomClient || "").toString().trim();
      const dateExcel = row.dateCommande;
      const codeArticle = (row.codeArticle || "").toString().trim().toUpperCase();
      const designation = (row.designation || "").toString().trim();
      const quantiteDemandee = parseInt(row.QuantiteDemandee ?? row.quantiteDemandee);

      // ✅ Convertir date au format français "dd/mm/yyyy"
      let dateCommande;
      if (typeof dateExcel === "string" && dateExcel.includes("/")) {
        const [jour, mois, annee] = dateExcel.split("/");
        dateCommande = new Date(`${annee}-${mois}-${jour}`);
      } else {
        dateCommande = new Date(dateExcel);
      }

      console.log(`🔍 Données extraites : codeClient=${codeClient}, codeArticle=${codeArticle}, date=${dateCommande}, quantité=${quantiteDemandee}`);

      if (!codeClient || !codeArticle || isNaN(quantiteDemandee) || isNaN(dateCommande.getTime())) {
        console.log("⛔ Ligne ignorée : Données invalides", row);
        lignesIgnorees++;
        continue;
      }

      const client = await Client.findByPk(codeClient);
      const article = await Article.findByPk(codeArticle);

      if (!client) {
        console.log("⛔ Client introuvable :", codeClient);
        lignesIgnorees++;
        continue;
      }

      if (!article) {
        console.log("⛔ Article introuvable :", codeArticle);
        lignesIgnorees++;
        continue;
      }

      if (!codeDepotsAutorises.includes(client.codeDepot)) {
        console.log(`⛔ Client ${codeClient} hors dépôt autorisé (${client.codeDepot})`);
        lignesHorsDepots++;
        continue;
      }

      const commandeKey = `${codeClient}-${dateCommande.toISOString().slice(0, 10)}`;
      let codeCommande;

      if (commandesMap.has(commandeKey)) {
        codeCommande = commandesMap.get(commandeKey);
      } else {
        codeCommande = generateCodeCommande(codeClient, dateCommande);
        await CommandeClient.create({
          codeCommande,
          codeClient,
          dateCommande
        });
        commandesMap.set(commandeKey, codeCommande);
        console.log(`🆕 Nouvelle commande créée : ${codeCommande}`);
      }

      const doublon = await ArticleCommandeClient.findOne({
        where: {
          codeCommande,
          codeArticle,
          quantiteDemandee
        }
      });

      if (doublon) {
        console.log("⚠️ Doublon détecté : commande déjà existante avec même article et quantité.");
        lignesDupliquees++;
        continue;
      }

      await ArticleCommandeClient.create({
        codeCommande,
        codeArticle,
        quantiteDemandee
      });
      console.log("✅ Article ajouté à la commande :", codeCommande);
    }

    let message = "✅ Commandes importées avec succès.";
    if (lignesIgnorees > 0) message += ` ${lignesIgnorees} ligne(s) ignorée(s) (informations invalides).`;
    if (lignesDupliquees > 0) message += ` ${lignesDupliquees} doublon(s) détecté(s).`;
    if (lignesHorsDepots > 0) message += ` ${lignesHorsDepots} client(s) hors de vos dépôts.`;

    return res.status(200).json({ success: true, message });

  } catch (error) {
    console.error("❌ Erreur d'importation :", error);
    return res.status(500).json({ error: "Erreur serveur lors de l'importation." });
  }
};







const getAllCommandes = async (req, res) => {
  try {
    const commandes = await CommandeClient.findAll({
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["codeClient", "nomClient"],
        },
        {
          model: Article,
          as: "articles",
          attributes: ["codeArticle", "designation"],
          through: {
            model: ArticleCommandeClient,
            attributes: ["quantiteDemandee"]
          },
          // required: true  
        }
      ],
    });



    console.log("Commandes récupérées :", commandes);  // Log pour vérifier les commandes

    const formatted = commandes.flatMap(commande => {
      return commande.articles.map(article => ({
        codeCommande: commande.codeCommande,
        dateCommande: commande.dateCommande,
        codeClient: commande.client.codeClient,
        nomClient: commande.client.nomClient,
        codeArticle: article.codeArticle,
        designation: article.designation,
        quantiteDemandee: article.ArticleCommandeClient.quantiteDemandee
      }));
    });


    res.status(200).json({ data: formatted });
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};






const getCommandesParDepot = async (req, res) => {
  try {
    const idUtilisateur = req.user.id; // récupéré depuis le token JWT

    // 1. Trouver les dépôts gérés par l'utilisateur
    const affectations = await AffectationDepot.findAll({
      where: { codeUtilisateur: idUtilisateur }, // ou "utilisateur" si c’est le champ réel
      attributes: ["codeDepot"]
    });
    const idsDepots = affectations.map((entry) => entry.codeDepot);

    // 2. Trouver les clients affectés à ces dépôts
    const clients = await Client.findAll({
      where: { codeDepot: idsDepots }, // doit matcher avec la clé étrangère dans Client
      attributes: ["codeClient", "nomClient"]
    });
    const idsClients = clients.map((c) => c.codeClient);

    // 3. Récupérer les commandes des clients
    const commandes = await CommandeClient.findAll({
      where: { codeClient: idsClients },
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["codeClient", "nomClient"],
        },
        {
          model: Article,
          as: "articles",
          attributes: ["codeArticle", "designation"],
          through: {
            model: ArticleCommandeClient,
            attributes: ["quantiteDemandee"]
          }
        }
      ]
    });

    // Formatage
    const formatted = commandes.flatMap(commande => {
      return commande.articles.map(article => ({
        codeCommande: commande.codeCommande,
        dateCommande: commande.dateCommande,
        codeClient: commande.client.codeClient,
        nomClient: commande.client.nomClient,
        codeArticle: article.codeArticle,
        designation: article.designation,
        quantiteDemandee: article.ArticleCommandeClient.quantiteDemandee
      }));
    });

    res.status(200).json({ success: true, data: formatted });

  } catch (error) {
    console.error("Erreur de filtrage des commandes par dépôt :", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};




// 🔁 Récupérer les commandes par client avec quantités demandées et à livrer
exports.getCommandesParClient = async (req, res) => {
  try {
    const clients = await Client.findAll({
      include: [{
        model: CommandeClient,
        as: "commandes",
        include: [{
          model: ArticleCommandeClient,
          as: "articlesCommandes",
          include: [{
            model: Article,
            attributes: ["codeArticle", "designation"]
          }]
        }]
      }]
    });

    const result = clients.map((client) => {
      const commandes = [];

      client.commandes.forEach((cmd) => {
        cmd.articlesCommandes.forEach((a) => {
          commandes.push({
            codeArticle: a.codeArticle,
            designation: a.Article.designation,
            quantiteCommandee: a.quantiteDemandee,
            quantiteALivrer: a.quantiteALivrer // ce champ doit exister
          });
        });
      });

      return {
        codeClient: client.codeClient,
        nomClient: client.nom,
        commandes
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur getCommandesParClient:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};







// const getCommandesParClientAffichage = async (req, res) => {
//   try {
//     const idUtilisateur = req.user.id;

//     // 🔹 1. Récupérer les dépôts affectés à l'utilisateur
//     const affectations = await AffectationDepot.findAll({
//       where: { codeUtilisateur: idUtilisateur },
//       attributes: ["codeDepot"]
//     });

//     const codesDepots = affectations.map(a => a.codeDepot);
//     if (codesDepots.length === 0) {
//       return res
//         .status(403)
//         .json({ message: "Aucun dépôt affecté à cet utilisateur." });
//     }

//     // 🔹 2. Récupérer les clients liés à ces dépôts et ayant passé des commandes
//     const clients = await Client.findAll({
//       where: { codeDepot: { [Op.in]: codesDepots } },
//       include: [
//         {
//           model: CommandeClient,
//           as: "commandes",
//           required: true,
//           include: [
//             {
//               model: ArticleCommandeClient,
//               as: "articlesCommandes",
//               include: [
//                 {
//                   model: Article,
//                   as: "article",
//                   attributes: ["codeArticle", "designation"]
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     });

//     // 🔹 3. Récupérer les quantités stockées des articles dans chaque dépôt
//     const stocks = await ArticleDepot.findAll({
//       where: { codeDepot: { [Op.in]: codesDepots } },
//       attributes: ["codeDepot", "codeArticle", "quantiteStockee"]
//     });

//     const stockMap = {};
//     stocks.forEach((s) => {
//       if (!stockMap[s.codeDepot]) stockMap[s.codeDepot] = {};
//       stockMap[s.codeDepot][s.codeArticle] = s.quantiteStockee;
//     });

//     // 🔹 4. Construction du résultat final
//     const result = clients.map((client) => {
//       const commandes = [];

//       client.commandes.forEach((commande) => {
//         commande.articlesCommandes.forEach((a) => {
//           const qStock =
//             stockMap[client.codeDepot]?.[a.codeArticle] ?? null;

//           commandes.push({
//             codeCommande: commande.codeCommande,
//             codeArticle: a.article.codeArticle,
//             designation: a.article.designation,
//             quantiteCommandee: a.quantiteDemandee,
//             quantiteALivrer: a.quantiteALivrer,
//             quantiteStockee: qStock
//           });
//         });
//       });

//       return {
//         codeClient: client.codeClient,
//         nomClient: client.nomClient,
//         codeDepot: client.codeDepot,
//         commandes
//       };
//     });

//     return res.status(200).json(result);
//   } catch (error) {
//     console.error("Erreur getCommandesParClientAffichage:", error);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };





// // ✅ Controller : getCommandesParClientAffichage avec exclusion des commandes totalement planifiées


// const getCommandesParClientAffichage = async (req, res) => {
//   try {
//     const idUtilisateur = req.user.id;

//     // 🔹 1. Dépôts de l'utilisateur
//     const affectations = await AffectationDepot.findAll({
//       where: { codeUtilisateur: idUtilisateur },
//       attributes: ["codeDepot"]
//     });

//     const codesDepots = affectations.map(a => a.codeDepot);
//     if (codesDepots.length === 0) {
//       return res.status(403).json({ message: "Aucun dépôt affecté à cet utilisateur." });
//     }

//     // 🔹 2. Clients avec commandes
//     const clients = await Client.findAll({
//       where: { codeDepot: { [Op.in]: codesDepots } },
//       include: [
//         {
//           model: CommandeClient,
//           as: "commandes",
//           required: true,
//           include: [
//             {
//               model: ArticleCommandeClient,
//               as: "articlesCommandes",
//               include: [
//                 {
//                   model: Article,
//                   as: "article",
//                   attributes: ["codeArticle", "designation"]
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     });

//     // 🔹 3. Stock par article + dépôt
//     const stocks = await ArticleDepot.findAll({
//       where: { codeDepot: { [Op.in]: codesDepots } },
//       attributes: ["codeDepot", "codeArticle", "quantiteStockee"]
//     });

//     const stockMap = {};
//     stocks.forEach((s) => {
//       if (!stockMap[s.codeDepot]) stockMap[s.codeDepot] = {};
//       stockMap[s.codeDepot][s.codeArticle] = s.quantiteStockee;
//     });

//     // 🔹 4. Quantités déjà planifiées
//     const planifiees = await CommandePlanifie.findAll({
//       attributes: ["codeCommande", "codeArticle", "quantiteTransporte"]
//     });

//     const mapPlanifiees = {};
//     planifiees.forEach((p) => {
//       const key = `${p.codeCommande}-${p.codeArticle}`;
//       mapPlanifiees[key] = (mapPlanifiees[key] || 0) + parseFloat(p.quantiteTransporte);
//     });

//     // 🔹 5. Construction du résultat filtré
//     const result = [];

//     clients.forEach((client) => {
//       const commandes = [];

//       client.commandes.forEach((commande) => {
//         commande.articlesCommandes.forEach((a) => {
//           const key = `${commande.codeCommande}-${a.codeArticle}`;
//           const totalPlanifie = mapPlanifiees[key] || 0;
//           const quantiteDemandee = parseFloat(a.quantiteDemandee);

//           // ✅ On exclut les lignes totalement planifiées
//           if (totalPlanifie >= quantiteDemandee) return;

//           const qStock = stockMap[client.codeDepot]?.[a.codeArticle] ?? null;

//           commandes.push({
//             codeCommande: commande.codeCommande,
//             codeArticle: a.article.codeArticle,
//             designation: a.article.designation,
//             quantiteCommandee: quantiteDemandee,
//             quantiteALivrer: quantiteDemandee - totalPlanifie,
//             quantiteStockee: qStock
//           });
//         });
//       });

//       if (commandes.length > 0) {
//         result.push({
//           codeClient: client.codeClient,
//           nomClient: client.nomClient,
//           codeDepot: client.codeDepot,
//           commandes
//         });
//       }
//     });

//     return res.status(200).json(result);
//   } catch (error) {
//     console.error("Erreur getCommandesParClientAffichage:", error);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };








const getCommandesParClientAffichage = async (req, res) => {
  try {
    const idUtilisateur = req.user.id;

    // 🔹 1. Récupérer les dépôts affectés à l'utilisateur
    const affectations = await AffectationDepot.findAll({
      where: { codeUtilisateur: idUtilisateur },
      attributes: ["codeDepot"]
    });

    const codesDepots = affectations.map(a => a.codeDepot);
    if (codesDepots.length === 0) {
      return res
        .status(403)
        .json({ message: "Aucun dépôt affecté à cet utilisateur." });
    }

    // 🔹 2. Récupérer les clients liés à ces dépôts et ayant passé des commandes
    const clients = await Client.findAll({
      where: { codeDepot: { [Op.in]: codesDepots } },
      include: [
        {
          model: CommandeClient,
          as: "commandes",
          required: true,
          include: [
            {
              model: ArticleCommandeClient,
              as: "articlesCommandes",
              include: [
                {
                  model: Article,
                  as: "article",
                  attributes: ["codeArticle", "designation"]
                }
              ]
            }
          ]
        }
      ]
    });

    // 🔹 3. Récupérer les quantités stockées des articles dans chaque dépôt
    const stocks = await ArticleDepot.findAll({
      where: { codeDepot: { [Op.in]: codesDepots } },
      attributes: ["codeDepot", "codeArticle", "quantiteStockee"]
    });

    const stockMap = {};
    stocks.forEach((s) => {
      if (!stockMap[s.codeDepot]) stockMap[s.codeDepot] = {};
      stockMap[s.codeDepot][s.codeArticle] = s.quantiteStockee;
    });

    // 🔹 4. Récupérer les quantités déjà transportées (planifiées)
    const plans = await CommandePlanifie.findAll({
      attributes: ["codeCommande", "quantiteTransporte"],
      raw: true
    });

    const mapQuantiteTransporte = {};
    plans.forEach(p => {
      if (!mapQuantiteTransporte[p.codeCommande]) {
        mapQuantiteTransporte[p.codeCommande] = 0;
      }
      mapQuantiteTransporte[p.codeCommande] += parseFloat(p.quantiteTransporte || 0);
    });

    // 🔹 5. Construction du résultat final (en filtrant ce qui est déjà planifié à 100%)
    const result = clients.map((client) => {
      const commandes = [];

      client.commandes.forEach((commande) => {
        commande.articlesCommandes.forEach((a) => {
          const qStock = stockMap[client.codeDepot]?.[a.codeArticle] ?? null;
          const quantiteDemandee = parseFloat(a.quantiteDemandee || 0);
          const codeCmd = commande.codeCommande;
          const totalTransporte = parseFloat(mapQuantiteTransporte[codeCmd] || 0);

          // ❌ On ignore les articles dont la commande est déjà entièrement planifiée
          if (totalTransporte >= quantiteDemandee) return;

          // commandes.push({
          //   codeCommande: codeCmd,
          //   codeArticle: a.article.codeArticle,
          //   designation: a.article.designation,
          //   quantiteCommandee: quantiteDemandee,
          //   quantiteALivrer: a.quantiteALivrer,
          //   quantiteStockee: qStock
          // });

          commandes.push({
            codeCommande: codeCmd,
            codeArticle: a.article.codeArticle,
            designation: a.article.designation,
            quantiteCommandee: quantiteDemandee,
            quantiteALivrer: a.quantiteALivrer,
            quantiteStockee: qStock,
            planifications: plans
              .filter(p => p.codeCommande === codeCmd)
              .map(p => ({
                quantiteTransporte: p.quantiteTransporte
              }))
          });


        });
      });

      return {
        codeClient: client.codeClient,
        nomClient: client.nomClient,
        codeDepot: client.codeDepot,
        commandes
      };
    }).filter(client => client.commandes.length > 0); // ⚠️ Ne garder que les clients ayant des commandes restantes

    if (result.length === 0) {
      return res.status(200).json({ message: "Aucune commande à planifier.", data: [] });
    }

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Erreur getCommandesParClientAffichage:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};












const saveLivraisons = async (req, res) => {
  try {
    const clients = req.body;

    for (const client of clients) {
      for (const article of client.commandes) {
        await ArticleCommandeClient.update(
          { quantiteALivrer: article.quantiteALivrer },
          {
            where: {
              codeClient: client.codeClient,
              codeArticle: article.codeArticle
            }
          }
        );
      }
    }

    res.status(200).json({ message: "✅ Livraisons mises à jour avec succès." });
  } catch (error) {
    console.error("❌ Erreur saveLivraisons:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'enregistrement." });
  }
};




module.exports = {
  importerCommandes,
  getAllCommandes,
  getCommandesParDepot,
  getCommandesParClientAffichage,
  saveLivraisons


};



