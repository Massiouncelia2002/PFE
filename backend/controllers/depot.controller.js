// const Depot = require("../models/Depot");
// const xlsx = require("xlsx");

// // Ajouter
// exports.createDepot = async (req, res) => {
//   try {
//     const { codeDepot, nomDepot, typeDepot, capaciteDepot, description,region } = req.body;

//     const depot = await Depot.create({
//       codeDepot,
//       nomDepot,
//       typeDepot,
//       capaciteDepot,
//       description,
//       region 
//     });

//     res.status(201).json(depot);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Récupérer
// exports.getDepots = async (req, res) => {
//   try {
//     const depots = await Depot.findAll({
//       attributes: ['idDepot', 'codeDepot', 'nomDepot', 'typeDepot', 'capaciteDepot', 'description', 'region'],
//     });

//     res.status(200).json(depots);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// //  Récupérer  par ID
// exports.getDepotById = async (req, res) => {
//   try {
//     const { idDepot } = req.params;

//     const depot = await Depot.findByPk(idDepot, {
//       attributes: ['idDepot', 'codeDepot', 'nomDepot', 'typeDepot', 'capaciteDepot', 'description', 'region'],
//     });

//     if (!depot) {
//       return res.status(404).json({ message: "Dépôt non trouvé" });
//     }

//     res.status(200).json(depot);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Modifier 
// exports.updateDepot = async (req, res) => {
//   try {
//     const { idDepot } = req.params;
//     const { codeDepot, nomDepot, typeDepot, capaciteDepot, description, region} = req.body;

//     const depot = await Depot.findByPk(idDepot);
//     if (!depot) {
//       return res.status(404).json({ message: "Dépôt non trouvé" });
//     }

//     depot.codeDepot = codeDepot;
//     depot.nomDepot = nomDepot;
//     depot.typeDepot = typeDepot;
//     depot.capaciteDepot = capaciteDepot;
//     depot.description = description;
//     depot.region = region;

//     await depot.save();
//     res.status(200).json(depot);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// //  Supprimer 
// exports.deleteDepot = async (req, res) => {
//   try {
//     const { idDepot } = req.params;

//     const depot = await Depot.findByPk(idDepot);
//     if (!depot) {
//       return res.status(404).json({ message: "Dépôt non trouvé" });
//     }

//     await depot.destroy();
//     res.status(200).json({ message: "Dépôt supprimé avec succès" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// //  Importer  via Excel
// exports.importDepotsFromExcel = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Aucun fichier envoyé" });
//     }

//     const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(sheet);

//     const depots = data.map(row => ({
//       codeDepot: row.codeDepot,
//       nomDepot: row.nomDepot,
//       typeDepot: row.typeDepot,
//       capaciteDepot: row.capaciteDepot,
//       description: row.description || null,
//       region: row.region,
//     }));

//     await Depot.bulkCreate(depots, { validate: true });

//     res.status(201).json({ message: "Importation réussie", total: depots.length });
//   } catch (error) {
//     console.error("Erreur import Excel:", error);
//     res.status(500).json({ error: error.message });
//   }
// };








// const Depot = require("../models/Depot");
// const xlsx = require("xlsx");

// // Générateur de codeDepot automatique
// function generateCodeDepot(nomDepot, region) {
//   const cleanName = nomDepot.replace(/\s+/g, "").substring(0, 3).toUpperCase();
//   const cleanRegion = region.replace(/\s+/g, "").substring(0, 3).toUpperCase();
//   const randomDigits = Math.floor(1000 + Math.random() * 9000); // ex: 4573
//   return `${cleanName}-${cleanRegion}-${randomDigits}`;
// }

// // Ajouter
// exports.createDepot = async (req, res) => {
//   try {
//     const { nomDepot, typeDepot, capaciteDepot, description, region } = req.body;

//     const codeDepot = generateCodeDepot(nomDepot, region);

//     const depot = await Depot.create({
//       codeDepot,
//       nomDepot,
//       typeDepot,
//       capaciteDepot,
//       description,
//       region
//     });

//     res.status(201).json(depot);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Récupérer tous les dépôts
// exports.getDepots = async (req, res) => {
//   try {
//     const depots = await Depot.findAll({
//       attributes: ['codeDepot', 'nomDepot', 'typeDepot', 'capaciteDepot', 'description', 'region'],
//     });

//     res.status(200).json(depots);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Récupérer un dépôt par codeDepot
// exports.getDepotByCode = async (req, res) => {
//   try {
//     const { codeDepot } = req.params;

//     const depot = await Depot.findOne({
//       where: { codeDepot },
//       attributes: ['codeDepot', 'nomDepot', 'typeDepot', 'capaciteDepot', 'description', 'region'],
//     });

//     if (!depot) {
//       return res.status(404).json({ message: "Dépôt non trouvé" });
//     }

//     res.status(200).json(depot);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Modifier un dépôt par codeDepot
// exports.updateDepot = async (req, res) => {
//   try {
//     const { codeDepot } = req.params;
//     const { nomDepot, typeDepot, capaciteDepot, description, region } = req.body;

//     const depot = await Depot.findOne({ where: { codeDepot } });
//     if (!depot) {
//       return res.status(404).json({ message: "Dépôt non trouvé" });
//     }

//     depot.nomDepot = nomDepot;
//     depot.typeDepot = typeDepot;
//     depot.capaciteDepot = capaciteDepot;
//     depot.description = description;
//     depot.region = region;

//     await depot.save();
//     res.status(200).json(depot);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Supprimer un dépôt par codeDepot
// exports.deleteDepot = async (req, res) => {
//   try {
//     const { codeDepot } = req.params;

//     const depot = await Depot.findOne({ where: { codeDepot } });
//     if (!depot) {
//       return res.status(404).json({ message: "Dépôt non trouvé" });
//     }

//     await depot.destroy();
//     res.status(200).json({ message: "Dépôt supprimé avec succès" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Importer depuis un fichier Excel
// exports.importDepotsFromExcel = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Aucun fichier envoyé" });
//     }

//     const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(sheet);

//     const depots = data.map(row => ({
//       codeDepot: generateCodeDepot(row.nomDepot, row.region),
//       nomDepot: row.nomDepot,
//       typeDepot: row.typeDepot,
//       capaciteDepot: row.capaciteDepot,
//       description: row.description || null,
//       region: row.region,
//     }));

//     await Depot.bulkCreate(depots, { validate: true });

//     res.status(201).json({ message: "Importation réussie", total: depots.length });
//   } catch (error) {
//     console.error("Erreur import Excel:", error);
//     res.status(500).json({ error: error.message });
//   }
// };













const { Utilisateur, Depot, Article, ArticleDepot,AffectationDepot } = require("../models");
const xlsx = require("xlsx");

const { Op } = require("sequelize");


// Générateur de codeDepot automatique
function generateCodeDepot(nomDepot, region) {
  const cleanName = nomDepot.replace(/\s+/g, "").substring(0, 3).toUpperCase();
  const cleanRegion = region.replace(/\s+/g, "").substring(0, 3).toUpperCase();
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // ex: 4573
  return `${cleanName}-${cleanRegion}-${randomDigits}`;
}

// // Ajouter
// exports.createDepot = async (req, res) => {
//   try {
//     const { nomDepot, typeDepot, capaciteDepot, description, region, wilaya } = req.body;

//     const codeDepot = generateCodeDepot(nomDepot, region);

//     const depot = await Depot.create({
//       codeDepot,
//       nomDepot,
//       typeDepot,
//       capaciteDepot,
//       description,
//       region,
//       wilaya
//     });

//     await affecterDepotAuxArticles(depot);

//     res.status(201).json(depot);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };






// Ajouter
exports.createDepot = async (req, res) => {
  try {
    const { nomDepot, typeDepot, capaciteDepot, description, region, wilaya } = req.body;

    // Validation manuelle supplémentaire
    const requiredFields = ['nomDepot', 'typeDepot', 'capaciteDepot', 'region', 'wilaya'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Champs obligatoires manquants: ${missingFields.join(', ')}` 
      });
    }

    if (capaciteDepot <= 0) {
      return res.status(400).json({ error: "La capacité du dépôt doit être une valeur positive strictement" });
    }
    
    if (!/[a-zA-Z]/.test(nomDepot)) {
      return res.status(400).json({ error: "Le nom du dépôt doit contenir au moins une lettre" });
    }

    const codeDepot = generateCodeDepot(nomDepot, region);

    const depot = await Depot.create({
      codeDepot,
      nomDepot,
      typeDepot,
      capaciteDepot,
      description, // facultatif
      region,
      wilaya
    });

    await affecterDepotAuxArticles(depot);

    res.status(201).json(depot);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ error: error.message });
  }
};







// Récupérer tous les dépôts
exports.getDepots = async (req, res) => {
  try {
    const depots = await Depot.findAll({
      attributes: ['codeDepot', 'nomDepot', 'typeDepot', 'capaciteDepot', 'description', 'region', 'wilaya'],
    });

    res.status(200).json(depots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un dépôt par codeDepot
exports.getDepotByCode = async (req, res) => {
  try {
    const { codeDepot } = req.params;

    const depot = await Depot.findOne({
      where: { codeDepot },
      attributes: ['codeDepot', 'nomDepot', 'typeDepot', 'capaciteDepot', 'description', 'region', 'wilaya'],
    });

    if (!depot) {
      return res.status(404).json({ message: "Dépôt non trouvé" });
    }

    res.status(200).json(depot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Modifier un dépôt par codeDepot
// exports.updateDepot = async (req, res) => {
//   try {
//     const { codeDepot } = req.params;
//     const { nomDepot, typeDepot, capaciteDepot, description, region, wilaya } = req.body;

//     const depot = await Depot.findOne({ where: { codeDepot } });
//     if (!depot) {
//       return res.status(404).json({ message: "Dépôt non trouvé" });
//     }

//     depot.nomDepot = nomDepot;
//     depot.typeDepot = typeDepot;
//     depot.capaciteDepot = capaciteDepot;
//     depot.description = description;
//     depot.region = region;
//     depot.wilaya = wilaya;

//     await depot.save();
//     res.status(200).json(depot);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

















// Modifier un dépôt
exports.updateDepot = async (req, res) => {
  try {
    const { codeDepot } = req.params;
    const { nomDepot, typeDepot, capaciteDepot, description, region, wilaya } = req.body;

    // Validation des champs obligatoires
    const requiredFields = ['nomDepot', 'typeDepot', 'capaciteDepot', 'region', 'wilaya'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Champs obligatoires manquants: ${missingFields.join(', ')}` 
      });
    }

    if (capaciteDepot <= 0) {
      return res.status(400).json({ error: "La capacité du dépôt doit être une valeur positive strictement" });
    }
    
    if (!/[a-zA-Z]/.test(nomDepot)) {
      return res.status(400).json({ error: "Le nom du dépôt doit contenir au moins une lettre" });
    }

    const depot = await Depot.findOne({ where: { codeDepot } });
    if (!depot) {
      return res.status(404).json({ message: "Dépôt non trouvé" });
    }

    depot.nomDepot = nomDepot;
    depot.typeDepot = typeDepot;
    depot.capaciteDepot = capaciteDepot;
    depot.description = description; // facultatif
    depot.region = region;
    depot.wilaya = wilaya;

    await depot.save();
    res.status(200).json(depot);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ error: error.message });
  }
};



// Supprimer un dépôt par codeDepot

exports.deleteDepot = async (req, res) => {
  try {
    const { codeDepot } = req.params;

    const depot = await Depot.findOne({ where: { codeDepot } });

    if (!depot) {
      return res.status(404).json({ message: "Dépôt non trouvé" });
    }

    // Vérifier s'il est affecté à un utilisateur
    if (depot.codeUtilisateur) {
      return res.status(400).json({
        message: "Impossible de supprimer ce dépôt car il est affecté à un utilisateur.",
      });
    }

    await depot.destroy();
    res.status(200).json({ message: "Dépôt supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// // Importer depuis un fichier Excel
// exports.importDepotsFromExcel = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Aucun fichier envoyé" });
//     }

//     const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(sheet);

//     const depots = data.map((row, index) => {
//       if (!row.nomDepot || !row.region) {
//         throw new Error(`Les champs nomDepot et region sont requis pour chaque ligne (ligne ${index + 2})`);
//       }

//       return {
//         codeDepot: generateCodeDepot(row.nomDepot, row.region),
//         nomDepot: row.nomDepot,
//         typeDepot: row.typeDepot,
//         capaciteDepot: row.capaciteDepot,
//         description: row.description || null,
//         region: row.region,
//         wilaya: row.wilaya
//       };
//     });

//     await Depot.bulkCreate(depots, { validate: true });

//     res.status(201).json({ message: "Importation réussie", total: depots.length });
//   } catch (error) {
//     console.error("Erreur import Excel:", error);
//     res.status(500).json({ error: error.message });
//   }
// };






// // Importer depuis Excel
// exports.importDepotsFromExcel = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Aucun fichier envoyé" });
//     }

//     const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(sheet);

//     const depots = [];
//     const errors = [];
//     const requiredFields = ['nomDepot', 'typeDepot', 'capaciteDepot', 'region', 'wilaya'];

//     data.forEach((row, index) => {
//       try {
//         // Vérification des champs obligatoires
//         const missingFields = requiredFields.filter(field => !row[field]);
//         if (missingFields.length > 0) {
//           throw new Error(`Champs obligatoires manquants: ${missingFields.join(', ')} (ligne ${index + 2})`);
//         }

//         // Validation de la capacité
//         if (row.capaciteDepot <= 0) {
//           throw new Error(`La capacité doit être positive (ligne ${index + 2})`);
//         }

//         // Validation du nom
//         if (!/[a-zA-Z]/.test(row.nomDepot)) {
//           throw new Error(`Le nom doit contenir au moins une lettre (ligne ${index + 2})`);
//         }

//         depots.push({
//           codeDepot: generateCodeDepot(row.nomDepot, row.region),
//           nomDepot: row.nomDepot,
//           typeDepot: row.typeDepot,
//           capaciteDepot: row.capaciteDepot,
//           description: row.description, // facultatif
//           region: row.region,
//           wilaya: row.wilaya
//         });
//       } catch (error) {
//         errors.push(error.message);
//       }
//     });

//     if (errors.length > 0) {
//       return res.status(400).json({ 
//         message: "Erreurs dans le fichier Excel",
//         errors,
//         validDepots: depots.length
//       });
//     }

//     await Depot.bulkCreate(depots, { validate: true });
//     res.status(201).json({ message: "Importation réussie", total: depots.length });
//   } catch (error) {
//     console.error("Erreur import Excel:", error);
//     if (error.name === 'SequelizeValidationError') {
//       const messages = error.errors.map(err => err.message);
//       return res.status(400).json({ errors: messages });
//     }
//     res.status(500).json({ error: error.message });
//   }
// };







// // Importer depuis Excel
// exports.importDepotsFromExcel = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Aucun fichier envoyé" });
//     }

//     const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(sheet);

//     const depots = [];
//     const errors = [];
//     const requiredFields = ['nomDepot', 'typeDepot', 'capaciteDepot', 'region', 'wilaya'];
//     const seenDepots = new Set(); // Pour détecter les doublons dans le fichier

//     data.forEach((row, index) => {
//       const lineNumber = index + 2; // +2 car l'index commence à 0 et on compte l'en-tête
//       try {
//         // Vérification des champs obligatoires
//         const missingFields = requiredFields.filter(field => !row[field]);
//         if (missingFields.length > 0) {
//           throw new Error(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
//         }

//         // Validation de la capacité
//         if (row.capaciteDepot <= 0) {
//           throw new Error('La capacité doit être positive');
//         }

//         // Validation du nom
//         if (!/[a-zA-Z]/.test(row.nomDepot)) {
//           throw new Error('Le nom doit contenir au moins une lettre');
//         }

//         // Génération du codeDepot pour vérification des doublons
//         const codeDepot = generateCodeDepot(row.nomDepot, row.region);
        
//         // Vérification des doublons dans le fichier
//         if (seenDepots.has(codeDepot)) {
//           throw new Error('Doublon détecté dans le fichier (même nom et région)');
//         }
//         seenDepots.add(codeDepot);

//         depots.push({
//           codeDepot,
//           nomDepot: row.nomDepot,
//           typeDepot: row.typeDepot,
//           capaciteDepot: row.capaciteDepot,
//           description: row.description || null,
//           region: row.region,
//           wilaya: row.wilaya
//         });
//       } catch (error) {
//         errors.push({
//           line: lineNumber,
//           message: `${error.message} (ligne ${lineNumber})`,
//           details: row
//         });
//       }
//     });

//     // Vérification des doublons dans la base de données
//     if (depots.length > 0) {
//       const existingDepots = await Depot.findAll({
//         where: {
//           codeDepot: depots.map(d => d.codeDepot)
//         }
//       });

//       if (existingDepots.length > 0) {
//         existingDepots.forEach(depot => {
//           const duplicateIndex = depots.findIndex(d => d.codeDepot === depot.codeDepot);
//           if (duplicateIndex !== -1) {
//             const lineNumber = data.findIndex(
//               row => generateCodeDepot(row.nomDepot, row.region) === depot.codeDepot
//             ) + 2;
            
//             errors.push({
//               line: lineNumber,
//               message: `Doublon existant dans la base de données (ligne ${lineNumber})`,
//               details: depots[duplicateIndex]
//             });
            
//             // Retirer le doublon du tableau des dépôts à créer
//             depots.splice(duplicateIndex, 1);
//           }
//         });
//       }
//     }

//     if (errors.length > 0) {
//       return res.status(400).json({ 
//         message: `Import partiel: ${depots.length} dépôt(s) valide(s), ${errors.length} ligne(s) ignorée(s)`,
//         errors: errors.map(err => err.message), // Retourne seulement les messages pour le front
//         detailedErrors: errors, // Pour un éventuel debug
//         validDepots: depots.length,
//         ignoredLines: errors.length
//       });
//     }

//     const result = await Depot.bulkCreate(depots, { validate: true });
//     res.status(201).json({ 
//       message: "Importation réussie", 
//       total: result.length,
//       importedDepots: result.map(d => d.codeDepot) 
//     });
//   } catch (error) {
//     console.error("Erreur import Excel:", error);
//     if (error.name === 'SequelizeValidationError') {
//       const messages = error.errors.map(err => `${err.message} (${err.path})`);
//       return res.status(400).json({ 
//         errors: messages,
//         ignoredLines: messages.length
//       });
//     }
//     res.status(500).json({ 
//       error: error.message,
//       ignoredLines: data ? data.length : 'inconnu'
//     });
//   }
// };







// Import depuis Excel
exports.importDepotsFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier envoyé" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const depots = [];
    const errors = [];
    const requiredFields = ['nomDepot', 'typeDepot', 'capaciteDepot', 'region', 'wilaya'];
    const seenInFile = new Set();

    data.forEach((row, index) => {
      const lineNumber = index + 2;

      try {
        // Vérifier champs obligatoires
        const missingFields = requiredFields.filter(field => !row[field]);
        if (missingFields.length > 0) {
          throw new Error(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
        }

        // Validation capacité
        if (row.capaciteDepot <= 0) {
          throw new Error("La capacité doit être positive");
        }

        // Validation nom
        if (!/[a-zA-Z]/.test(row.nomDepot)) {
          throw new Error("Le nom doit contenir au moins une lettre");
        }

        // Vérifier doublon dans le fichier (mêmes champs)
        const key = `${row.nomDepot}|${row.typeDepot}|${row.capaciteDepot}|${row.region}|${row.wilaya}`;
        if (seenInFile.has(key)) {
          throw new Error("Doublon détecté dans le fichier (mêmes champs)");
        }
        seenInFile.add(key);

        // Préparer le dépôt
        const depot = {
          codeDepot: generateCodeDepot(row.nomDepot, row.region),
          nomDepot: row.nomDepot,
          typeDepot: row.typeDepot,
          capaciteDepot: row.capaciteDepot,
          description: row.description || null,
          region: row.region,
          wilaya: row.wilaya
        };

        depots.push(depot);

      } catch (error) {
        errors.push({
          line: lineNumber,
          message: `${error.message} (ligne ${lineNumber})`,
          details: row
        });
      }
    });

    // Vérifier doublons dans la base (par champs)
    const filteredDepots = [];
    for (const d of depots) {
      const exists = await Depot.findOne({
        where: {
          nomDepot: d.nomDepot,
          typeDepot: d.typeDepot,
          capaciteDepot: d.capaciteDepot,
          region: d.region,
          wilaya: d.wilaya
        }
      });

      if (exists) {
        const lineNumber = data.findIndex(row =>
          row.nomDepot === d.nomDepot &&
          row.typeDepot === d.typeDepot &&
          row.capaciteDepot === d.capaciteDepot &&
          row.region === d.region &&
          row.wilaya === d.wilaya
        ) + 2;

        errors.push({
          line: lineNumber,
          message: `Doublon existant dans la base de données (ligne ${lineNumber})`,
          details: d
        });
      } else {
        filteredDepots.push(d);
      }
    }

    // Mise à jour de la liste finale des dépôts valides
    depots.length = 0;
    depots.push(...filteredDepots);

    // S'il y a des erreurs
    if (errors.length > 0) {
      return res.status(400).json({
        message: `Import partiel : ${depots.length} dépôt(s) valide(s), ${errors.length} ligne(s) ignorée(s)`,
        errors: errors.map(e => e.message),
        detailedErrors: errors,
        validDepots: depots.length,
        ignoredLines: errors.length
      });
    }

    // Insertion finale
    const result = await Depot.bulkCreate(depots, { validate: true });

    res.status(201).json({
      message: "Importation réussie",
      total: result.length,
      importedDepots: result.map(d => d.codeDepot)
    });

  } catch (error) {
    console.error("Erreur import Excel:", error);
    res.status(500).json({
      error: error.message,
      ignoredLines: data ? data.length : 'inconnu'
    });
  }
};







exports.affecterUtilisateurMultiple = async (req, res) => {
  try {
    const { codesDepot, codeUtilisateur } = req.body;

    if (!codesDepot || !codeUtilisateur) {
      return res.status(400).json({
        message: "Les champs codeUtilisateur et codesDepot sont requis."
      });
    }

    // Vérifier que l’utilisateur existe
    const utilisateur = await Utilisateur.findOne({ where: { codeUtilisateur } });

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Récupérer le rôle global de l’utilisateur (qui devient roleDepot)
    const roleDepot = utilisateur.role;

    for (const codeDepot of codesDepot) {
      const depot = await Depot.findOne({ where: { codeDepot } });

      if (!depot) {
        return res.status(404).json({
          message: `Dépôt avec le code ${codeDepot} non trouvé`
        });
      }

      // Vérifier si ce rôle est déjà affecté dans ce dépôt
      const roleExiste = await AffectationDepot.findOne({
        where: { codeDepot, roleDepot }
      });

      if (roleExiste) {
        return res.status(400).json({
          message: `Le dépôt ${codeDepot} est déjà occupé par un utilisateur avec le rôle ${roleDepot}`
        });
      }

      // Vérifier si cet utilisateur est déjà affecté à ce dépôt
      const dejaAffecte = await AffectationDepot.findOne({
        where: { codeDepot, codeUtilisateur }
      });

      if (dejaAffecte) {
        return res.status(400).json({
          message: `L'utilisateur est déjà affecté au dépôt ${codeDepot}`
        });
      }

      // Créer l'affectation avec le rôle récupéré
      await AffectationDepot.create({
        codeUtilisateur,
        codeDepot,
        roleDepot
      });
    }

    res.status(200).json({ message: "Affectation(s) enregistrée(s) avec succès." });

  } catch (error) {
    console.error("Erreur affectation :", error);
    res.status(500).json({ error: error.message });
  }
};







exports.checkDepotStatut = async (req, res) => {
  try {
    const { codeDepot, role } = req.params;

    const exist = await AffectationDepot.findOne({
      where: {
        codeDepot,
        roleDepot: role
      }
    });

    return res.status(200).json({ affecte: !!exist });

  } catch (error) {
    console.error("Erreur statut dépôt :", error);
    res.status(500).json({ error: error.message });
  }
};






exports.getUtilisateursAvecDepots = async (req, res) => {
  try {
    const affectations = await AffectationDepot.findAll({
      include: [
        {
          model: Utilisateur,
          attributes: ['codeUtilisateur', 'nom', 'prenom', 'email', 'role']
        },
        {
          model: Depot,
          attributes: ['codeDepot', 'nomDepot', 'region', 'wilaya']
        }
      ]
    });

    if (!affectations || affectations.length === 0) {
      return res.status(404).json({ message: "Aucune affectation trouvée" });
    }

    // Regrouper les dépôts par utilisateur
    const utilisateursMap = {};

    affectations.forEach(({ Utilisateur: user, Depot: depot, roleDepot }) => {
      const userId = user.codeUtilisateur;

      if (!utilisateursMap[userId]) {
        utilisateursMap[userId] = {
          codeUtilisateur: user.codeUtilisateur,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          role: user.role,
          depots: []
        };
      }

      utilisateursMap[userId].depots.push({
        codeDepot: depot.codeDepot,
        nomDepot: depot.nomDepot,
        region: depot.region,
        wilaya: depot.wilaya,
        roleDepot
      });
    });

    res.status(200).json(Object.values(utilisateursMap));

  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
















exports.affecterArticlesADepots = async (req, res) => {
  let { codeArticles, codeDepots } = req.body;

  // Validation de base
  if (!codeArticles || !codeDepots) {
    return res.status(400).json({ message: "Les champs 'codeArticles' et 'codeDepots' sont requis." });
  }

  // Si les champs ne sont pas des tableaux, les convertir
  if (typeof codeArticles === 'string') {
    codeArticles = [codeArticles];
  }
  if (typeof codeDepots === 'string') {
    codeDepots = [codeDepots];
  }

  // Vérifier que ce sont bien des tableaux après conversion
  if (!Array.isArray(codeArticles) || !Array.isArray(codeDepots)) {
    return res.status(400).json({ message: "'codeArticles' et 'codeDepots' doivent être des tableaux ou des chaînes de caractères." });
  }

  try {
    const results = [];

    for (const codeDepot of codeDepots) {
      for (const codeArticle of codeArticles) {
        const exist = await ArticleDepot.findOne({ where: { codeArticle, codeDepot } });

        if (exist) {
          results.push({ codeArticle, codeDepot, status: 'exists', message: 'Déjà affecté' });
          continue;
        }

        await ArticleDepot.create({
          codeArticle,
          codeDepot,
          quantiteStockee: 0,
          stockMax: 0,
          stockAlert: 0
        });

        results.push({ codeArticle, codeDepot, status: 'created', message: 'Affectation réussie' });
      }
    }

    return res.status(201).json({
      message: "Affectation terminée avec succès.",
      details: results
    });
  } catch (error) {
    console.error("Erreur lors de l’affectation multiple :", error.message);
    return res.status(500).json({ message: "Erreur serveur lors de l’affectation." });
  }
};




exports.getDepotsUtilisateurConnecte = async (req, res) => {
  try {
    const codeUtilisateur = req.user.id; // récupéré depuis le token

    const affectations = await AffectationDepot.findAll({
      where: { codeUtilisateur },
      include: [{ model: Depot }]
    });

    const depots = affectations.map((a) => a.Depot);

    res.status(200).json(depots);
  } catch (error) {
    console.error("Erreur récupération des dépôts utilisateur connecté :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};




