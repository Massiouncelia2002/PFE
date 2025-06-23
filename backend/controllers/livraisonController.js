const { Sequelize, Op } = require("sequelize");
const sequelize = require("../config/database");
const LivraisonPlanifiee = require("../models/LivraisonPlanifiee");
const Vehicule = require("../models/Vehicule");

exports.affecterVehicules = async (req, res) => {
  try {
    const { codePlanification, affectations } = req.body; // [{ matricule, quantiteTransportee, dateDepartPrevue, heureDepartPrevue }]

    if (!codePlanification || !Array.isArray(affectations) || affectations.length === 0) {
      return res.status(400).json({ message: "Paramètres manquants ou invalides." });
    }

    const livraisons = [];

    for (const aff of affectations) {
      const livraison = await LivraisonPlanifiee.create({
        codePlanification,
        matricule: aff.matricule,
        quantiteTransportee: aff.quantiteTransportee,
        dateDepartPrevue: aff.dateDepartPrevue,
        heureDepartPrevue: aff.heureDepartPrevue,
        dateRetourPrevue: aff.dateRetourPrevue || null,
        heureRetourPrevue: aff.heureRetourPrevue || null,
        statutLivraison: "prévue",
      });
      livraisons.push(livraison);
    }

    res.status(201).json({ message: "Véhicules affectés avec succès", livraisons });
  } catch (error) {
    console.error("Erreur lors de l'affectation des véhicules:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};





// exports.getVehiculesDisponiblesPourPlage = async (req, res) => {
//   const { dateHeureDepart, dateHeureRetour } = req.query;

//   try {
//     const tousVehicules = await Vehicule.findAll();

//     const livraisonsOccupees = await LivraisonPlanifiee.findAll({
//       where: {
//         [Op.or]: [
//           // Cas 1 : chevauchement début
//           Sequelize.literal(`("LivraisonPlanifiee"."dateDepartPrevue" + "LivraisonPlanifiee"."heureDepartPrevue")::timestamp BETWEEN '${dateHeureDepart}' AND '${dateHeureRetour}'`),
//           // Cas 2 : chevauchement fin
//           Sequelize.literal(`("LivraisonPlanifiee"."dateRetourPrevue" + "LivraisonPlanifiee"."heureRetourPrevue")::timestamp BETWEEN '${dateHeureDepart}' AND '${dateHeureRetour}'`),
//           // Cas 3 : englobe totalement la plage demandée
//           Sequelize.literal(`("LivraisonPlanifiee"."dateDepartPrevue" + "LivraisonPlanifiee"."heureDepartPrevue")::timestamp <= '${dateHeureDepart}' AND ("LivraisonPlanifiee"."dateRetourPrevue" + "LivraisonPlanifiee"."heureRetourPrevue")::timestamp >= '${dateHeureRetour}'`)
//         ]
//       }
//     });

//     const matriculesOccupes = livraisonsOccupees.map(l => l.matricule);

//     const vehiculesDisponibles = tousVehicules.filter(
//       v => !matriculesOccupes.includes(v.matricule)
//     );

//     res.json(vehiculesDisponibles);
//   } catch (err) {
//     console.error("Erreur vérification disponibilité :", err);
//     res.status(500).json({ message: "Erreur lors de la récupération des véhicules disponibles." });
//   }
// };




// exports.getVehiculesDisponiblesPourPlage = async (req, res) => {
//   const { dateHeureDepart, dateHeureRetour } = req.query;

//   try {
//     const tousVehicules = await Vehicule.findAll();

//     const livraisonsOccupees = await LivraisonPlanifiee.findAll({
//       where: {
//         [Op.or]: [
//           Sequelize.literal(`(dateDepartPrevue + heureDepartPrevue)::timestamp BETWEEN '${dateHeureDepart}' AND '${dateHeureRetour}'`),
//           Sequelize.literal(`(dateRetourPrevue + heureRetourPrevue)::timestamp BETWEEN '${dateHeureDepart}' AND '${dateHeureRetour}'`),
//           Sequelize.literal(`(dateDepartPrevue + heureDepartPrevue)::timestamp <= '${dateHeureDepart}' AND (dateRetourPrevue + heureRetourPrevue)::timestamp >= '${dateHeureRetour}'`)
//         ]
//       }
//     });

//     const matriculesOccupes = livraisonsOccupees.map(l => l.matricule);

//     const vehiculesDisponibles = tousVehicules.filter(
//       v => !matriculesOccupes.includes(v.matricule)
//     );

//     res.json(vehiculesDisponibles);
//   } catch (err) {
//     console.error("Erreur vérification disponibilité :", err);
//     res.status(500).json({ message: "Erreur lors de la récupération des véhicules disponibles." });
//   }
// };







exports.getVehiculesDisponiblesPourPlage = async (req, res) => {
  const { dateHeureDepart, dateHeureRetour } = req.query;

  try {
    const tousVehicules = await Vehicule.findAll();

    const livraisonsOccupees = await LivraisonPlanifiee.findAll({
      where: {
        [Op.or]: [
          Sequelize.literal(`("dateDepartPrevue" + "heureDepartPrevue")::timestamp BETWEEN '${dateHeureDepart}' AND '${dateHeureRetour}'`),
          Sequelize.literal(`("dateRetourPrevue" + "heureRetourPrevue")::timestamp BETWEEN '${dateHeureDepart}' AND '${dateHeureRetour}'`),
          Sequelize.literal(`("dateDepartPrevue" + "heureDepartPrevue")::timestamp <= '${dateHeureDepart}' AND ("dateRetourPrevue" + "heureRetourPrevue")::timestamp >= '${dateHeureRetour}'`)
        ]
      }
    });

    const matriculesOccupes = livraisonsOccupees.map(l => l.matricule);

    const vehiculesDisponibles = tousVehicules.filter(
      v => !matriculesOccupes.includes(v.matricule)
    );

    res.json(vehiculesDisponibles);
  } catch (err) {
    console.error("Erreur vérification disponibilité :", err);
    res.status(500).json({ message: "Erreur lors de la récupération des véhicules disponibles." });
  }
};
