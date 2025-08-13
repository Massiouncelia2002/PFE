// const Vehicule = require("../models/Vehicule");
// const xlsx = require("xlsx");

// exports.createVehicule = async (req, res) => {
//     try {
//         const { matricule, typeVehicule, capaciteVehicule, statut } = req.body;

//         const vehicule = await Vehicule.create({
//             matricule,
//             typeVehicule,
//             capaciteVehicule,
//             statut
//         });

//         res.status(201).json(vehicule);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };




// exports.getVehicules = async (req, res) => {
//     try {
//         const vehicules = await Vehicule.findAll()
//             res.status(200).json(vehicules);
//         } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// exports.getVehiculeById = async (req, res) => {
//     try {
//         const { idVehicule } = req.params;

//         const vehicule = await Vehicule.findByPk(idVehicule, {
//             attributes: ['idVehicule', 'matricule', 'typeVehicule', 'capaciteVehicule', 'statut'],
//         });

//         if (!vehicule) {
//             return res.status(404).json({ message: "Vehicule non trouvé" });
//         }

//         res.status(200).json(vehicule);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// //  Modifier 
// exports.updateVehicule = async (req, res) => {
//     try {
//         const { idVehicule } = req.params;
//         const { matricule, typeVehicule, capaciteVehicule, statut } = req.body;

//         const vehicule = await Vehicule.findByPk(idVehicule);
//         if (!vehicule) {
//             return res.status(404).json({ message: "Vehicule non trouvé" });
//         }

//         vehicule.matricule = matricule;
//         vehicule.typeVehicule = typeVehicule;
//         vehicule.capaciteVehicule = capaciteVehicule;
//         vehicule.statut = statut;


//         await vehicule.save();
//         res.status(200).json(vehicule);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Supprimer
// exports.deleteVehicule = async (req, res) => {
//     try {
//         const { idVehicule } = req.params;

//         const vehicule = await Vehicule.findByPk(idVehicule);
//         if (!vehicule) {
//             return res.status(404).json({ message: "Vehicule non trouvé" });
//         }

//         await vehicule.destroy();
//         res.status(200).json({ message: "Vehicule supprimé avec succès" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// //  Importer  via Excel
// exports.importVehiculesFromExcel = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Aucun fichier envoyé" });
//         }

//         const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         const vehicules = data.map(row => ({
//             matricule: row.matricule,
//             typeVehicule: row.typeVehicule,
//             capaciteVehicule: row.capaciteVehicule,
//             statut: row.statut,
//         }));

//         await Vehicule.bulkCreate(vehicules, { validate: true });

//         res.status(201).json({ message: "Importation réussie", total: vehicules.length });
//     } catch (error) {
//         console.error("Erreur import Excel:", error);
//         res.status(500).json({ error: error.message });
//     }
// };























// ✅ Créer un véhicule
// exports.createVehicule = async (req, res) => {
//     try {
//         const { matricule, typeVehicule, capaciteVehicule, statut } = req.body;

//         const vehicule = await Vehicule.create({
//             matricule,
//             typeVehicule,
//             capaciteVehicule,
//             statut
//         });

//         res.status(201).json(vehicule);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };




// ✅ Modifier un véhicule
// exports.updateVehicule = async (req, res) => {
//     try {
//         const { matricule } = req.params;
//         const { typeVehicule, capaciteVehicule, statut } = req.body;

//         const vehicule = await Vehicule.findByPk(matricule);
//         if (!vehicule) {
//             return res.status(404).json({ message: "Véhicule non trouvé" });
//         }

//         vehicule.typeVehicule = typeVehicule;
//         vehicule.capaciteVehicule = capaciteVehicule;
//         vehicule.statut = statut;

//         await vehicule.save();
//         res.status(200).json(vehicule);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };







// exports.createVehicule = async (req, res) => {
//     try {
//         const { matricule, typeVehicule, capaciteVehicule, statut } = req.body;

//         // Vérification des erreurs
//         const errors = {};

//         if (!matricule) {
//             errors.matricule = "Le matricule est requis.";
//         }

//         if (!typeVehicule) {
//             errors.typeVehicule = "Le type de véhicule est requis.";
//         }

//         if (!capaciteVehicule || capaciteVehicule <= 0) {
//             errors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
//         }

//         if (!statut) {
//             errors.statut = "Le statut est requis.";
//         }

//         if (Object.keys(errors).length > 0) {
//             return res.status(400).json({ errors });
//         }

//         // Création du véhicule si aucune erreur
//         const vehicule = await Vehicule.create({
//             matricule,
//             typeVehicule,
//             capaciteVehicule,
//             statut
//         });

//         res.status(201).json(vehicule);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };






// exports.updateVehicule = async (req, res) => {
//     try {
//         const { matricule } = req.params;
//         const { typeVehicule, capaciteVehicule, statut } = req.body;

//         const vehicule = await Vehicule.findByPk(matricule);
//         if (!vehicule) {
//             return res.status(404).json({ message: "Véhicule non trouvé" });
//         }

//         // Vérification des erreurs
//         const errors = {};

//         if (!typeVehicule) {
//             errors.typeVehicule = "Le type de véhicule est requis.";
//         }

//         if (!capaciteVehicule || capaciteVehicule <= 0) {
//             errors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
//         }

//         if (!statut) {
//             errors.statut = "Le statut est requis.";
//         }

//         if (Object.keys(errors).length > 0) {
//             return res.status(400).json({ errors });
//         }

//         // Mise à jour du véhicule
//         vehicule.typeVehicule = typeVehicule;
//         vehicule.capaciteVehicule = capaciteVehicule;
//         vehicule.statut = statut;

//         await vehicule.save();
//         res.status(200).json(vehicule);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };







// const Vehicule = require("../models/Vehicule");
// const xlsx = require("xlsx");



// exports.createVehicule = async (req, res) => {
//     try {
//         const { matricule,  capaciteVehicule, statut } = req.body;

//         // Vérification des erreurs
//         const errors = {};

//         if (!matricule) {
//             errors.matricule = "Le matricule est requis.";
//         } else {
//             // Vérifier si le matricule existe déjà dans la base de données
//             const existingVehicule = await Vehicule.findOne({ where: { matricule } });
//             // if (existingVehicule) {
//             //     errors.matricule = "Le matricule existe déjà.";
//             // }
//             if (existingVehicule) {
//                 return res.status(400).json({
//                     message: "Le matricule existe déjà.",
//                     error: "matricule"
//                 });
//             }
//         }

//         // if (!typeVehicule) {
//         //     errors.typeVehicule = "Le type de véhicule est requis.";
//         // }

//         if (!capaciteVehicule || capaciteVehicule <= 0) {
//             errors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
//         }

//         if (!statut) {
//             errors.statut = "Le statut est requis.";
//         }

//         if (Object.keys(errors).length > 0) {
//             return res.status(400).json({ errors });
//         }

//         // Création du véhicule si aucune erreur
//         const vehicule = await Vehicule.create({
//             matricule,
//             // typeVehicule,
//             capaciteVehicule,
//             statut
//         });

//         // Vérifier si le véhicule a bien été créé
//         const createdVehicule = await Vehicule.findByPk(vehicule.matricule);
//         if (createdVehicule) {
//             res.status(201).json({
//                 message: "Véhicule ajouté avec succès.",
//                 vehicule: createdVehicule
//             });
//         } else {
//             res.status(400).json({
//                 message: "Erreur : Le véhicule n'a pas été ajouté à la base de données."
//             });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };




// // ✅ Obtenir tous les véhicules
// exports.getVehicules = async (req, res) => {
//     try {
//         const vehicules = await Vehicule.findAll();
//         res.status(200).json(vehicules);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ✅ Obtenir un véhicule par matricule
// exports.getVehiculeByMatricule = async (req, res) => {
//     try {
//         const { matricule } = req.params;

//         const vehicule = await Vehicule.findByPk(matricule, {
//             attributes: ['matricule', 'capaciteVehicule', 'statut'],
//         });

//         if (!vehicule) {
//             return res.status(404).json({ message: "Véhicule non trouvé" });
//         }

//         res.status(200).json(vehicule);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };








// exports.updateVehicule = async (req, res) => {
//     try {
//         const { matricule } = req.params;
//         const { capaciteVehicule, statut } = req.body;

//         const vehicule = await Vehicule.findByPk(matricule);
//         if (!vehicule) {
//             return res.status(404).json({ message: "Véhicule non trouvé" });
//         }

//         // Vérification des erreurs
//         const errors = {};

//         // if (!typeVehicule) {
//         //     errors.typeVehicule = "Le type de véhicule est requis.";
//         // }

//         if (!capaciteVehicule || capaciteVehicule <= 0) {
//             errors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
//         }

//         if (!statut) {
//             errors.statut = "Le statut est requis.";
//         }

//         if (Object.keys(errors).length > 0) {
//             return res.status(400).json({ errors });
//         }

//         // Mise à jour du véhicule
//         // vehicule.typeVehicule = typeVehicule;
//         vehicule.capaciteVehicule = capaciteVehicule;
//         vehicule.statut = statut;

//         await vehicule.save();

//         // Vérification si la mise à jour a bien eu lieu
//         const updatedVehicule = await Vehicule.findByPk(matricule);
//         if (updatedVehicule) {
//             res.status(200).json({
//                 message: "Véhicule modifié avec succès.",
//                 vehicule: updatedVehicule
//             });
//         } else {
//             res.status(400).json({ message: "Erreur : Le véhicule n'a pas pu être modifié." });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };







// // ✅ Supprimer un véhicule
// exports.deleteVehicule = async (req, res) => {
//     try {
//         const { matricule } = req.params;

//         const vehicule = await Vehicule.findByPk(matricule);
//         if (!vehicule) {
//             return res.status(404).json({ message: "Véhicule non trouvé" });
//         }

//         await vehicule.destroy();
//         res.status(200).json({ message: "Véhicule supprimé avec succès" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ✅ Importer via Excel
// exports.importVehiculesFromExcel = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Aucun fichier envoyé" });
//         }

//         const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         const vehicules = data.map(row => ({
//             matricule: row.matricule,
//             // typeVehicule: row.typeVehicule,
//             capaciteVehicule: row.capaciteVehicule,
//             statut: row.statut,
//         }));

//         await Vehicule.bulkCreate(vehicules, { validate: true });

//         res.status(201).json({ message: "Importation réussie", total: vehicules.length });
//     } catch (error) {
//         console.error("Erreur import Excel:", error);
//         res.status(500).json({ error: error.message });
//     }
// };











// const Vehicule = require("../models/Vehicule");
// const xlsx = require("xlsx");

// // Liste des statuts valides (doit correspondre à ceux définis dans le modèle)
// const STATUTS_VALIDES = ['disponible', 'en_mission', 'en_panne', 'en_maintenance'];

// // ✅ Créer un véhicule
// exports.createVehicule = async (req, res) => {
//     try {
//         const { matricule, capaciteVehicule, statut } = req.body;
//         const errors = {};

//         if (!matricule) {
//             errors.matricule = "Le matricule est requis.";
//         } else {
//             const existingVehicule = await Vehicule.findOne({ where: { matricule } });
//             if (existingVehicule) {
//                 return res.status(400).json({
//                     message: "Le matricule existe déjà.",
//                     error: "matricule"
//                 });
//             }
//         }

//         if (!capaciteVehicule || capaciteVehicule <= 0) {
//             errors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
//         }

//         if (!statut || !STATUTS_VALIDES.includes(statut)) {
//             errors.statut = `Le statut est requis et doit être parmi : ${STATUTS_VALIDES.join(", ")}.`;
//         }

//         if (Object.keys(errors).length > 0) {
//             return res.status(400).json({ errors });
//         }

//         const vehicule = await Vehicule.create({ matricule, capaciteVehicule, statut });

//         res.status(201).json({
//             message: "Véhicule ajouté avec succès.",
//             vehicule
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ✅ Obtenir tous les véhicules
// exports.getVehicules = async (req, res) => {
//     try {
//         const vehicules = await Vehicule.findAll();
//         res.status(200).json(vehicules);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ✅ Obtenir un véhicule par matricule
// exports.getVehiculeByMatricule = async (req, res) => {
//     try {
//         const { matricule } = req.params;
//         const vehicule = await Vehicule.findByPk(matricule);

//         if (!vehicule) {
//             return res.status(404).json({ message: "Véhicule non trouvé" });
//         }

//         res.status(200).json(vehicule);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ✅ Mettre à jour un véhicule
// exports.updateVehicule = async (req, res) => {
//     try {
//         const { matricule } = req.params;
//         const { capaciteVehicule, statut } = req.body;
//         const vehicule = await Vehicule.findByPk(matricule);

//         if (!vehicule) {
//             return res.status(404).json({ message: "Véhicule non trouvé" });
//         }

//         const errors = {};
//         if (!capaciteVehicule || capaciteVehicule <= 0) {
//             errors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
//         }

//         if (!statut || !STATUTS_VALIDES.includes(statut)) {
//             errors.statut = `Le statut doit être parmi : ${STATUTS_VALIDES.join(", ")}.`;
//         }

//         if (Object.keys(errors).length > 0) {
//             return res.status(400).json({ errors });
//         }

//         vehicule.capaciteVehicule = capaciteVehicule;
//         vehicule.statut = statut;

//         await vehicule.save();

//         res.status(200).json({
//             message: "Véhicule modifié avec succès.",
//             vehicule
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ✅ Supprimer un véhicule
// exports.deleteVehicule = async (req, res) => {
//     try {
//         const { matricule } = req.params;
//         const vehicule = await Vehicule.findByPk(matricule);

//         if (!vehicule) {
//             return res.status(404).json({ message: "Véhicule non trouvé" });
//         }

//         await vehicule.destroy();
//         res.status(200).json({ message: "Véhicule supprimé avec succès" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ✅ Importer des véhicules via un fichier Excel
// exports.importVehiculesFromExcel = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Aucun fichier envoyé" });
//         }

//         const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         const vehicules = [];

//         for (const row of data) {
//             const statut = row.statut || 'disponible';
//             if (!STATUTS_VALIDES.includes(statut)) {
//                 return res.status(400).json({
//                     message: `Statut invalide trouvé dans le fichier Excel : ${statut}`,
//                 });
//             }

//             vehicules.push({
//                 matricule: row.matricule,
//                 capaciteVehicule: row.capaciteVehicule,
//                 statut,
//             });
//         }

//         await Vehicule.bulkCreate(vehicules, { validate: true });

//         res.status(201).json({ message: "Importation réussie", total: vehicules.length });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };




const { sequelize } = require("../models");
const Vehicule = require("../models/Vehicule");

const Depot = require('../models/Depot');
const xlsx = require("xlsx");




// Liste des statuts valides
// const STATUTS_VALIDES = ['disponible', 'non-disponible'];

// // ✅ Créer un véhicule
// exports.createVehicule = async (req, res) => {
//     try {
//         const { matricule, capaciteVehicule, statut } = req.body;
//         const errors = {};

//         if (!matricule) {
//             errors.matricule = "Le matricule est requis.";
//         } else {
//             const existingVehicule = await Vehicule.findOne({ where: { matricule } });
//             if (existingVehicule) {
//                 return res.status(400).json({
//                     message: "Le matricule existe déjà.",
//                     error: "matricule"
//                 });
//             }
//         }

//         if (!capaciteVehicule || capaciteVehicule <= 0) {
//             errors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
//         }

//         // Statut par défaut à 'disponible' si non fourni
//         const finalStatut = statut || 'disponible';

//         if (!STATUTS_VALIDES.includes(finalStatut)) {
//             errors.statut = `Le statut doit être parmi : ${STATUTS_VALIDES.join(", ")}.`;
//         }

//         if (Object.keys(errors).length > 0) {
//             return res.status(400).json({ errors });
//         }

//         const vehicule = await Vehicule.create({ matricule, capaciteVehicule, statut: finalStatut });

//         res.status(201).json({
//             message: "Véhicule ajouté avec succès.",
//             vehicule
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// ✅ Créer un véhicule
exports.createVehicule = async (req, res) => {
    try {
        const { matricule, capaciteVehicule, statut, codeDepot } = req.body;
        const errors = {};
        const STATUTS_VALIDES = ["disponible", "non_disponible"];

        // 🔍 Validation du matricule
        if (!matricule) {
            errors.matricule = "Le matricule est requis.";
        } else {
            const matriculeStr = matricule.toString();

            if (!/^\d{9,11}$/.test(matriculeStr)) {
                errors.matricule = "Le matricule doit contenir entre 9 et 11 chiffres.";
            } else {
                const wilayaCode = parseInt(matriculeStr.slice(-2));
                const yearCode = parseInt(matriculeStr.slice(-4, -2));
                const fifthLastDigit = parseInt(matriculeStr.slice(-5, -4));
                const currentYear = new Date().getFullYear() % 100;

                if (wilayaCode > 48 || wilayaCode === 0) {
                    errors.matricule = "Le code wilaya (les deux derniers chiffres) doit être entre 01 et 48.";
                }

                if (yearCode > currentYear) {
                    errors.matricule = `L'année (avant le code wilaya) ne peut pas dépasser ${currentYear}.`;
                }

                if (fifthLastDigit < 1 || fifthLastDigit > 5) {
                    errors.matricule = "Le chiffre précédant l'année doit être entre 1 et 5.";
                }

                const existingVehicule = await Vehicule.findOne({ where: { matricule } });
                if (existingVehicule) {
                    errors.matricule = "Le matricule existe déjà.";
                }
            }
        }

        // 🔍 Validation de la capacité
        if (!capaciteVehicule || capaciteVehicule <= 0) {
            errors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
        }

        // 🔍 Validation du statut
        const finalStatut = statut || "disponible";
        if (!STATUTS_VALIDES.includes(finalStatut)) {
            errors.statut = `Le statut doit être parmi : ${STATUTS_VALIDES.join(", ")}.`;
        }

        // 🔍 Validation du dépôt
        if (!codeDepot) {
            errors.codeDepot = "Le dépôt est requis.";
        } else {
            const depotExists = await Depot.findOne({ where: { codeDepot } });
            if (!depotExists) {
                errors.codeDepot = "Le dépôt spécifié n'existe pas.";
            }
        }

        // 🔴 Retour si erreurs
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        // ✅ Création du véhicule
        const vehicule = await Vehicule.create({ 
            matricule, 
            capaciteVehicule, 
            statut: finalStatut,
            codeDepot
        });

        return res.status(201).json({
            message: "Véhicule ajouté avec succès.",
            vehicule
        });

    } catch (error) {
        console.error("Erreur serveur :", error);
        return res.status(500).json({ error: error.message });
    }
};




// ✅ Obtenir tous les véhicules
exports.getVehicules = async (req, res) => {
    try {
        const vehicules = await Vehicule.findAll();
        res.status(200).json(vehicules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Obtenir un véhicule par matricule
exports.getVehiculeByMatricule = async (req, res) => {
    try {
        const { matricule } = req.params;
        const vehicule = await Vehicule.findByPk(matricule);

        if (!vehicule) {
            return res.status(404).json({ message: "Véhicule non trouvé" });
        }

        res.status(200).json(vehicule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // ✅ Mettre à jour un véhicule
// exports.updateVehicule = async (req, res) => {
//     try {
//         const { matricule } = req.params;
//         const { capaciteVehicule, statut } = req.body;
//         const vehicule = await Vehicule.findByPk(matricule);

//         if (!vehicule) {
//             return res.status(404).json({ message: "Véhicule non trouvé" });
//         }

//         const errors = {};
//         if (!capaciteVehicule || capaciteVehicule <= 0) {
//             errors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
//         }

//         if (!statut || !STATUTS_VALIDES.includes(statut)) {
//             errors.statut = `Le statut doit être parmi : ${STATUTS_VALIDES.join(", ")}.`;
//         }

//         if (Object.keys(errors).length > 0) {
//             return res.status(400).json({ errors });
//         }

//         vehicule.capaciteVehicule = capaciteVehicule;
//         vehicule.statut = statut;

//         await vehicule.save();

//         res.status(200).json({
//             message: "Véhicule modifié avec succès.",
//             vehicule
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// ✅ Mettre à jour un véhicule
exports.updateVehicule = async (req, res) => {
  try {
    const { matricule } = req.params;
    const { capaciteVehicule, statut, codeDepot } = req.body;
    const errors = {};

    const STATUTS_VALIDES = ["disponible", "non_disponible"];

    const vehicule = await Vehicule.findByPk(matricule);
    if (!vehicule) {
      return res.status(404).json({ message: "Véhicule non trouvé" });
    }

    if (!capaciteVehicule || capaciteVehicule <= 0) {
      errors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
    }

    if (!statut || !STATUTS_VALIDES.includes(statut)) {
      errors.statut = `Le statut doit être parmi : ${STATUTS_VALIDES.join(", ")}.`;
    }

    if (!codeDepot) {
      errors.codeDepot = "Le dépôt est requis.";
    } else {
      const depotExists = await Depot.findOne({ where: { codeDepot } });
      if (!depotExists) {
        errors.codeDepot = "Le dépôt spécifié n'existe pas.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    vehicule.capaciteVehicule = capaciteVehicule;
    vehicule.statut = statut;
    vehicule.codeDepot = codeDepot;

    await vehicule.save();

    res.status(200).json({
      message: "Véhicule modifié avec succès.",
      vehicule
    });
  } catch (error) {
    console.error("Erreur update :", error);
    res.status(500).json({ error: error.message });
  }
};






// ✅ Supprimer un véhicule
exports.deleteVehicule = async (req, res) => {
    try {
        const { matricule } = req.params;
        const vehicule = await Vehicule.findByPk(matricule);

        if (!vehicule) {
            return res.status(404).json({ message: "Véhicule non trouvé" });
        }

        await vehicule.destroy();
        res.status(200).json({ message: "Véhicule supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // ✅ Importer des véhicules via un fichier Excel
// exports.importVehiculesFromExcel = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Aucun fichier envoyé" });
//         }

//         const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         const vehicules = [];

//         for (const row of data) {
//             const statut = row.statut || 'disponible';
//             if (!STATUTS_VALIDES.includes(statut)) {
//                 return res.status(400).json({
//                     message: `Statut invalide trouvé dans le fichier Excel : ${statut}`,
//                 });
//             }

//             vehicules.push({
//                 matricule: row.matricule,
//                 capaciteVehicule: row.capaciteVehicule,
//                 statut,
//             });
//         }

//         await Vehicule.bulkCreate(vehicules, { validate: true });

//         res.status(201).json({ message: "Importation réussie", total: vehicules.length });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



// // ✅ Importer des véhicules via un fichier Excel
// exports.importVehiculesFromExcel = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "Aucun fichier envoyé" });
//         }

//         const STATUTS_VALIDES = ["disponible", "non_disponible"];
//         const currentYear = new Date().getFullYear() % 100;

//         const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = xlsx.utils.sheet_to_json(sheet);

//         console.log("Lignes Excel chargées :", data);

//         const vehicules = [];
//         const erreurs = [];

//         // Vérifier d'abord que le modèle Depot est disponible
//         if (!Depot) {
//             return res.status(500).json({ error: "Modèle Depot non disponible" });
//         }

//         for (const [index, row] of data.entries()) {
//             const ligne = index + 2;
//             const rowErrors = [];
            
//             // Récupération des valeurs avec des valeurs par défaut
//             const matricule = row.matricule?.toString().trim() || '';
//             const capaciteVehicule = Number(row.capaciteVehicule) || 0;
//             const statut = (row.statut || 'disponible').toLowerCase();
//             const codeDepot = row.codeDepot?.toString().trim() || '';

//             // Validation du matricule
//             if (!matricule) {
//                 rowErrors.push("matricule est requis");
//             } else if (!/^\d{9,11}$/.test(matricule)) {
//                 rowErrors.push("matricule doit contenir 9 à 11 chiffres");
//             } else {
//                 const wilayaCode = parseInt(matricule.slice(-2));
//                 const yearCode = parseInt(matricule.slice(-4, -2));
//                 const fifthLastDigit = parseInt(matricule.slice(-5, -4));

//                 if (wilayaCode > 48 || wilayaCode === 0) {
//                     rowErrors.push(`code wilaya invalide (${wilayaCode})`);
//                 }
//                 if (yearCode > currentYear) {
//                     rowErrors.push(`année invalide (${yearCode})`);
//                 }
//                 if (fifthLastDigit < 1 || fifthLastDigit > 5) {
//                     rowErrors.push(`chiffre précédant l'année invalide (${fifthLastDigit})`);
//                 }
//             }

//             // Validation capacité
//             if (!capaciteVehicule || capaciteVehicule <= 0) {
//                 rowErrors.push("capacité doit être un nombre positif");
//             }

//             // Validation statut
//             if (!STATUTS_VALIDES.includes(statut)) {
//                 rowErrors.push(`statut invalide (doit être parmi: ${STATUTS_VALIDES.join(", ")})`);
//             }

//             // Validation dépôt
//             if (!codeDepot) {
//                 rowErrors.push("dépôt est requis");
//             }

//             // Si erreurs pour cette ligne, les ajouter et passer à la suivante
//             if (rowErrors.length > 0) {
//                 erreurs.push({
//                     ligne,
//                     erreurs: rowErrors,
//                     valeurs: { matricule, capaciteVehicule, statut, codeDepot }
//                 });
//                 continue;
//             }

//             // Vérifier l'existence du dépôt
//             try {
//                 const depotExists = await Depot.findOne({ where: { codeDepot } });
//                 if (!depotExists) {
//                     erreurs.push({
//                         ligne,
//                         erreurs: [`dépôt ${codeDepot} n'existe pas`],
//                         valeurs: { matricule, capaciteVehicule, statut, codeDepot }
//                     });
//                     continue;
//                 }
//             } catch (err) {
//                 console.error("Erreur vérification dépôt:", err);
//                 erreurs.push({
//                     ligne,
//                     erreurs: ["erreur vérification dépôt"],
//                     valeurs: { matricule, capaciteVehicule, statut, codeDepot }
//                 });
//                 continue;
//             }

//             // Vérifier si le matricule existe déjà
//             try {
//                 const vehiculeExists = await Vehicule.findOne({ where: { matricule } });
//                 if (vehiculeExists) {
//                     erreurs.push({
//                         ligne,
//                         erreurs: ["matricule existe déjà"],
//                         valeurs: { matricule, capaciteVehicule, statut, codeDepot }
//                     });
//                     continue;
//                 }
//             } catch (err) {
//                 console.error("Erreur vérification matricule:", err);
//                 erreurs.push({
//                     ligne,
//                     erreurs: ["erreur vérification matricule"],
//                     valeurs: { matricule, capaciteVehicule, statut, codeDepot }
//                 });
//                 continue;
//             }

//             // Si tout est valide, ajouter aux véhicules à créer
//             vehicules.push({
//                 matricule,
//                 capaciteVehicule,
//                 statut,
//                 codeDepot
//             });
//         }

//         if (erreurs.length > 0) {
//             return res.status(400).json({ 
//                 message: `${erreurs.length} erreur(s) dans le fichier Excel`, 
//                 details: erreurs,
//                 totalLignes: data.length,
//                 lignesValides: vehicules.length
//             });
//         }

//         // Créer les véhicules en une seule transaction
//         const result = await sequelize.transaction(async (t) => {
//             return await Vehicule.bulkCreate(vehicules, { 
//                 validate: true,
//                 transaction: t,
//                 individualHooks: true
//             });
//         });

//         return res.status(201).json({ 
//             message: "Importation réussie", 
//             total: vehicules.length,
//             details: vehicules
//         });

//     } catch (error) {
//         console.error("Erreur d'importation :", error);
//         return res.status(500).json({ 
//             error: "Erreur lors de l'importation",
//             details: error.message 
//         });
//     }
// };



exports.importVehiculesFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier envoyé" });
    }

    const xlsx = require("xlsx");
    const STATUTS_VALIDES = ["disponible", "non-disponible"];
    const currentYear = new Date().getFullYear() % 100;

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const vehicules = [];
    const erreurs = [];

    if (!Depot) {
      return res.status(500).json({ error: "Modèle Depot non disponible" });
    }

    for (const [index, row] of data.entries()) {
      const ligne = index + 2;
      const rowErrors = [];

      const matricule = row.matricule?.toString().trim() || '';
      const capaciteVehicule = Number(row.capaciteVehicule) || 0;
      const statut = (row.statut || 'disponible').toLowerCase();
      const codeDepot = row.codeDepot?.toString().trim() || '';

      // Validation matricule
      if (!matricule) {
        rowErrors.push("matricule est requis");
      } else if (!/^\d{9,11}$/.test(matricule)) {
        rowErrors.push("matricule doit contenir 9 à 11 chiffres");
      } else {
        const wilayaCode = parseInt(matricule.slice(-2));
        const yearCode = parseInt(matricule.slice(-4, -2));
        const fifthLastDigit = parseInt(matricule.slice(-5, -4));

        if (wilayaCode > 48 || wilayaCode === 0) {
          rowErrors.push(`code wilaya invalide (${wilayaCode})`);
        }
        if (yearCode > currentYear) {
          rowErrors.push(`année invalide (${yearCode})`);
        }
        if (fifthLastDigit < 1 || fifthLastDigit > 5) {
          rowErrors.push(`chiffre précédant l'année invalide (${fifthLastDigit})`);
        }
      }

      if (!capaciteVehicule || capaciteVehicule <= 0) {
        rowErrors.push("capacité doit être un nombre positif");
      }

      if (!STATUTS_VALIDES.includes(statut)) {
        rowErrors.push(`statut invalide (doit être parmi: ${STATUTS_VALIDES.join(", ")})`);
      }

      if (!codeDepot) {
        rowErrors.push("dépôt est requis");
      }

      if (rowErrors.length > 0) {
        erreurs.push({ ligne, erreurs: rowErrors, valeurs: { matricule, capaciteVehicule, statut, codeDepot } });
        continue;
      }

      try {
        const depotExists = await Depot.findOne({ where: { codeDepot } });
        if (!depotExists) {
          erreurs.push({ ligne, erreurs: [`dépôt ${codeDepot} n'existe pas`], valeurs: { matricule, capaciteVehicule, statut, codeDepot } });
          continue;
        }
      } catch (err) {
        erreurs.push({ ligne, erreurs: ["erreur vérification dépôt"], valeurs: { matricule, capaciteVehicule, statut, codeDepot } });
        continue;
      }

      try {
        const vehiculeExists = await Vehicule.findOne({ where: { matricule } });
        if (vehiculeExists) {
          erreurs.push({ ligne, erreurs: ["matricule existe déjà"], valeurs: { matricule, capaciteVehicule, statut, codeDepot } });
          continue;
        }
      } catch (err) {
        erreurs.push({ ligne, erreurs: ["erreur vérification matricule"], valeurs: { matricule, capaciteVehicule, statut, codeDepot } });
        continue;
      }

      vehicules.push({ matricule, capaciteVehicule, statut, codeDepot });
    }

    // ✅ Cas 1 : lignes valides → on les insère quand même
    if (vehicules.length > 0) {
      const result = await sequelize.transaction(async (t) => {
        return await Vehicule.bulkCreate(vehicules, {
          validate: true,
          transaction: t,
          individualHooks: true,
        });
      });

      return res.status(erreurs.length > 0 ? 207 : 201).json({
        message: erreurs.length > 0
          ? `${vehicules.length} ligne(s) importée(s) avec ${erreurs.length} erreur(s)`
          : "Importation réussie",
        totalLignes: data.length,
        lignesValides: vehicules.length,
        erreurs,
        details: result,
      });
    }

    // ❌ Cas 2 : toutes les lignes sont erronées
    return res.status(400).json({
      message: `${erreurs.length} erreur(s) dans le fichier Excel`,
      details: erreurs,
      totalLignes: data.length,
      lignesValides: 0,
    });
  } catch (error) {
    console.error("Erreur d'importation :", error);
    return res.status(500).json({
      error: "Erreur lors de l'importation",
      details: error.message,
    });
  }
};



exports.updateStatut = async (req, res) => {
  try {
    const matricule = req.params.matricule;
    const { statut } = req.body;

    if (!statut) {
      return res.status(400).json({
        success: false,
        message: "Le champ 'statut' est requis"
      });
    }

    const [updatedRows] = await Vehicule.update(
      { statut },
      { where: { matricule } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Véhicule non trouvé"
      });
    }

    res.json({
      success: true,
      message: `Statut du véhicule ${matricule} mis à jour`
    });

  } catch (error) {
    console.error("Erreur lors de la mise à jour du véhicule :", error); // ✅ corrigé ici
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message
    });
  }
};
