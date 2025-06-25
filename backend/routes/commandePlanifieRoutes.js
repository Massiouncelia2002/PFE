const express = require("express");
const router = express.Router();
const { CommandeClient, ArticleCommandeClient, CommandePlanifie, Client } = require("../models");
const { Sequelize } = require("sequelize");
const commandePlanifieController = require("../controllers/commandePlanifieController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/planification/partager-commandes", commandePlanifieController.partagerCommandes);

router.post("/planification/affecter", verifyToken, commandePlanifieController.planifierCommande);



router.get("/afficheCommandePanifie", async (req, res) => {
  try {
    const { codeDepot } = req.query;

    if (!codeDepot) {
      return res.status(400).json({ erreur: "Le code du dépôt est requis." });
    }

    const commandes = await CommandeClient.findAll({
      attributes: [
        "codeCommande",
        "codeClient",
        "dateCommande",
        [
          Sequelize.literal(`(
            SELECT SUM("quantiteDemandee")
            FROM "articlesCommandeClient" 
            WHERE "articlesCommandeClient"."codeCommande" = "CommandeClient"."codeCommande"
          )`),
          "quantiteDemandee"
        ],
        [
          Sequelize.literal(`(
            SELECT COALESCE(SUM("quantiteTransporte"), 0)
            FROM "commandePlanifiees"
            WHERE "commandePlanifiees"."codeCommande" = "CommandeClient"."codeCommande"
          )`),
          "quantiteTransporte"
        ]
      ],
      include: [
        {
          model: ArticleCommandeClient,
          as: "articlesCommandes", // ✅ alias respecté
          attributes: [],
          required: true
        },
        {
          model: Client,
          as: "client", // ✅ alias défini dans index.js
          attributes: [], // ou ["nomClient"] si tu veux l’afficher
          where: { codeDepot },
          required: true
        }
      ],
      group: [
        "CommandeClient.codeCommande",
        "CommandeClient.codeClient",
        "CommandeClient.dateCommande"
      ],
      raw: true
    });

    const result = commandes.map((cmd) => {
      const demandee = parseFloat(cmd.quantiteDemandee || 0);
      const transportee = parseFloat(cmd.quantiteTransporte || 0);

      let statut = "non_planifie";
      if (transportee > 0 && transportee < demandee) statut = "partiellement_planifie";
      else if (transportee >= demandee) statut = "entierement_planifie";

      return {
        codeCommande: cmd.codeCommande,
        codeClient: cmd.codeClient,
        dateCommande: cmd.dateCommande,
        quantiteDemandee: demandee,
        quantiteTransporte: transportee,
        statut
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Erreur /afficheCommandePanifie:", err);
    res.status(500).json({
      erreur: "Erreur lors de la récupération des commandes planifiées."
    });
  }
});


















// router.get(
//   "/affichePlanificationPourAdminDepot",verifyToken,async (req, res) => {
//     try {
//       const user = req.user;
//       const codeDepot = user.codeDepot; // supposons que le token comprend codeDepot de l’utilisateur

//       const planifs = await CommandePlanifie.findAll({
//         include: [
//           {
//             model: CommandeClient,
//             as: "commande",
//             include: [
//               {
//                 model: Client,
//                 as: "client",
//                 attributes: ["codeClient", "nomClient"]
//               }
//             ],
//             attributes: ["codeCommande"]
//           },
//           {
//             model: Vehicule,
//             as: "vehicule",
//             attributes: ["matricule"]
//           }
//         ],
//         where: { "$commande.client.codeDepot$": codeDepot },
//         order: [["datePrevue", "ASC"], ["heurePrevue", "ASC"]]
//       });

//       res.json({ data: planifs });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Erreur serveur" });
//     }
//   }
// );


const { AffectationDepot } = require("../models");
const { Vehicule } = require("../models");
const { Article } = require("../models");
const { BonLivraison } = require("../models");


// router.get(
//   "/affichePlanificationPourAdminDepot",
//   verifyToken,
//   async (req, res) => {
//     try {
//       const user = req.user;

//       // 🔁 On récupère le codeDepot à partir de l'affectation
//       const affectation = await AffectationDepot.findOne({
//         where: { codeUtilisateur: user.id },
//       });

//       if (!affectation) {
//         return res.status(403).json({ message: "⚠️ Aucun dépôt affecté à cet utilisateur." });
//       }

//       const codeDepot = affectation.codeDepot;

//       // 🔍 Récupérer les planifications liées à ce dépôt
//       const planifs = await CommandePlanifie.findAll({
//         include: [
//           {
//             // model: CommandeClient,
//               { model: CommandeClient, as: "commande" }

//             include: [
//               {
//                 model: Client,
//                 as: "client",
//                 attributes: ["codeClient", "nomClient"],
//                 where: { codeDepot }
//               }
//             ],
//             attributes: ["codeCommande"]
//           },
//           {
//             model: Vehicule,
//             attributes: ["matricule"]
//           }
//         ],
//         order: [["datePrevue", "ASC"], ["heurePrevue", "ASC"]]
//       });

//       res.json({ data: planifs });
//     } catch (err) {
//       console.error("Erreur planification admin dépôt:", err);
//       res.status(500).json({ message: "Erreur serveur" });
//     }
//   }
// );


// router.get(
//   "/affichePlanificationPourAdminDepot",
//   verifyToken,
//   async (req, res) => {
//     try {
//       const user = req.user;

//       // 🔁 On récupère le codeDepot à partir de l'affectation
//       const affectation = await AffectationDepot.findOne({
//         where: { codeUtilisateur: user.id },
//       });

//       if (!affectation) {
//         return res.status(403).json({ message: "⚠️ Aucun dépôt affecté à cet utilisateur." });
//       }

//       const codeDepot = affectation.codeDepot;

//       // 🔍 Récupérer les planifications liées à ce dépôt
//       // const planifs = await CommandePlanifie.findAll({
//       //   include: [
//       //     {
//       //       model: CommandeClient,
//       //       as: "commande", // ⚠️ alias exact comme dans index.js
//       //       include: [
//       //         {
//       //           model: Client,
//       //           as: "client", // ⚠️ alias exact comme dans index.js
//       //           attributes: ["codeClient", "nomClient"],
//       //           where: { codeDepot }
//       //         }
//       //       ],
//       //       attributes: ["codeCommande"]
//       //     },
//       //     // {
//       //     //   model: Vehicule,
//       //     //   attributes: ["matricule"]
//       //     // }

//       //     { model: Vehicule, as: "vehicule", attributes: ["matricule"] }


//       //   ],
//       //   order: [["datePrevue", "ASC"], ["heurePrevue", "ASC"]]
//       // });



//       const planifs = await CommandePlanifie.findAll({
//         include: [
//           {
//             model: CommandeClient,
//             as: "commande",
//             attributes: ["codeCommande", "dateCommande", "datePlanification"],

//             include: [
//               {
//                 model: Client,
//                 as: "client",
//                 attributes: ["codeClient", "nomClient"],
//                 where: { codeDepot }
//               },
//               {
//                 model: ArticleCommandeClient,
//                 as: "articlesCommandes", // ⚠️ alias défini dans index.js
//                 include: [
//                   {
//                     model: Article,
//                     as: "article", // ⚠️ alias exact défini dans index.js
//                     attributes: ["codeArticle", "designation"]
//                   }
//                 ]
//               }
//             ]
//           },
//           {
//             model: Vehicule,
//             as: "vehicule",
//             attributes: ["matricule"]
//           }
//         ],
//         order: [["datePrevue", "ASC"], ["heurePrevue", "ASC"]]
//       });


//       res.json({ data: planifs });
//     } catch (err) {
//       console.error("Erreur planification admin dépôt:", err);
//       res.status(500).json({ message: "Erreur serveur" });
//     }
//   }
// );




router.get(
  "/affichePlanificationPourAdminDepot",
  verifyToken,
  async (req, res) => {
    try {
      const user = req.user;

      // 🔁 On récupère le codeDepot à partir de l'affectation
      const affectation = await AffectationDepot.findOne({
        where: { codeUtilisateur: user.id },
      });

      if (!affectation) {
        return res
          .status(403)
          .json({ message: "⚠️ Aucun dépôt affecté à cet utilisateur." });
      }

      const codeDepot = affectation.codeDepot;

      // 🔍 Récupérer les planifications liées à ce dépôt
      const planifs = await CommandePlanifie.findAll({
        include: [
          {
            model: CommandeClient,
            as: "commande",
            attributes: ["codeCommande", "dateCommande"], // ✅ PAS de datePlanification ici
            include: [
              {
                model: Client,
                as: "client",
                attributes: ["codeClient", "nomClient"],
                where: { codeDepot },
              },
              {
                model: ArticleCommandeClient,
                as: "articlesCommandes",
                attributes: ["codeArticle", "quantiteDemandee"],
                include: [
                  {
                    model: Article,
                    as: "article",
                    attributes: ["codeArticle", "designation"],
                  },
                ],
              },
            ],
          },
          {
            model: Vehicule,
            as: "vehicule",
            attributes: ["matricule"],
          },
        ],
        order: [
          ["datePrevue", "ASC"],
          ["heurePrevue", "ASC"],
        ],
      });

      res.json({ data: planifs });
    } catch (err) {
      console.error("Erreur planification admin dépôt:", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

















const { v4: uuidv4 } = require("uuid");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");



router.post(
  "/genererBonLivraison/:commandePlanifieId",
  verifyToken,
  async (req, res) => {
    try {
      const { commandePlanifieId } = req.params;

      const planif = await CommandePlanifie.findOne({
        where: { commandePlanifieId },
        include: [
          {
            model: CommandeClient,
            as: "commande",
            attributes: ["codeCommande", "dateCommande"],
            include: [
              {
                model: Client,
                as: "client",
                attributes: ["codeClient", "nomClient"]
              },
              {
                model: ArticleCommandeClient,
                as: "articlesCommandes",
                attributes: ["codeArticle", "quantiteDemandee"],
                include: [
                  {
                    model: Article,
                    as: "article",
                    attributes: ["designation"]
                  }
                ]
              }
            ]
          },
          {
            model: Vehicule,
            as: "vehicule",
            attributes: ["matricule"]
          }
        ]
      });

      if (!planif) {
        return res.status(404).json({ message: "Planification non trouvée." });
      }

      // ➕ Générer un code unique
      const codeBon = `BON-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // 📁 Créer le dossier 'pdfs' s’il n’existe pas
      const pdfDir = path.join(__dirname, "../../pdfs");
      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
      }

      // ➕ Enregistrement en base
      const bon = await BonLivraison.create({
        codeBon,
        codeCommande: planif.codeCommande,
        matricule: planif.matricule,
        commandePlanifieId: planif.commandePlanifieId
      });

      // 📝 Génération du PDF
      const doc = new PDFDocument();
      const filePath = path.join(pdfDir, `${codeBon}.pdf`);
      doc.pipe(fs.createWriteStream(filePath));

      doc.fontSize(20).text("Bon de Livraison", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text(`Code Bon: ${codeBon}`);
      doc.text(`Date de génération: ${new Date().toLocaleString()}`);
      doc.text(`Client: ${planif.commande.client.nomClient} (${planif.commande.client.codeClient})`);
      doc.text(`Commande: ${planif.commande.codeCommande}`);
      doc.text(`Date commande: ${planif.commande.dateCommande}`);
      doc.text(`Véhicule: ${planif.vehicule.matricule}`);
      doc.text(`Date prévue: ${planif.datePrevue}`);
      doc.text(`Heure prévue: ${planif.heurePrevue}`);
      doc.text(`Durée prévue: ${planif.dureePrevue} h`);
      doc.text(`Quantité transportée: ${planif.quantiteTransporte}`);
      doc.moveDown();

      doc.text("Articles:");
      planif.commande.articlesCommandes.forEach((art, i) => {
        doc.text(` ${i + 1}. ${art.article.designation} (x${art.quantiteDemandee})`);
      });

      doc.end();

      res.json({
        message: "✅ Bon de livraison généré avec succès",
        codeBon,
        downloadUrl: `/pdfs/${codeBon}.pdf` // Tu pourras l'utiliser pour le frontend
      });
    } catch (err) {
      console.error("Erreur PDF bon de livraison:", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

module.exports = router;








module.exports = router;
