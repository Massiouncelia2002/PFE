// const { CommandePlanifie, CommandeVehicule } = require("../models");
// const { v4: uuidv4 } = require("uuid");

// exports.planifierCommande = async (req, res) => {
//   try {
//     const { codeCommande, datePlanification, vehicules } = req.body;

//     const codePlanification = "PLN-" + uuidv4().slice(0, 8); // Exemple de génération de code

//     // 1. Créer la planification
//     const planification = await CommandePlanifie.create({
//       codePlanification,
//       datePlanification,
//       codeCommande
//     });

//     // 2. Affecter les véhicules avec quantités
//     for (const v of vehicules) {
//       await CommandeVehicule.create({
//         codePlanification,
//         matricule: v.matricule,
//         quantiteTransporte: v.quantiteTransporte
//       });
//     }

//     res.status(201).json({ message: "Commande planifiée avec succès", planification });
//   } catch (error) {
//     console.error("Erreur planification :", error);
//     res.status(500).json({ error: "Erreur lors de la planification" });
//   }
// };










const { CommandePlanifie, CommandeVehicule } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.planifierCommande = async (req, res) => {
  try {
    const { codeCommande, vehicules } = req.body;  
    const datePlanification = new Date();          

    const codePlanification = "PLN-" + uuidv4().slice(0, 8);

    // Créer la planification
    const planification = await CommandePlanifie.create({
      codePlanification,
      datePlanification,
      codeCommande
    });

    // Affecter les véhicules avec quantités
    for (const v of vehicules) {
      await CommandeVehicule.create({
        codePlanification,
        matricule: v.matricule,
        quantiteTransporte: v.quantiteTransporte
      });
    }

    res.status(201).json({ message: "Commande planifiée avec succès", planification });
  } catch (error) {
    console.error("Erreur planification :", error);
    res.status(500).json({ error: "Erreur lors de la planification" });
  }
};
