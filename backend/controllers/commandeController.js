// controllers/CommandeController.js

const XLSX = require("xlsx");
const { Client,Depot, CommandeClient, Article,ArticleDepot, ArticleCommandeClient, AffectationDepot } = require("../models");


const { Op } = require("sequelize");


// function generateCodeCommande(codeClient, codeArticle, dateCommande) {
//   const datePart = new Date(dateCommande).toISOString().slice(0, 10).replace(/-/g, ''); // ex: 20250619
//   const randomPart = Math.floor(1000 + Math.random() * 9000); // ex: 8372
//   return `${codeClient}-${codeArticle}-${datePart}-${randomPart}`;
// }



// const importerCommandes = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Aucun fichier téléchargé." });
//     }

//     // 1. Récupérer les dépôts du planificateur connecté
//     const affectations = await AffectationDepot.findAll({
//       where: { codeUtilisateur: req.user.id },
//       include: [{ model: Depot }]
//     });

//     const codeDepotsAutorises = affectations.map((a) => a.Depot.codeDepot);

//     // 2. Lire le fichier Excel
//     const workbook = XLSX.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = XLSX.utils.sheet_to_json(sheet);

//     let lignesIgnorees = 0;
//     let lignesDupliquees = 0;
//     let lignesHorsDepots = 0;

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
//         console.warn("Client ou article non trouvé :", { codeClient, codeArticle });
//         lignesIgnorees++;
//         continue;
//       }

//       // 3. Vérifier si le client appartient à un dépôt autorisé
//       if (!codeDepotsAutorises.includes(client.codeDepot)) {
//         lignesHorsDepots++;
//         continue;
//       }

//       // 4. Vérifier doublons
//       const commandesExistantes = await ArticleCommandeClient.findAll({
//         include: [{
//           model: CommandeClient,
//           as: 'commande',
//           where: { codeClient },
//           attributes: []
//         }],
//         where: {
//           codeArticle,
//           quantiteDemandee
//         }
//       });

//       if (commandesExistantes.length > 0) {
//         lignesDupliquees++;
//         continue;
//       }

//       // 5. Insertion
//       const codeCommande = generateCodeCommande(codeClient, codeArticle, dateCommande);
//       const commande = await CommandeClient.create({
//         codeCommande,
//         dateCommande,
//         codeClient
//       });

//       await ArticleCommandeClient.create({
//         codeCommande,
//         codeArticle,
//         quantiteDemandee
//       });
//     }

//     // 6. Message de fin
//     let message = "Commandes importées avec succès.";
//     if (lignesIgnorees > 0) message += ` ${lignesIgnorees} lignes ignorées (informations invalides).`;
//     if (lignesDupliquees > 0) message += ` ${lignesDupliquees} lignes ignorées (commandes en double).`;
//     if (lignesHorsDepots > 0) message += ` ${lignesHorsDepots} lignes ignorées (client hors de vos dépôts).`;

//     res.status(200).json({ success: true, message });

//   } catch (error) {
//     console.error("Erreur d'importation :", error);
//     res.status(500).json({ error: "Erreur lors de l'importation." });
//   }
// };



function generateCodeCommande(codeClient, dateCommande) {
  const datePart = new Date(dateCommande).toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `${codeClient}-${datePart}-${randomPart}`;
}

const importerCommandes = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier téléchargé." });
    }

    // 1. Récupérer les dépôts du planificateur
    const affectations = await AffectationDepot.findAll({
      where: { codeUtilisateur: req.user.id },
      include: [{ model: Depot }]
    });
    const codeDepotsAutorises = affectations.map((a) => a.Depot.codeDepot);

    // 2. Lire le fichier Excel
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    // 3. Initialiser les compteurs et le cache de commandes
    let lignesIgnorees = 0;
    let lignesDupliquees = 0;
    let lignesHorsDepots = 0;
    const commandesMap = new Map(); // clé = `${codeClient}-${date}`, valeur = codeCommande

    for (const row of data) {
      const codeClient = (row.codeClient || "").toString().trim().toUpperCase();
      const nomClient = (row.nomClient || "").toString().trim();
      const dateCommande = new Date(row.dateCommande);
      const codeArticle = (row.codeArticle || "").toString().trim().toUpperCase();
      const designation = (row.designation || "").toString().trim();
      const quantiteDemandee = parseInt(row.QuantiteDemandee ?? row.quantiteDemandee);

      if (!codeClient || !codeArticle || isNaN(quantiteDemandee) || isNaN(dateCommande.getTime())) {
        lignesIgnorees++;
        continue;
      }

      const client = await Client.findByPk(codeClient);
      const article = await Article.findByPk(codeArticle);

      if (!client || !article) {
        lignesIgnorees++;
        continue;
      }

      if (!codeDepotsAutorises.includes(client.codeDepot)) {
        lignesHorsDepots++;
        continue;
      }

      const commandeKey = `${codeClient}-${dateCommande.toISOString().slice(0, 10)}`;
      let codeCommande;

      // Vérifier ou créer la commande
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
      }

      // Éviter doublons d’articles dans la même commande
      const doublon = await ArticleCommandeClient.findOne({
        where: {
          codeCommande,
          codeArticle,
          quantiteDemandee
        }
      });

      if (doublon) {
        lignesDupliquees++;
        continue;
      }

      // Ajouter l'article à la commande
      await ArticleCommandeClient.create({
        codeCommande,
        codeArticle,
        quantiteDemandee
      });
    }

    // 4. Résumé
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
//     const idUtilisateur = req.user.id; // ✅ Récupération de l'utilisateur connecté

//     // 1️⃣ Récupérer les dépôts affectés à l'utilisateur
//     const affectations = await AffectationDepot.findAll({
//       where: { codeUtilisateur: idUtilisateur },
//       attributes: ["codeDepot"]
//     });

//     const codesDepots = affectations.map(a => a.codeDepot);
//     if (codesDepots.length === 0) {
//       return res.status(403).json({ message: "Aucun dépôt affecté à cet utilisateur." });
//     }

//     // 2️⃣ Récupérer les clients liés à ces dépôts
//     const clients = await Client.findAll({
//       where: { codeDepot: { [Op.in]: codesDepots } },
//       include: [{
//         model: CommandeClient,
//         as: "commandes",
//         include: [{
//           model: ArticleCommandeClient,
//           as: "articlesCommandes",
//           include: [{
//             model: Article,
//             as: "article", // ⚠️ utiliser le bon alias ici
//             attributes: ["codeArticle", "designation"]
//           }]
//         }]
//       }]
//     });

//     // 3️⃣ Construction du résultat
//     const result = clients.map((client) => {
//       const commandes = [];

//       client.commandes.forEach((cmd) => {
//         cmd.articlesCommandes.forEach((a) => {
//           commandes.push({
//             codeArticle: a.codeArticle,
//             designation: a.article.designation, // ⚠️ doit correspondre à l'alias "as: 'article'"
//             quantiteCommandee: a.quantiteDemandee,
//             quantiteALivrer: a.quantiteALivrer
//           });
//         });
//       });

//       return {
//         codeClient: client.codeClient,
//         nomClient: client.nom,
//         commandes
//       };
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Erreur getCommandesParClientAffichage:", error);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };





// const getCommandesParClientAffichage = async (req, res) => {
//   try {
//     const idUtilisateur = req.user.id;

//     // 1️⃣ Récupérer les dépôts affectés à l'utilisateur
//     const affectations = await AffectationDepot.findAll({
//       where: { codeUtilisateur: idUtilisateur },
//       attributes: ["codeDepot"]
//     });

//     const codesDepots = affectations.map(a => a.codeDepot);
//     if (codesDepots.length === 0) {
//       return res.status(403).json({ message: "Aucun dépôt affecté à cet utilisateur." });
//     }

//     // 2️⃣ Récupérer les clients de ces dépôts avec commandes
//     const clients = await Client.findAll({
//       where: { codeDepot: { [Op.in]: codesDepots } },
//       include: [{
//         model: CommandeClient,
//         as: "commandes",
//         required: true, // ✅ important : ne ramène que les clients qui ont passé au moins une commande
//         include: [{
//           model: ArticleCommandeClient,
//           as: "articlesCommandes",
//           include: [{
//             model: Article,
//             as: "article",
//             attributes: ["codeArticle", "designation"]
//           }]
//         }]
//       }]
//     });

//     // 3️⃣ Construction du résultat
//     const result = clients.map((client) => {
//       const commandes = [];

//       client.commandes.forEach((cmd) => {
//         cmd.articlesCommandes.forEach((a) => {
//           commandes.push({
//             codeArticle: a.codeArticle,
//             designation: a.article.designation,
//             quantiteCommandee: a.quantiteDemandee,
//             quantiteALivrer: a.quantiteALivrer
//           });
//         });
//       });

//       return {
//         codeClient: client.codeClient,
//         nomClient: client.nom,
//          codeDepot: client.codeDepot,
//         commandes
//       };
//     });

//     res.status(200).json(result);
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

    // 🔹 4. Construction du résultat final
    const result = clients.map((client) => {
      const commandes = [];

      client.commandes.forEach((commande) => {
        commande.articlesCommandes.forEach((a) => {
          const qStock =
            stockMap[client.codeDepot]?.[a.codeArticle] ?? null;

          commandes.push({
            codeArticle: a.codeArticle,
            designation: a.article.designation,
            quantiteCommandee: a.quantiteDemandee,
            quantiteALivrer: a.quantiteALivrer,
            quantiteStockee: qStock
          });
        });
      });

      return {
        codeClient: client.codeClient,
        nomClient: client.nom,
        codeDepot: client.codeDepot,
        commandes
      };
    });

    return res.status(200).json(result);
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



