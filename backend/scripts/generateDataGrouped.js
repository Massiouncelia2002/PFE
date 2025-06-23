// require("dotenv").config(); 


// const fs = require("fs");
// const path = require("path");
// const { Sequelize } = require("sequelize");
// const sequelize = require("../config/sequelize"); 
// const { CommandeClient } = require("../models");
// const { Sequelize } = require("sequelize");

// async function generateDataGrouped() {
//   try {
//     const commandes = await CommandeClient.findAll({
//       attributes: [
//         "codeDepot",
//         "codeArticle",
//         [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("dateCommande")), "mois"],
//         [Sequelize.fn("SUM", Sequelize.col("quantiteDemandee")), "quantiteDemandee"]
//       ],
//       group: ["codeDepot", "codeArticle", "mois"],
//       raw: true
//     });

//     if (commandes.length === 0) {
//       console.warn("⚠️ Aucune commande trouvée.");
//       return;
//     }

//     // En-tête du fichier CSV
//     const csvContent = ["codeDepot,codeArticle,mois,quantiteDemandee"];

//     commandes.forEach((cmd) => {
//       const mois = new Date(cmd.mois).toISOString().split("T")[0];
//       csvContent.push(`${cmd.codeDepot},${cmd.codeArticle},${mois},${cmd.quantiteDemandee}`);
//     });

//     // Chemin vers le dossier python_scripts
//     const outputPath = path.join(__dirname, "../../python_scripts/data_grouped.csv");

//     // Écrire le fichier
//     fs.writeFileSync(outputPath, csvContent.join("\n"));
//     console.log("✅ Fichier data_grouped.csv généré avec succès à :", outputPath);

//   } catch (error) {
//     console.error("❌ Erreur lors de la génération :", error);
//   }
// }

// generateDataGrouped();









// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// const fs = require("fs");
// const { Sequelize } = require("sequelize");
// const sequelize = require("../config/database"); // ton fichier config
// const { CommandeClient, Client } = require("../models");

// async function generateDataGrouped() {
//     try {
//         await sequelize.authenticate();
//         console.log("✅ Connexion à la base réussie");

        

//         const commandes = await CommandeClient.findAll({
//             attributes: [
//                 [Sequelize.col("client.codeDepot"), "codeDepot"],
//                 "codeArticle",
//                 [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("dateCommande")), "mois"],
//                 [Sequelize.fn("SUM", Sequelize.col("quantiteDemandee")), "quantiteDemandee"]
//             ],
//             include: [{
//                 model: Client,
//                 as: "client", // ✅ OBLIGATOIRE car tu as défini un alias dans tes associations
//                 attributes: []
//             }],
//             group: ["client.codeDepot", "codeArticle", "mois"],
//             raw: true
//         });

//         if (commandes.length === 0) {
//             console.warn("⚠️ Aucune commande trouvée.");
//             return;
//         }

//         const csvContent = ["codeDepot,codeArticle,mois,quantiteDemandee"];
//         commandes.forEach((cmd) => {
//             const mois = new Date(cmd.mois).toISOString().split("T")[0];
//             csvContent.push(`${cmd.codeDepot},${cmd.codeArticle},${mois},${cmd.quantiteDemandee}`);
//         });

//         const outputPath = path.join(__dirname, "../../python_scripts/data_grouped.csv");
//         fs.writeFileSync(outputPath, csvContent.join("\n"));
//         console.log("✅ Fichier data_grouped.csv généré avec succès à :", outputPath);

//     } catch (error) {
//         console.error("❌ Erreur lors de la génération :", error);
//     } finally {
//         await sequelize.close();
//     }
// }

// generateDataGrouped();




const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const fs = require("fs");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const { ArticleCommandeClient, CommandeClient, Client } = require("../models");

async function generateDataGrouped() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base réussie");

    const commandes = await ArticleCommandeClient.findAll({
      attributes: [
        [Sequelize.col("commande.client.codeDepot"), "codeDepot"],
        "codeArticle",
        [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("commande.dateCommande")), "mois"],
        [Sequelize.fn("SUM", Sequelize.col("quantiteDemandee")), "quantiteDemandee"]
      ],
      include: [
        {
          model: CommandeClient,
          as: "commande", // alias défini dans associations
          attributes: [],
          include: [
            {
              model: Client,
              as: "client", // alias défini dans associations
              attributes: []
            }
          ]
        }
      ],
      group: ["commande.client.codeDepot", "codeArticle", "mois"],
      raw: true
    });

    if (commandes.length === 0) {
      console.warn("⚠️ Aucune commande trouvée.");
      return;
    }

    const csvContent = ["codeDepot,codeArticle,mois,quantiteDemandee"];
    commandes.forEach((cmd) => {
      const mois = new Date(cmd.mois).toISOString().split("T")[0];
      csvContent.push(`"${cmd.codeDepot}","${cmd.codeArticle}","${mois}","${cmd.quantiteDemandee}"`);
    });

    const outputPath = path.join(__dirname, "../../python_scripts/data_grouped.csv");
    fs.writeFileSync(outputPath, csvContent.join("\n"));
    console.log("✅ Fichier data_grouped.csv généré avec succès à :", outputPath);

  } catch (error) {
    console.error("❌ Erreur lors de la génération :", error);
  } finally {
    
  }
}



module.exports = generateDataGrouped;
