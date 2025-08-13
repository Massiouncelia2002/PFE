const express = require("express");
const router = express.Router();
const { CommandeClient, ArticleCommandeClient, CommandePlanifie, Client } = require("../models");
const { Sequelize } = require("sequelize");
const commandePlanifieController = require("../controllers/commandePlanifieController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/planification/partager-commandes", commandePlanifieController.partagerCommandes);

router.post("/planification/affecter", verifyToken, commandePlanifieController.planifierCommande);


router.post("/planification/affecter", verifyToken, commandePlanifieController.getCommandesParClientAvecSuggestions);





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





const { AffectationDepot } = require("../models");
const { Vehicule } = require("../models");
const { Article } = require("../models");
const { BonLivraison } = require("../models");
const { BonRetour } = require("../models");




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
        attributes: [
          "commandePlanifieId",
          "datePrevue",
          "heurePrevue",
          "dureePrevue",
          "statutLivraison",
          "quantiteTransporte"
        ],
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
                attributes: ["codeClient", "nomClient", "adress"] // ✅ ajout important ici
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

      if (!planif.vehicule) {
        return res.status(400).json({ message: "❌ Véhicule introuvable pour ce matricule." });
      }

      // Générer un code unique pour le bon
      const codeBon = `BON-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Enregistrer dans la base
      await BonLivraison.create({
        codeBon,
        codeCommande: planif.commande.codeCommande,
        matricule: planif.matricule,
        commandePlanifieId: planif.commandePlanifieId
      });



      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=BonLivraison_${codeBon}.pdf`);

      const doc = new PDFDocument({ margin: 50 });
      doc.pipe(res);

      // 🔷 En-tête
      doc
        .fontSize(20)
        .text("BON DE LIVRAISON", { align: "center", underline: true })
        .moveDown();

      doc
        .fontSize(12)
        .text(`Code Bon : ${codeBon}`)
        .text(`Date : ${new Date().toLocaleString()}`)
        .moveDown();

      // 🔷 Infos client
      doc
        .font("Helvetica-Bold").text("Client :", { continued: true }).font("Helvetica").text(` ${planif.commande.client.nomClient}`)
        .font("Helvetica-Bold").text("Code Client :", { continued: true }).font("Helvetica").text(` ${planif.commande.client.codeClient}`)
        .font("Helvetica-Bold").text("Adresse :", { continued: true }).font("Helvetica").text(` ${planif.commande.client.adress || "N/A"}`)
        .moveDown();

      // 🔷 Infos commande
      doc
        .font("Helvetica-Bold").text("Commande :", { continued: true }).font("Helvetica").text(` ${planif.commande.codeCommande}`)
        .font("Helvetica-Bold").text("Date commande :", { continued: true }).font("Helvetica").text(` ${planif.commande.dateCommande}`)
        .font("Helvetica-Bold").text("Date prévue :", { continued: true }).font("Helvetica").text(` ${planif.datePrevue}`)
        .font("Helvetica-Bold").text("Heure prévue :", { continued: true }).font("Helvetica").text(` ${planif.heurePrevue}`)
        .font("Helvetica-Bold").text("Durée prévue :", { continued: true }).font("Helvetica").text(` ${planif.dureePrevue} h`)
        .font("Helvetica-Bold").text("Véhicule :", { continued: true }).font("Helvetica").text(` ${planif.vehicule.matricule}`)
        .moveDown();

      // 🔷 Articles (affichage de la quantité demandée)
      doc.font("Helvetica-Bold").text("Articles de la commande :", { underline: true }).moveDown();

      planif.commande.articlesCommandes.forEach((art, i) => {
        doc
          .font("Helvetica-Bold").text(`${i + 1}. `, { continued: true })
          .font("Helvetica").text(`${art.article.designation}`)
          .text(`    ➤ Quantité demandée : ${art.quantiteDemandee}`)
          .moveDown(0.5);
      });

      // 🔷 Total transporté (par véhicule)
      doc
        .moveDown()
        .font("Helvetica-Bold")
        .text(`🚚 Quantité totale transportée : ${planif.quantiteTransporte}`, { align: "right" })
        .moveDown(2);

      // 🔷 Zone de signature
      doc
        .font("Helvetica-Bold").text("Signatures :", { underline: true })
        .moveDown(1)
        .font("Helvetica").text("Client : __________________________", { continued: true })
        .text("         Responsable : __________________________")
        .moveDown();

      doc.end();



    } catch (err) {
      console.error("Erreur PDF bon de livraison:", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);






// const { v4: uuidv4 } = require("uuid");
// const PDFDocument = require("pdfkit");

// router.post(
//   "/genererBonLivraison/:commandePlanifieId",
//   verifyToken,
//   async (req, res) => {
//     try {
//       const { commandePlanifieId } = req.params;

//       const planif = await CommandePlanifie.findOne({
//         where: { commandePlanifieId },
//         include: [
//           {
//             model: CommandeClient,
//             as: "commande",
//             attributes: ["codeCommande", "dateCommande"],
//             include: [
//               {
//                 model: Client,
//                 as: "client",
//                 attributes: ["codeClient", "nomClient", "adress"]
//               },
//               {
//                 model: ArticleCommandeClient,
//                 as: "articlesCommandes",
//                 attributes: ["codeArticle", "quantiteDemandee"],
//                 include: [
//                   {
//                     model: Article,
//                     as: "article",
//                     attributes: ["designation"]
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
//         ]
//       });

//       if (!planif) {
//         return res.status(404).json({ message: "Planification non trouvée." });
//       }

//       if (!planif.vehicule) {
//         return res.status(400).json({ message: "❌ Véhicule introuvable pour ce matricule." });
//       }

//       // Générer un code unique pour le bon
//       const codeBon = `BON-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

//       // Enregistrer dans la base
//       await BonLivraison.create({
//         codeBon,
//         codeCommande: planif.commande.codeCommande,
//         matricule: planif.matricule,
//         commandePlanifieId: planif.commandePlanifieId
//       });

//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader("Content-Disposition", `attachment; filename=BonLivraison_${codeBon}.pdf`);

//       const doc = new PDFDocument({ 
//         margin: 40,
//         size: 'A4',
//         layout: 'portrait'
//       });
      
//       doc.pipe(res);

//       // Couleurs
//       const primaryColor = '#2c3e50';
//       const secondaryColor = '#3498db';
//       const lightBlue = '#e8f4fd';
//       const lightYellow = '#fff3cd';
//       const gray = '#ecf0f1';

//       // 🔷 En-tête
//       doc
//         .fillColor(primaryColor)
//         .fontSize(22)
//         .font('Helvetica-Bold')
//         .text("BON DE LIVRAISON", { 
//           align: "center",
//           underline: false
//         })
//         .moveDown(0.5);
      
//       // Ligne de séparation
//       doc
//         .strokeColor(primaryColor)
//         .lineWidth(3)
//         .moveTo(50, 100)
//         .lineTo(550, 100)
//         .stroke();

//       // 🔷 Informations du document
//       doc
//         .fillColor('#000')
//         .rect(50, 120, 500, 80)
//         .fill(lightBlue)
//         .stroke(secondaryColor)
//         .stroke();
      
//       doc
//         .fillColor(primaryColor)
//         .fontSize(14)
//         .font('Helvetica-Bold')
//         .text("Informations du Document", 70, 130, { align: "center" });
      
//       // Grille d'informations
//       doc
//         .fontSize(10)
//         .font('Helvetica')
//         .text(`Code Bon: ${codeBon}`, 70, 160, { width: 200 })
//         .text(`Date Génération: ${new Date().toLocaleString()}`, 70, 180)
//         .text(`Code Commande: ${planif.commande.codeCommande}`, 300, 160)
//         .text(`Matricule: ${planif.vehicule.matricule}`, 300, 180);

//       // 🔷 Grille d'informations (client et expéditeur)
//       const gridY = 220;
      
//       // Section Expéditeur
//       doc
//         .rect(50, gridY, 230, 120)
//         .fill(lightBlue)
//         .stroke(secondaryColor)
//         .stroke();
      
//       doc
//         .fillColor(primaryColor)
//         .fontSize(12)
//         .font('Helvetica-Bold')
//         .text("📦 Expéditeur", 60, gridY + 10);
      
//       doc
//         .fontSize(10)
//         .font('Helvetica')
//         .text(`Société: [Nom de votre société]`, 60, gridY + 35)
//         .text(`Adresse: [Adresse complète]`, 60, gridY + 55)
//         .text(`Téléphone: [Numéro de téléphone]`, 60, gridY + 75)
//         .text(`Email: [Email]`, 60, gridY + 95);

//       // Section Destinataire
//       doc
//         .rect(320, gridY, 230, 120)
//         .fill(lightBlue)
//         .stroke(secondaryColor)
//         .stroke();
      
//       doc
//         .fillColor(primaryColor)
//         .fontSize(12)
//         .font('Helvetica-Bold')
//         .text("🏢 Destinataire", 330, gridY + 10);
      
//       doc
//         .fontSize(10)
//         .font('Helvetica')
//         .text(`Client: ${planif.commande.client.nomClient}`, 330, gridY + 35)
//         .text(`Adresse: ${planif.commande.client.adress || "N/A"}`, 330, gridY + 55)
//         .text(`Téléphone: [Téléphone client]`, 330, gridY + 75)
//         .text(`Contact: [Personne de contact]`, 330, gridY + 95);

//       // 🔷 Tableau des articles
//       const tableY = gridY + 140;
      
//       // En-tête du tableau
//       doc
//         .fillColor(secondaryColor)
//         .rect(50, tableY, 500, 20)
//         .fill();
      
//       doc
//         .fillColor('#fff')
//         .fontSize(10)
//         .font('Helvetica-Bold')
//         .text("Réf. Article", 55, tableY + 5, { width: 80 })
//         .text("Désignation", 135, tableY + 5, { width: 150 })
//         .text("Quantité", 285, tableY + 5, { width: 60, align: 'right' })
//         .text("Unité", 345, tableY + 5, { width: 60 })
//         .text("Observations", 405, tableY + 5, { width: 140 });

//       // Lignes des articles
//       let currentY = tableY + 20;
//       planif.commande.articlesCommandes.forEach((art, i) => {
//         doc
//           .fillColor('#fff')
//           .rect(50, currentY, 500, 20)
//           .fill()
//           .strokeColor(gray)
//           .lineWidth(0.5)
//           .moveTo(50, currentY + 20)
//           .lineTo(550, currentY + 20)
//           .stroke();
        
//         doc
//           .fillColor('#000')
//           .fontSize(10)
//           .font('Helvetica')
//           .text(art.codeArticle, 55, currentY + 5)
//           .text(art.article.designation, 135, currentY + 5, { width: 150 })
//           .text(art.quantiteDemandee.toString(), 285, currentY + 5, { width: 60, align: 'right' })
//           .text("Pièces", 345, currentY + 5, { width: 60 })
//           .text("-", 405, currentY + 5, { width: 140 });
        
//         currentY += 20;
//       });

//       // Ligne de total
//       doc
//         .fillColor(lightBlue)
//         .rect(50, currentY, 500, 20)
//         .fill()
//         .strokeColor(gray)
//         .lineWidth(0.5)
//         .moveTo(50, currentY + 20)
//         .lineTo(550, currentY + 20)
//         .stroke();
      
//       doc
//         .fillColor(primaryColor)
//         .fontSize(10)
//         .font('Helvetica-Bold')
//         .text("TOTAL ARTICLES", 55, currentY + 5, { width: 200 })
//         .text(planif.quantiteTransporte.toString(), 285, currentY + 5, { width: 60, align: 'right' })
//         .text("Articles divers", 345, currentY + 5, { width: 210 });

//       currentY += 30;

//       // 🔷 Observations
//       doc
//         .rect(50, currentY, 500, 80)
//         .fill(lightYellow)
//         .stroke('#ffeaa7')
//         .stroke();
      
//       doc
//         .fillColor('#856404')
//         .fontSize(12)
//         .font('Helvetica-Bold')
//         .text("📋 Observations et Instructions", 60, currentY + 10);
      
//       doc
//         .fillColor('#000')
//         .fontSize(10)
//         .font('Helvetica')
//         .text("• Livraison à effectuer aux heures d'ouverture (8h-17h)", 60, currentY + 35)
//         .text("• Vérifier l'état des marchandises à la réception", 60, currentY + 50)
//         .text("• Signaler immédiatement tout dommage ou manquant", 60, currentY + 65)
//         .text("• Conserver ce bon de livraison pour vos archives", 60, currentY + 80);

//       currentY += 110;

//       // 🔷 Signatures
//       doc
//         .strokeColor(gray)
//         .lineWidth(2)
//         .moveTo(50, currentY)
//         .lineTo(550, currentY)
//         .stroke();
      
//       currentY += 20;

//       // Signature Livreur
//       doc
//         .rect(50, currentY, 230, 80)
//         .fill('#fafafa')
//         .stroke('#bdc3c7')
//         .stroke();
      
//       doc
//         .fillColor(primaryColor)
//         .fontSize(12)
//         .font('Helvetica-Bold')
//         .text("Signature Livreur", 50, currentY + 10, { width: 230, align: 'center' });
      
//       doc
//         .strokeColor('#34495e')
//         .lineWidth(1)
//         .moveTo(100, currentY + 60)
//         .lineTo(230, currentY + 60)
//         .stroke();
      
//       doc
//         .fillColor('#7f8c8d')
//         .fontSize(8)
//         .text("Nom et signature", 100, currentY + 65, { width: 130, align: 'center' });

//       // Signature Client
//       doc
//         .rect(320, currentY, 230, 80)
//         .fill('#fafafa')
//         .stroke('#bdc3c7')
//         .stroke();
      
//       doc
//         .fillColor(primaryColor)
//         .fontSize(12)
//         .font('Helvetica-Bold')
//         .text("Signature Client", 320, currentY + 10, { width: 230, align: 'center' });
      
//       doc
//         .strokeColor('#34495e')
//         .lineWidth(1)
//         .moveTo(370, currentY + 60)
//         .lineTo(500, currentY + 60)
//         .stroke();
      
//       doc
//         .fillColor('#7f8c8d')
//         .fontSize(8)
//         .text("Nom, date et signature", 370, currentY + 65, { width: 130, align: 'center' });

//       doc.end();
//     } catch (error) {
//       console.error("Erreur lors de la génération du bon de livraison:", error);
//       res.status(500).json({ message: "Erreur lors de la génération du PDF." });
//     }
//   }
// );








router.post("/gererRetour/:commandePlanifieId", verifyToken, async (req, res) => {
  try {
    const id = req.params.commandePlanifieId;
    const { statut, quantiteRetourne } = req.body;

    const planif = await CommandePlanifie.findByPk(id, {
      include: [{ model: BonLivraison, as: "bonLivraison" }],
    });

    if (!planif) {
      return res.status(404).json({ message: "⚠️ Planification introuvable." });
    }

    if (!planif.bonLivraison) {
      return res.status(400).json({
        message: "⚠️ Aucun bon de livraison associé à cette planification.",
      });
    }

    if (!["livre", "annule", "retourne"].includes(statut)) {
      return res.status(400).json({ message: "❌ Statut invalide." });
    }

    let quantite = 0;

    if (statut === "livre") {
      quantite = 0;
    } else if (statut === "annule") {
      quantite = planif.quantiteTransporte;
    } else if (statut === "retourne") {
      if (
        quantiteRetourne === undefined ||
        quantiteRetourne === null ||
        isNaN(quantiteRetourne) ||
        quantiteRetourne <= 0 ||
        quantiteRetourne >= planif.quantiteTransporte
      ) {
        return res.status(400).json({
          message:
            "❌ Quantité retournée invalide. Elle doit être > 0 et strictement < à la quantité transportée.",
        });
      }
      quantite = quantiteRetourne;
    }

    // ✅ Mise à jour du statut
    await planif.update({ statutLivraison: statut });

    // ✅ Génération du bon de retour avec `commandePlanifieId`
    const codeBonRetour = `BR${Date.now()}`;
    const bonRetour = await BonRetour.create({
      codeBonRetour,
      codeBon: planif.bonLivraison.codeBon,
      quantiteRetourne: quantite,
      commandePlanifieId: planif.commandePlanifieId, // ⚠️ Important
    });

    return res.json({
      message: "✅ Mise à jour réussie et bon de retour généré",
      bonRetour,
    });
  } catch (error) {
    console.error("Erreur création bon retour:", error);
    return res.status(500).json({ message: "❌ Erreur serveur" });
  }
});







router.post("/genererBonRetour/:commandePlanifieId", verifyToken, async (req, res) => {
  try {
    const { commandePlanifieId } = req.params;

    const planif = await CommandePlanifie.findOne({
      where: { commandePlanifieId },
      include: [
        { model: BonLivraison, as: "bonLivraison" },
        { model: BonRetour, as: "bonRetour" },
        {
          model: CommandeClient,
          as: "commande",
          include: [
            { model: Client, as: "client" },
            {
              model: ArticleCommandeClient,
              as: "articlesCommandes",
              include: [{ model: Article, as: "article" }]
            }
          ]
        },
        { model: Vehicule, as: "vehicule" }
      ]
    });

    if (!planif || !planif.bonLivraison || !planif.bonRetour) {
      return res.status(404).json({ message: "\u26d4 Données incomplètes pour générer le bon de retour." });
    }

    const codeBonRetour = planif.bonRetour.codeBonRetour;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=BonRetour_${codeBonRetour}.pdf`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fontSize(20).text("BON DE RETOUR", { align: "center", underline: true }).moveDown();

    doc.fontSize(12).text(`Code Bon de Retour : ${codeBonRetour}`)
      .text(`Date : ${new Date().toLocaleString()}`).moveDown();

    doc.font("Helvetica-Bold").text("Client :", { continued: true })
      .font("Helvetica").text(` ${planif.commande.client.nomClient}`)
      .font("Helvetica-Bold").text("Code Client :", { continued: true })
      .font("Helvetica").text(` ${planif.commande.client.codeClient}`)
      .font("Helvetica-Bold").text("Adresse :", { continued: true })
      .font("Helvetica").text(` ${planif.commande.client.adress || "N/A"}`).moveDown();

    doc.font("Helvetica-Bold").text("Commande :", { continued: true })
      .font("Helvetica").text(` ${planif.commande.codeCommande}`)
      .font("Helvetica-Bold").text("Date commande :", { continued: true })
      .font("Helvetica").text(` ${planif.commande.dateCommande}`)
      .font("Helvetica-Bold").text("Date prévue :", { continued: true })
      .font("Helvetica").text(` ${planif.datePrevue}`)
      .font("Helvetica-Bold").text("Heure prévue :", { continued: true })
      .font("Helvetica").text(` ${planif.heurePrevue}`)
      .font("Helvetica-Bold").text("Durée prévue :", { continued: true })
      .font("Helvetica").text(` ${planif.dureePrevue} h`)
      .font("Helvetica-Bold").text("Véhicule :", { continued: true })
      .font("Helvetica").text(` ${planif.vehicule?.matricule || "N/A"}`).moveDown();

    doc.font("Helvetica-Bold").text("Articles de la commande :", { underline: true }).moveDown();
    planif.commande.articlesCommandes.forEach((art, i) => {
      doc.font("Helvetica-Bold").text(`${i + 1}. `, { continued: true })
        .font("Helvetica").text(`${art.article.designation}`)
        .text(`    \u27a4 Quantité demandée : ${art.quantiteDemandee}`)
        .moveDown(0.5);
    });

    doc.moveDown()
      .font("Helvetica-Bold")
      .text(`\ud83d\ude9a Quantité transportée : ${planif.quantiteTransporte}`, { align: "right" })
      .text(`\ud83d\udd01 Quantité retournée : ${planif.bonRetour.quantiteRetourne}`, { align: "right" })
      .moveDown(2);

    doc.font("Helvetica-Bold").text("Signatures :", { underline: true }).moveDown(1)
      .font("Helvetica").text("Client : __________________________", { continued: true })
      .text("         Responsable : __________________________").moveDown();

    doc.end();
  } catch (error) {
    console.error("Erreur PDF bon de retour:", error);
    return res.status(500).json({ message: "\u274c Erreur serveur" });
  }
});







// router.post("/genererBonRetour/:commandePlanifieId", verifyToken, async (req, res) => {
//   try {
//     const { commandePlanifieId } = req.params;

//     const planif = await CommandePlanifie.findOne({
//       where: { commandePlanifieId },
//       include: [
//         { model: BonLivraison, as: "bonLivraison" },
//         { model: BonRetour, as: "bonRetour" },
//         {
//           model: CommandeClient,
//           as: "commande",
//           include: [
//             { model: Client, as: "client" },
//             {
//               model: ArticleCommandeClient,
//               as: "articlesCommandes",
//               include: [{ model: Article, as: "article" }]
//             }
//           ]
//         },
//         { model: Vehicule, as: "vehicule" }
//       ]
//     });

//     if (!planif || !planif.bonLivraison || !planif.bonRetour) {
//       return res.status(404).json({ message: "\u26d4 Données incomplètes pour générer le bon de retour." });
//     }
// const codeBonRetour = planif.bonRetour.codeBonRetour;

// res.setHeader("Content-Type", "application/pdf");
// res.setHeader("Content-Disposition", `attachment; filename=BonRetour_${codeBonRetour}.pdf`);

// const doc = new PDFDocument({ 
//   margin: 40,
//   size: 'A4',
//   layout: 'portrait'
// });

// doc.pipe(res);

// // Couleurs
// const primaryColor = '#2c3e50';
// const secondaryColor = '#3498db';
// const lightBlue = '#e8f4fd';
// const lightYellow = '#fff3cd';
// const gray = '#ecf0f1';

// // 🔷 En-tête
// doc
//   .fillColor(primaryColor)
//   .fontSize(22)
//   .font('Helvetica-Bold')
//   .text("BON DE RETOUR", { 
//     align: "center",
//     underline: false
//   })
//   .moveDown(0.5);

// // Ligne de séparation
// doc
//   .strokeColor(primaryColor)
//   .lineWidth(3)
//   .moveTo(50, 100)
//   .lineTo(550, 100)
//   .stroke();

// // 🔷 Informations du document
// doc
//   .fillColor('#000')
//   .rect(50, 120, 500, 80)
//   .fill(lightBlue)
//   .stroke(secondaryColor)
//   .stroke();

// doc
//   .fillColor(primaryColor)
//   .fontSize(14)
//   .font('Helvetica-Bold')
//   .text("Informations du Document", 70, 130, { align: "center" });

// doc
//   .fontSize(10)
//   .font('Helvetica')
//   .text(`Code Bon Retour: ${codeBonRetour}`, 70, 160, { width: 200 })
//   .text(`Date Génération: ${new Date().toLocaleString()}`, 70, 180)
//   .text(`Code Commande: ${planif.commande.codeCommande}`, 300, 160)
//   .text(`Matricule: ${planif.vehicule?.matricule || "N/A"}`, 300, 180);

// // 🔷 Grille d'informations
// const gridY = 220;

// // Section Expéditeur
// doc
//   .rect(50, gridY, 230, 120)
//   .fill(lightBlue)
//   .stroke(secondaryColor)
//   .stroke();

// doc
//   .fillColor(primaryColor)
//   .fontSize(12)
//   .font('Helvetica-Bold')
//   .text("📦 Expéditeur", 60, gridY + 10);

// doc
//   .fontSize(10)
//   .font('Helvetica')
//   .text(`Société: [Nom de votre société]`, 60, gridY + 35)
//   .text(`Adresse: [Adresse complète]`, 60, gridY + 55)
//   .text(`Téléphone: [Numéro de téléphone]`, 60, gridY + 75)
//   .text(`Email: [Email]`, 60, gridY + 95);

// // Section Destinataire
// doc
//   .rect(320, gridY, 230, 120)
//   .fill(lightBlue)
//   .stroke(secondaryColor)
//   .stroke();

// doc
//   .fillColor(primaryColor)
//   .fontSize(12)
//   .font('Helvetica-Bold')
//   .text("🏢 Destinataire", 330, gridY + 10);

// doc
//   .fontSize(10)
//   .font('Helvetica')
//   .text(`Client: ${planif.commande.client.nomClient}`, 330, gridY + 35)
//   .text(`Adresse: ${planif.commande.client.adress || "N/A"}`, 330, gridY + 55)
//   .text(`Téléphone: [Téléphone client]`, 330, gridY + 75)
//   .text(`Contact: [Personne de contact]`, 330, gridY + 95);

// // 🔷 Tableau des articles
// const tableY = gridY + 140;

// // En-tête du tableau
// doc
//   .fillColor(secondaryColor)
//   .rect(50, tableY, 500, 20)
//   .fill();

// doc
//   .fillColor('#fff')
//   .fontSize(10)
//   .font('Helvetica-Bold')
//   .text("Réf. Article", 55, tableY + 5, { width: 80 })
//   .text("Désignation", 135, tableY + 5, { width: 150 })
//   .text("Quantité", 285, tableY + 5, { width: 60, align: 'right' })
//   .text("Retour", 345, tableY + 5, { width: 60, align: 'right' })
//   .text("Observations", 405, tableY + 5, { width: 140 });

// // Lignes des articles
// let currentY = tableY + 20;
// planif.commande.articlesCommandes.forEach((art, i) => {
//   doc
//     .fillColor('#fff')
//     .rect(50, currentY, 500, 20)
//     .fill()
//     .strokeColor(gray)
//     .lineWidth(0.5)
//     .moveTo(50, currentY + 20)
//     .lineTo(550, currentY + 20)
//     .stroke();
  
//   doc
//     .fillColor('#000')
//     .fontSize(10)
//     .font('Helvetica')
//     .text(art.codeArticle, 55, currentY + 5)
//     .text(art.article.designation, 135, currentY + 5, { width: 150 })
//     .text(art.quantiteDemandee.toString(), 285, currentY + 5, { width: 60, align: 'right' })
//     .text(planif.bonRetour.quantiteRetourne.toString(), 345, currentY + 5, { width: 60, align: 'right' })
//     .text("-", 405, currentY + 5, { width: 140 });
  
//   currentY += 20;
// });

// // Ligne de total
// doc
//   .fillColor(lightBlue)
//   .rect(50, currentY, 500, 20)
//   .fill()
//   .strokeColor(gray)
//   .lineWidth(0.5)
//   .moveTo(50, currentY + 20)
//   .lineTo(550, currentY + 20)
//   .stroke();

// doc
//   .fillColor(primaryColor)
//   .fontSize(10)
//   .font('Helvetica-Bold')
//   .text("TOTAL", 55, currentY + 5, { width: 200 })
//   .text(planif.quantiteTransporte.toString(), 285, currentY + 5, { width: 60, align: 'right' })
//   .text(planif.bonRetour.quantiteRetourne.toString(), 345, currentY + 5, { width: 60, align: 'right' })
//   .text("", 405, currentY + 5, { width: 140 });

// currentY += 30;

// // 🔷 Observations
// doc
//   .rect(50, currentY, 500, 80)
//   .fill(lightYellow)
//   .stroke('#ffeaa7')
//   .stroke();

// doc
//   .fillColor('#856404')
//   .fontSize(12)
//   .font('Helvetica-Bold')
//   .text("📋 Observations et Instructions", 60, currentY + 10);

// doc
//   .fillColor('#000')
//   .fontSize(10)
//   .font('Helvetica')
//   .text("• Vérifier l'état des marchandises retournées", 60, currentY + 35)
//   .text("• Signaler immédiatement tout dommage ou différence", 60, currentY + 50)
//   .text("• Conserver ce bon de retour pour vos archives", 60, currentY + 65)
//   .text("• Signature obligatoire pour validation", 60, currentY + 80);

// currentY += 110;

// // 🔷 Signatures
// doc
//   .strokeColor(gray)
//   .lineWidth(2)
//   .moveTo(50, currentY)
//   .lineTo(550, currentY)
//   .stroke();

// currentY += 20;

// // Signature Livreur
// doc
//   .rect(50, currentY, 230, 80)
//   .fill('#fafafa')
//   .stroke('#bdc3c7')
//   .stroke();

// doc
//   .fillColor(primaryColor)
//   .fontSize(12)
//   .font('Helvetica-Bold')
//   .text("Signature Livreur", 50, currentY + 10, { width: 230, align: 'center' });

// doc
//   .strokeColor('#34495e')
//   .lineWidth(1)
//   .moveTo(100, currentY + 60)
//   .lineTo(230, currentY + 60)
//   .stroke();

// doc
//   .fillColor('#7f8c8d')
//   .fontSize(8)
//   .text("Nom et signature", 100, currentY + 65, { width: 130, align: 'center' });

// // Signature Client
// doc
//   .rect(320, currentY, 230, 80)
//   .fill('#fafafa')
//   .stroke('#bdc3c7')
//   .stroke();

// doc
//   .fillColor(primaryColor)
//   .fontSize(12)
//   .font('Helvetica-Bold')
//   .text("Signature Client", 320, currentY + 10, { width: 230, align: 'center' });

// doc
//   .strokeColor('#34495e')
//   .lineWidth(1)
//   .moveTo(370, currentY + 60)
//   .lineTo(500, currentY + 60)
//   .stroke();

// doc
//   .fillColor('#7f8c8d')
//   .fontSize(8)
//   .text("Nom, date et signature", 370, currentY + 65, { width: 130, align: 'center' });

// doc.end();

//  } catch (error) {
//     console.error("Erreur PDF bon de retour:", error);
//     return res.status(500).json({ message: "\u274c Erreur serveur" });
//   }
// });




module.exports = router;









