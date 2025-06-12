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


// Générateur de codeDepot automatique
function generateCodeDepot(nomDepot, region) {
  const cleanName = nomDepot.replace(/\s+/g, "").substring(0, 3).toUpperCase();
  const cleanRegion = region.replace(/\s+/g, "").substring(0, 3).toUpperCase();
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // ex: 4573
  return `${cleanName}-${cleanRegion}-${randomDigits}`;
}

// Ajouter
exports.createDepot = async (req, res) => {
  try {
    const { nomDepot, typeDepot, capaciteDepot, description, region, wilaya } = req.body;

    const codeDepot = generateCodeDepot(nomDepot, region);

    const depot = await Depot.create({
      codeDepot,
      nomDepot,
      typeDepot,
      capaciteDepot,
      description,
      region,
      wilaya
    });

    await affecterDepotAuxArticles(depot);

    res.status(201).json(depot);
  } catch (error) {
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

// Modifier un dépôt par codeDepot
exports.updateDepot = async (req, res) => {
  try {
    const { codeDepot } = req.params;
    const { nomDepot, typeDepot, capaciteDepot, description, region, wilaya } = req.body;

    const depot = await Depot.findOne({ where: { codeDepot } });
    if (!depot) {
      return res.status(404).json({ message: "Dépôt non trouvé" });
    }

    depot.nomDepot = nomDepot;
    depot.typeDepot = typeDepot;
    depot.capaciteDepot = capaciteDepot;
    depot.description = description;
    depot.region = region;
    depot.wilaya = wilaya;

    await depot.save();
    res.status(200).json(depot);
  } catch (error) {
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





// Importer depuis un fichier Excel
exports.importDepotsFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier envoyé" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const depots = data.map((row, index) => {
      if (!row.nomDepot || !row.region) {
        throw new Error(`Les champs nomDepot et region sont requis pour chaque ligne (ligne ${index + 2})`);
      }

      return {
        codeDepot: generateCodeDepot(row.nomDepot, row.region),
        nomDepot: row.nomDepot,
        typeDepot: row.typeDepot,
        capaciteDepot: row.capaciteDepot,
        description: row.description || null,
        region: row.region,
        wilaya: row.wilaya
      };
    });

    await Depot.bulkCreate(depots, { validate: true });

    res.status(201).json({ message: "Importation réussie", total: depots.length });
  } catch (error) {
    console.error("Erreur import Excel:", error);
    res.status(500).json({ error: error.message });
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




