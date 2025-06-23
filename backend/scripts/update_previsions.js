// const { exec } = require("child_process");
// const path = require("path");
// const generateDataGrouped = require("./generateDataGrouped");

// async function updatePrevisions() {
//   console.log("🔄 Génération de data_grouped.csv...");
//   await generateDataGrouped();

//   console.log("🚀 Exécution du script Python pour mettre à jour previsions.csv...");

//   const pythonScriptPath = path.join(__dirname, "../../python_scripts/predict_sarima.py");

//   exec(`python "${pythonScriptPath}"`, (error, stdout, stderr) => {
//     if (error) {
//       console.error("❌ Erreur Python :", error.message);
//       return;
//     }
//     if (stderr) {
//       console.error("⚠️ Avertissement Python :", stderr);
//     }
//     console.log("✅ Résultat du script Python :\n", stdout);
//   });
// }

// updatePrevisions();









// const { exec } = require("child_process");
// const path = require("path");
// const generateDataGrouped = require("./generateDataGrouped");
// const sequelize = require("../config/database");
// const { AffectationDepot } = require("../models");

// async function updatePrevisions() {
//   try {
//     console.log("🔄 Génération de data_grouped.csv...");
//     await generateDataGrouped();

//     console.log("🔍 Récupération des dépôts depuis la base de données...");
//     await sequelize.authenticate();

//     // ✅ Obtenir tous les codes de dépôt distincts
//     const affectations = await AffectationDepot.findAll({
//       attributes: ["codeDepot"],
//       raw: true,
//     });

//     const codesDepot = [...new Set(affectations.map(dep => dep.codeDepot))]; // remove duplicates

//     if (codesDepot.length === 0) {
//       console.warn("⚠️ Aucun dépôt trouvé.");
//       return;
//     }

//     console.log("✅ Dépôts récupérés :", codesDepot);

//     const pythonScriptPath = path.join(__dirname, "../../python_scripts/predict_sarima.py");
//     const args = codesDepot.join(",");

//     console.log("🚀 Lancement du script Python avec :", args);
//     exec(`python "${pythonScriptPath}" ${args}`, (error, stdout, stderr) => {
//       if (error) {
//         console.error("❌ Erreur Python :", error.message);
//         return;
//       }
//       if (stderr) {
//         console.error("⚠️ Avertissement Python :", stderr);
//       }
//       console.log("✅ Résultat du script Python :\n", stdout);
//     });

//   } catch (err) {
//     console.error("❌ Erreur globale :", err);
//   } finally {
//     await sequelize.close();
//   }
// }

// // updatePrevisions();
// module.exports = generateDataGrouped;










const { exec } = require("child_process");
const path = require("path");
const generateDataGrouped = require("./generateDataGrouped");
const { AffectationDepot } = require("../models");

async function updatePrevisions() {
  try {
    console.log("🔄 Génération de data_grouped.csv...");
    await generateDataGrouped();

    console.log("📦 Récupération des codes dépôt de tous les utilisateurs...");
    const affectations = await AffectationDepot.findAll();
    const codesDepot = [...new Set(affectations.map(a => a.codeDepot))]; // dépôts uniques

    if (codesDepot.length === 0) {
      console.warn("❌ Aucun dépôt trouvé pour générer les prévisions.");
      return;
    }

    const depotArg = codesDepot.join(",");
    const pythonScriptPath = path.join(__dirname, "../../python_scripts/predict_sarima.py");

    console.log("🚀 Exécution du script Python avec codes dépôt :", depotArg);

    exec(`python "${pythonScriptPath}" ${depotArg}`, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Erreur Python :", error.message);
        return;
      }
      if (stderr) {
        console.error("⚠️ Avertissement Python :", stderr);
      }
      console.log("✅ Résultat du script Python :\n", stdout);
    });
  } catch (err) {
    console.error("❌ Erreur globale :", err);
  }
}

updatePrevisions();
