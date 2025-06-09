// const UniteDeMesure = require("../models/UniteDeMesure");

// // Ajouter une unité de mesure
// exports.create = async (req, res) => {
//   try {
//     const { nom, type } = req.body;
//     if (!nom || !type) {
//       return res.status(400).json({ message: "Nom et type sont requis." });
//     }
//     const newUnite = await UniteDeMesure.create({ nom, type });
//     res.status(201).json(newUnite);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Lister toutes les unités de mesure

// exports.findAll = async (req, res) => {
//   try {
//     console.log("Tentative de récupération des unités..."); // Debug
//     const unites = await UniteDeMesure.findAll();
//     console.log("Unités trouvées:", unites); // Debug
//     res.status(200).json(unites);
//   } catch (error) {
//     console.error("Erreur complète:", error); // Log complet
//     res.status(500).json({ 
//       message: "Erreur serveur",
//       details: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// };


// // Supprimer une unité de mesure par id
// exports.delete = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deleted = await UniteDeMesure.destroy({ where: { id } });
//     if (deleted) {
//       res.status(200).json({ message: "Unité supprimée avec succès." });
//     } else {
//       res.status(404).json({ message: "Unité non trouvée." });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };











const UniteDeMesure = require("../models/UniteDeMesure");

// ✅ Ajouter une unité de mesure
exports.create = async (req, res) => {
  try {
    const { nom, abreviation, type } = req.body;

    // Validation
    if (!nom || !abreviation || !type) {
      return res.status(400).json({ message: "Nom, abréviation et type sont obligatoires." });
    }

    // Création
    const newUnite = await UniteDeMesure.create({ nom, abreviation, type });
    return res.status(201).json(newUnite);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", details: error.message });
  }
};

// ✅ Récupérer toutes les unités de mesure
exports.findAll = async (req, res) => {
  try {
    const unites = await UniteDeMesure.findAll();
    return res.status(200).json(unites);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
      details: error.message
    });
  }
};

// ✅ Supprimer une unité de mesure par ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await UniteDeMesure.destroy({ where: { id } });

    if (deleted) {
      return res.status(200).json({ message: "Unité supprimée avec succès." });
    } else {
      return res.status(404).json({ message: "Unité non trouvée." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", details: error.message });
  }
};
