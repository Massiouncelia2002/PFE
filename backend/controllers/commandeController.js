// controllers/CommandeController.js

const XLSX = require("xlsx");
const { Client, CommandeClient, Article, ArticleCommandeClient } = require("../models");

function generateCodeCommande(codeClient) {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${codeClient}-${random}`;
}



// const importerCommandes = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Aucun fichier téléchargé." });
//     }

//     const workbook = XLSX.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = XLSX.utils.sheet_to_json(sheet);

//     let lignesIgnorees = 0;
//     let lignesDupliquees = 0;

//     for (const row of data) {
//       // const { codeClient, codeArticle, QuantiteDemandee } = row;

//       // const client = await Client.findByPk(codeClient);
//       // const article = await Article.findByPk(codeArticle);
//       // if (!client || !article) {
//       //   lignesIgnorees++;
//       //   continue;
//       // }
//       const codeClient = (row.codeClient || "").toString().trim().toUpperCase();
// const codeArticle = (row.codeArticle || "").toString().trim().toUpperCase();
// const quantiteDemandee = parseInt(row.QuantiteDemandee);

// const client = await Client.findByPk(codeClient);
// const article = await Article.findByPk(codeArticle);
// if (!client || !article) {
//   console.warn("Client ou article non trouvé :", { codeClient, codeArticle });
//   lignesIgnorees++;
//   continue;
// }

//       // Vérifier si une commande identique existe déjà (peu importe le codeCommande)
//       const commandesExistantes = await ArticleCommandeClient.findAll({
//         include: [{
//           model: CommandeClient,
//           where: { codeClient },
//         }],
//         where: {
//           codeArticle,
//           quantiteDemandee: QuantiteDemandee
//         }
//       });

//       if (commandesExistantes.length > 0) {
//         lignesDupliquees++;
//         continue;
//       }

//       // Sinon, importer
//       const codeCommande = generateCodeCommande(codeClient);
//       const commande = await CommandeClient.create({
//         codeCommande,
//         dateCommande: new Date(),
//         codeClient
//       });

//       await ArticleCommandeClient.create({
//         codeCommande,
//         codeArticle,
//         quantiteDemandee: QuantiteDemandee
//       });
//     }

//     let message = "Commandes importées avec succès.";
//     if (lignesIgnorees > 0) {
//       message += ` ${lignesIgnorees} lignes ignorées (client ou article introuvable).`;
//     }
//     if (lignesDupliquees > 0) {
//       message += ` ${lignesDupliquees} lignes ignorées (commandes déjà existantes).`;
//     }

//     res.status(200).json({ success: true, message });
//   } catch (error) {
//     console.error("Erreur d'importation :", error);
//     res.status(500).json({ error: "Erreur lors de l'importation." });
//   }
// };






// const importerCommandes = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Aucun fichier téléchargé." });
//     }

//     const workbook = XLSX.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = XLSX.utils.sheet_to_json(sheet);

//     let lignesIgnorees = 0;
//     let lignesDupliquees = 0;

//     for (const row of data) {
//       console.log("Row:", row);

//       const codeClient = (row.codeClient || "").toString().trim().toUpperCase();
//       const codeArticle = (row.codeArticle || "").toString().trim().toUpperCase();
//       const quantiteDemandee = parseInt(row.QuantiteDemandee);

//       if (!codeClient || !codeArticle || isNaN(quantiteDemandee)) {
//         console.warn("Donnée invalide dans la ligne :", { codeClient, codeArticle, quantiteDemandee });
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

//       const commandesExistantes = await ArticleCommandeClient.findAll({
//         include: [{
//           model: CommandeClient,
//           where: { codeClient },
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

//       const codeCommande = generateCodeCommande(codeClient);
//       await CommandeClient.create({
//         codeCommande,
//         dateCommande: new Date(),
//         codeClient
//       });

//       await ArticleCommandeClient.create({
//         codeCommande,
//         codeArticle,
//         quantiteDemandee
//       });
//     }

//     let message = "Commandes importées avec succès.";
//     if (lignesIgnorees > 0) {
//       message += ` ${lignesIgnorees} lignes ignorées (client, article introuvable ou données invalides).`;
//     }
//     if (lignesDupliquees > 0) {
//       message += ` ${lignesDupliquees} lignes ignorées (commandes déjà existantes).`;
//     }

//     res.status(200).json({ success: true, message });
//   } catch (error) {
//     console.error("Erreur d'importation :", error);
//     res.status(500).json({ error: "Erreur lors de l'importation." });
//   }
// };







const importerCommandes = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier téléchargé." });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    let lignesIgnorees = 0;
    let lignesDupliquees = 0;

    for (const row of data) {
      const codeClient = (row.codeClient || "").toString().trim().toUpperCase();
      const codeArticle = (row.codeArticle || "").toString().trim().toUpperCase();
      const quantiteDemandee = parseInt(row.QuantiteDemandee ?? row.quantiteDemandee);

      // Vérifier existence client et article
      const client = await Client.findByPk(codeClient);
      const article = await Article.findByPk(codeArticle);
      if (!client || !article) {
        console.warn("Client ou article non trouvé :", { codeClient, codeArticle });
        lignesIgnorees++;
        continue;
      }

      // Vérifier si la commande existe déjà (via ArticleCommandeClient + CommandeClient)
      const commandesExistantes = await ArticleCommandeClient.findAll({
        include: [{
          model: CommandeClient,
          as: 'commande',             // alias défini dans belongsTo
          where: { codeClient },
          attributes: []             // pas besoin d'infos CommandeClient, juste filtre
        }],
        where: {
          codeArticle,
          quantiteDemandee
        }
      });

      if (commandesExistantes.length > 0) {
        lignesDupliquees++;
        continue;
      }

      // Création de la commande + lien article
      const codeCommande = generateCodeCommande(codeClient);
      const commande = await CommandeClient.create({
        codeCommande,
        dateCommande: new Date(),
        codeClient
      });

      await ArticleCommandeClient.create({
        codeCommande,
        codeArticle,
        quantiteDemandee
      });
    }

    let message = "Commandes importées avec succès.";
    if (lignesIgnorees > 0) {
      message += ` ${lignesIgnorees} lignes ignorées (client ou article introuvable).`;
    }
    if (lignesDupliquees > 0) {
      message += ` ${lignesDupliquees} lignes ignorées (commandes déjà existantes).`;
    }

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.error("Erreur d'importation :", error);
    res.status(500).json({ error: "Erreur lors de l'importation." });
  }
};




// // iporter avec nom client designation article et date commande 


// const importerCommandes = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Aucun fichier téléchargé." });
//     }

//     const workbook = XLSX.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = XLSX.utils.sheet_to_json(sheet);

//     let lignesIgnorees = 0;
//     let lignesDupliquees = 0;

//     for (const row of data) {
//       const { codeClient, codeArticle, QuantiteDemandee, dateCommande, nomClient, designation } = row;

//       const client = await Client.findByPk(codeClient);
//       const article = await Article.findByPk(codeArticle);
//       if (!client || !article) {
//         lignesIgnorees++;
//         continue;
//       }

//       // Vérifier si une commande identique existe déjà (peu importe le codeCommande)
//       const commandesExistantes = await ArticleCommandeClient.findAll({
//         include: [{
//           model: CommandeClient,
//           where: { codeClient },
//         }],
//         where: {
//           codeArticle,
//           quantiteDemandee: QuantiteDemandee
//         }
//       });

//       if (commandesExistantes.length > 0) {
//         lignesDupliquees++;
//         continue;
//       }

//       // Générer le codeCommande
//       const codeCommande = generateCodeCommande(codeClient);

//       // Utiliser la dateCommande du fichier, sinon la date actuelle
//       let dateCde;
//       if (dateCommande) {
//         const parsedDate = new Date(dateCommande);
//         if (isNaN(parsedDate)) {
//           // Date invalide, mettre date actuelle
//           dateCde = new Date();
//         } else {
//           dateCde = parsedDate;
//         }
//       } else {
//         dateCde = new Date();
//       }

//       // Créer la commande
//       const commande = await CommandeClient.create({
//         codeCommande,
//         dateCommande: dateCde,
//         codeClient
//       });

//       // Créer l'articleCommande
//       await ArticleCommandeClient.create({
//         codeCommande,
//         codeArticle,
//         quantiteDemandee: QuantiteDemandee
//       });

//       // Optionnel : juste afficher nomClient et designation pour info
//       console.log(`Import: Client=${nomClient || codeClient}, Article=${designation || codeArticle}`);
//     }

//     let message = "Commandes importées avec succès.";
//     if (lignesIgnorees > 0) {
//       message += ` ${lignesIgnorees} lignes ignorées (client ou article introuvable).`;
//     }
//     if (lignesDupliquees > 0) {
//       message += ` ${lignesDupliquees} lignes ignorées (commandes déjà existantes).`;
//     }

//     res.status(200).json({ success: true, message });
//   } catch (error) {
//     console.error("Erreur d'importation :", error);
//     res.status(500).json({ error: "Erreur lors de l'importation." });
//   }
// };








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
    const idUtilisateur = req.params.idUtilisateur;

    // 1. Trouver les dépôts gérés par l'utilisateur
    const depots = await UtilisateurDepot.find({ utilisateur: idUtilisateur }).select("depot");
    const idsDepots = depots.map((entry) => entry.depot);

    // 2. Trouver les clients de ces dépôts
    const clients = await ClientDepot.find({ depot: { $in: idsDepots } }).select("client");
    const idsClients = clients.map((entry) => entry.client);

    // 3. Chercher les commandes des clients
    const commandes = await Commande.find({ codeClient: { $in: idsClients } });

    res.status(200).json({ success: true, data: commandes });
  } catch (error) {
    console.error("Erreur de filtrage des commandes par dépôt :", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};



module.exports = {
  importerCommandes,
  getAllCommandes,
  getCommandesParDepot
};

















///// sugestion de correction ImporteCommande   

// const fs = require("fs");

// const importerCommandes = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: "Aucun fichier téléchargé." });

//     const workbook = XLSX.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = XLSX.utils.sheet_to_json(sheet);

//     const allClients = await Client.findAll();
//     const allArticles = await Article.findAll();
//     const clientMap = new Map(allClients.map(c => [c.codeClient, c]));
//     const articleMap = new Map(allArticles.map(a => [a.codeArticle, a]));

//     let lignesIgnorees = 0;
//     let lignesDupliquees = 0;

//     const groupedByClient = {};

//     for (const row of data) {
//       const { codeClient, codeArticle, QuantiteDemandee } = row;

//       if (!clientMap.has(codeClient) || !articleMap.has(codeArticle)) {
//         lignesIgnorees++;
//         continue;
//       }

//       if (!groupedByClient[codeClient]) {
//         groupedByClient[codeClient] = [];
//       }

//       groupedByClient[codeClient].push({ codeArticle, QuantiteDemandee });
//     }

//     for (const codeClient in groupedByClient) {
//       const codeCommande = generateCodeCommande(codeClient);
//       const commande = await CommandeClient.create({
//         codeCommande,
//         dateCommande: new Date(),
//         codeClient
//       });

//       for (const { codeArticle, QuantiteDemandee } of groupedByClient[codeClient]) {
//         const exists = await ArticleCommandeClient.findOne({
//           include: [{
//             model: CommandeClient,
//             where: { codeClient }
//           }],
//           where: {
//             codeArticle,
//             quantiteDemandee: QuantiteDemandee
//           }
//         });

//         if (exists) {
//           lignesDupliquees++;
//           continue;
//         }

//         await ArticleCommandeClient.create({
//           codeCommande,
//           codeArticle,
//           quantiteDemandee: QuantiteDemandee
//         });
//       }
//     }

//     fs.unlinkSync(req.file.path); // Supprimer le fichier Excel après traitement

//     let message = "Commandes importées avec succès.";
//     if (lignesIgnorees > 0) message += ` ${lignesIgnorees} lignes ignorées (client ou article introuvable).`;
//     if (lignesDupliquees > 0) message += ` ${lignesDupliquees} lignes ignorées (commandes déjà existantes).`;

//     res.status(200).json({ success: true, message });
//   } catch (error) {
//     console.error("Erreur d'importation :", error);
//     res.status(500).json({ error: "Erreur lors de l'importation." });
//   }
// };
   









// const getAllCommandes = async (req, res) => {
//   try {
//     const commandes = await CommandeClient.findAll({
//       include: [
//         {
//           model: Client,
//           as: "client",
//           attributes: ["codeClient", "nomClient"],
//         },
//         {
//           model: Article,
//           as: "articles",
//           attributes: ["codeArticle", "designatio"],
//           through: {
//             model: ArticleCommandeClient,
//             attributes: ["QuantiteDemandee"]
//           }
//         }
//       ],
//     });

//     const formatted = commandes.flatMap(commande => {
//       return commande.articles.map(article => ({
//         codeCommande: commande.codeCommande,
//         dateCommande: commande.dateCommande,
//         codeClient: commande.client.codeClient,
//         nomClient: commande.client.nomClient,
//         codeArticle: article.codeArticle,
//         designatio: article.designatio,
//         QuantiteDemandee: article.ArticleCommandeClient.QuantiteDemandee
//       }));
//     });

//     res.status(200).json({ data: formatted });
//   } catch (error) {
//     console.error("Erreur lors de la récupération des commandes:", error);
//     res.status(500).json({ error: "Erreur serveur." });
//   }
// };
