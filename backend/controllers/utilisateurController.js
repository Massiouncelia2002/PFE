

// const Utilisateur = require("../models/Utilisateur");
// const XLSX = require("xlsx");
// const fs = require("fs");
// envoyerEmailUtilisateur = require("../services/mailService");

// const generateRandomPassword = (length = 10) => {
//   const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
//   let password = "";
//   for (let i = 0; i < length; i++) {
//     password += charset.charAt(Math.floor(Math.random() * charset.length));
//   }
//   return password;
// };

// const prefixParRole = {
//   "Admin Fonctionnel": "ADMF",
//   "Gestionnaire Dépôt": "GDEP",
//   "Admin Dépôt": "ADMD"
// };

// const genererCodeUtilisateur = async (role) => {
//   const prefix = prefixParRole[role] || "GEN";
//   const utilisateurs = await Utilisateur.findAll({ where: { role } });
//   const numero = (utilisateurs.length + 1).toString().padStart(3, "0");
//   return `${prefix}-${numero}`;
// }; 

// // ✅ Import depuis Excel
// exports.importerDepuisExcel = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "Aucun fichier reçu" });

//     const filePath = req.file.path;
//     const workbook = XLSX.readFile(filePath);
//     const feuille = workbook.Sheets[workbook.SheetNames[0]];
//     const donnees = XLSX.utils.sheet_to_json(feuille);

//     for (const d of donnees) {
//       const codeUtilisateur = await genererCodeUtilisateur(d.role);

//       await Utilisateur.create({
//         codeUtilisateur,
//         nom: d.nom,
//         prenom: d.prenom,
//         email: d.email,
//         mdp: generateRandomPassword(10),
//         posteTravail: d.posteTravail,
//         brancheFonction: d.brancheFonction,
//         dateFin: d.dateFin || null,
//         role: d.role
//       });
//     }

//     fs.unlinkSync(filePath);
//     res.status(200).json({ message: "Importation réussie" });
//   } catch (err) {
//     res.status(500).json({ message: "Erreur lors de l'importation", error: err });
//   }
// };

// // ✅ Création avec génération de code
// exports.creerUtilisateur = async (req, res) => {
//   try {
//     const {
//       nom,
//       prenom,
//       email,
//       posteTravail,
//       brancheFonction,
//       dateFin,
//       role
//     } = req.body;

//     const mdpTemporaire = generateRandomPassword(10);
//     const codeUtilisateur = await genererCodeUtilisateur(role);

//     const nouvelUtilisateur = await Utilisateur.create({
//       codeUtilisateur,
//       nom,
//       prenom,
//       email,
//       mdp: mdpTemporaire,
//       posteTravail,
//       brancheFonction,
//       dateFin,
//       role
//     });

//     await envoyerEmailUtilisateur(email, prenom, nom, mdpTemporaire);

//     res.status(201).json({
//       message: "Utilisateur créé et email envoyé avec succès",
//       utilisateur: nouvelUtilisateur
//     });
//   } catch (error) {
//     console.error("Erreur création/envoi :", error);
//     res.status(500).json({ message: "Erreur lors de la création", error });
//   }
// };

// // ✅ Liste
// exports.getTousLesUtilisateurs = async (req, res) => {
//   try {
//     const utilisateurs = await Utilisateur.findAll();
//     res.status(200).json(utilisateurs);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la récupération", error });
//   }
// };

// // ✅ Récupération par codeUtilisateur
// exports.getUtilisateurParId = async (req, res) => {
//   try {
//     const { codeUtilisateur } = req.params;
//     const utilisateur = await Utilisateur.findByPk(codeUtilisateur);

//     if (!utilisateur) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }

//     res.status(200).json(utilisateur);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur serveur", error });
//   }
// };

// // ✅ Mise à jour
// exports.modifierUtilisateur = async (req, res) => {
//   try {
//     const { codeUtilisateur } = req.params;
//     const {
//       nom,
//       prenom,
//       email,
//       posteTravail,
//       brancheFonction,
//       dateFin,
//       role
//     } = req.body;

//     const utilisateur = await Utilisateur.findByPk(codeUtilisateur);

//     if (!utilisateur) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }

//     utilisateur.nom = nom || utilisateur.nom;
//     utilisateur.prenom = prenom || utilisateur.prenom;
//     utilisateur.email = email || utilisateur.email;
//     utilisateur.posteTravail = posteTravail || utilisateur.posteTravail;
//     utilisateur.brancheFonction = brancheFonction || utilisateur.brancheFonction;
//     utilisateur.dateFin = dateFin || utilisateur.dateFin;
//     utilisateur.role = role || utilisateur.role;

//     await utilisateur.save();

//     res.status(200).json({ message: "Utilisateur mis à jour avec succès", utilisateur });
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la mise à jour", error });
//   }
// };

// // ✅ Suppression
// exports.supprimerUtilisateur = async (req, res) => {
//   try {
//     const { codeUtilisateur } = req.params;

//     const utilisateur = await Utilisateur.findByPk(codeUtilisateur);

//     if (!utilisateur) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }

//     await utilisateur.destroy();

//     res.status(200).json({ message: "Utilisateur supprimé avec succès" });
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la suppression", error });
//   }
// };












// const Utilisateur = require("../models/Utilisateur");
// const XLSX = require("xlsx");
// const fs = require("fs");
// envoyerEmailUtilisateur = require("../services/mailService");

// const generateRandomPassword = (length = 10) => {
//   const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
//   let password = "";
//   for (let i = 0; i < length; i++) {
//     password += charset.charAt(Math.floor(Math.random() * charset.length));
//   }
//   return password;
// };

// const prefixParRole = {
//   "Admin Fonctionnel": "ADMF",
//   "Gestionnaire Dépôt": "GDEP",
//   "Admin Dépôt": "ADMD"
// };

// const genererCodeUtilisateur = async (role) => {
//   const prefix = prefixParRole[role] || "GEN";
//   const utilisateurs = await Utilisateur.findAll({ where: { role } });
//   const numero = (utilisateurs.length + 1).toString().padStart(3, "0");
//   return `${prefix}-${numero}`;
// };

// exports.importerDepuisExcel = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "Aucun fichier reçu" });

//     const filePath = req.file.path;
//     const workbook = XLSX.readFile(filePath);
//     const feuille = workbook.Sheets[workbook.SheetNames[0]];
//     const donnees = XLSX.utils.sheet_to_json(feuille);

//     const erreurs = []; // Pour stocker les erreurs par utilisateur

//     for (const [index, d] of donnees.entries()) {
//       try {
//         // ✅ Vérifier si l'email existe déjà dans la base
//         const emailExistant = await Utilisateur.findOne({ where: { email: d.email } });
//         if (emailExistant) {
//           erreurs.push({ ligne: index + 2, messages: ["Email déjà utilisé dans la base."] });
//           continue; // Passer à la ligne suivante
//         }

//         const codeUtilisateur = await genererCodeUtilisateur(d.role);

//         await Utilisateur.create({
//           codeUtilisateur,
//           nom: d.nom,
//           prenom: d.prenom,
//           email: d.email,
//           mdp: generateRandomPassword(10),
//           posteTravail: d.posteTravail,
//           brancheFonction: d.brancheFonction,
//           dateFin: d.dateFin || null,
//           role: d.role
//         });
//       } catch (err) {
//         if (err.name === "SequelizeValidationError") {
//           const messages = err.errors.map(e => e.message);
//           erreurs.push({ ligne: index + 2, messages });
//         } else {
//           erreurs.push({ ligne: index + 2, messages: [err.message] });
//         }
//       }
//     }

//     fs.unlinkSync(filePath); // Supprimer le fichier temporaire

//     if (erreurs.length > 0) {
//       return res.status(400).json({
//         message: "Importation terminée avec des erreurs",
//         erreurs
//       });
//     }

//     res.status(200).json({ message: "Importation réussie sans erreur" });

//   } catch (err) {
//     console.error("Erreur générale lors de l'importation :", err);
//     res.status(500).json({ message: "Erreur lors de l'importation", error: err.message });
//   }
// };





// // ✅ Création avec génération de code
// exports.creerUtilisateur = async (req, res) => {
//   try {
//     const {
//       nom,
//       prenom,
//       email,
//       posteTravail,
//       brancheFonction,
//       dateFin,
//       role
//     } = req.body;

//      // ✅ Vérifier si l'email existe déjà
//      const utilisateurExistant = await Utilisateur.findOne({ where: { email } });
//      if (utilisateurExistant) {
//        return res.status(400).json({ erreurs: { email: "L'email existe déjà." } });
//      }

//     const mdpTemporaire = generateRandomPassword(10);
//     const codeUtilisateur = await genererCodeUtilisateur(role);

//     const nouvelUtilisateur = await Utilisateur.create({
//       codeUtilisateur,
//       nom,
//       prenom,
//       email,
//       mdp: mdpTemporaire,
//       posteTravail,
//       brancheFonction,
//       dateFin,
//       role
//     });

//     await envoyerEmailUtilisateur(email, prenom, nom, mdpTemporaire);

//     res.status(201).json({
//       message: "Utilisateur créé et email envoyé avec succès",
//       utilisateur: nouvelUtilisateur
//     });
//   } catch (error) {
//     console.error("Erreur création/envoi :", error);

//     // 🔽 Bloc spécial pour les erreurs Sequelize de validation
//     if (error.name === "SequelizeValidationError") {
//       const messages = error.errors.map(err => err.message);
//       return res.status(400).json({ message: "Erreur de validation", erreurs: messages });
//     }

//     // 🔽 Erreurs générales (ex: erreur de connexion, etc.)
//     res.status(500).json({ message: "Erreur lors de la création", error });
//   }
// };


// // ✅ Liste
// exports.getTousLesUtilisateurs = async (req, res) => {
//   try {
//     const utilisateurs = await Utilisateur.findAll();
//     res.status(200).json(utilisateurs);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la récupération", error });
//   }
// };

// // ✅ Récupération par codeUtilisateur
// exports.getUtilisateurParId = async (req, res) => {
//   try {
//     const { codeUtilisateur } = req.params;
//     const utilisateur = await Utilisateur.findByPk(codeUtilisateur);

//     if (!utilisateur) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }

//     res.status(200).json(utilisateur);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur serveur", error });
//   }
// };

// // ✅ Mise à jour
// exports.modifierUtilisateur = async (req, res) => {
//   try {
//     const { codeUtilisateur } = req.params;
//     const {
//       nom,
//       prenom,
//       email,
//       posteTravail,
//       brancheFonction,
//       dateFin,
//       role
//     } = req.body;


    

//     const utilisateur = await Utilisateur.findByPk(codeUtilisateur);

//     if (!utilisateur) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }

//     if (email && email !== utilisateur.email) {
//       const emailExistant = await Utilisateur.findOne({ where: { email } });
//       if (emailExistant) {
//         return res.status(400).json({ erreurs: { email: "Cet email est déjà utilisé." } });
//       }
//     }

//     utilisateur.nom = nom || utilisateur.nom;
//     utilisateur.prenom = prenom || utilisateur.prenom;
//     utilisateur.email = email || utilisateur.email;
//     utilisateur.posteTravail = posteTravail || utilisateur.posteTravail;
//     utilisateur.brancheFonction = brancheFonction || utilisateur.brancheFonction;
//     utilisateur.dateFin = dateFin || utilisateur.dateFin;
//     utilisateur.role = role || utilisateur.role;

//     await utilisateur.save();

//     res.status(200).json({ message: "Utilisateur mis à jour avec succès", utilisateur });
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour :", error);

//     if (error.name === "SequelizeValidationError") {
//       const messages = error.errors.map(err => err.message);
//       return res.status(400).json({ message: "Erreur de validation", erreurs: messages });
//     }

//     res.status(500).json({ message: "Erreur lors de la mise à jour", error });
//   }
// };


// // ✅ Suppression
// exports.supprimerUtilisateur = async (req, res) => {
//   try {
//     const { codeUtilisateur } = req.params;

//     const utilisateur = await Utilisateur.findByPk(codeUtilisateur);

//     if (!utilisateur) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }

//     await utilisateur.destroy();

//     res.status(200).json({ message: "Utilisateur supprimé avec succès" });
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la suppression", error });
//   }
// };











const Utilisateur = require("../models/Utilisateur");
const XLSX = require("xlsx");
const fs = require("fs");
envoyerEmailUtilisateur = require("../services/mailService");

const generateRandomPassword = (length = 10) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const prefixParRole = {
  "Admin Fonctionnel": "ADMF",
  "Gestionnaire Dépôt": "GDEP",
  "Admin Dépôt": "ADMD"
};

const genererCodeUtilisateur = async (role) => {
  const prefix = prefixParRole[role] || "GEN";
  const utilisateurs = await Utilisateur.findAll({ where: { role } });
  const numero = (utilisateurs.length + 1).toString().padStart(3, "0");
  return `${prefix}-${numero}`;
};

exports.importerDepuisExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Aucun fichier reçu" });

    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const feuille = workbook.Sheets[workbook.SheetNames[0]];
    const donnees = XLSX.utils.sheet_to_json(feuille);

    const erreurs = [];

    for (const [index, d] of donnees.entries()) {
      try {
       
        if (email && email !== utilisateur.email) {
          const emailExistant = await Utilisateur.findOne({ where: { email } });
          if (emailExistant) {
            return res.status(400).json({
              message: "Erreur de validation",
              erreurs: { email: "Cet email est déjà utilisé." }
            });
          }
        }

        const codeUtilisateur = await genererCodeUtilisateur(d.role);

        await Utilisateur.create({
          codeUtilisateur,
          nom: d.nom,
          prenom: d.prenom,
          email: d.email,
          mdp: generateRandomPassword(10),
          posteTravail: d.posteTravail,
          brancheFonction: d.brancheFonction,
          dateFin: d.dateFin || null,
          role: d.role
        });
      } catch (err) {
        if (err.name === "SequelizeValidationError") {
          const messages = err.errors.map(e => e.message);
          erreurs.push({ ligne: index + 2, messages });
        } else {
          erreurs.push({ ligne: index + 2, messages: [err.message] });
        }
      }
    }

    fs.unlinkSync(filePath);

    if (erreurs.length > 0) {
      return res.status(400).json({
        message: "Importation terminée avec des erreurs",
        erreurs
      });
    }

    res.status(200).json({ message: "Importation réussie sans erreur" });

  } catch (err) {
    console.error("Erreur générale lors de l'importation :", err);
    res.status(500).json({ message: "Erreur lors de l'importation", error: err.message });
  }
};

exports.creerUtilisateur = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      posteTravail,
      brancheFonction,
      dateFin,
      role
    } = req.body;

    const utilisateurExistant = await Utilisateur.findOne({ where: { email } });
    if (utilisateurExistant) {
      return res.status(400).json({
        message: "L'email existe déjà.",
        erreurs: { email: "Cet email est déjà utilisé." }
      });
    }

    const mdpTemporaire = generateRandomPassword(10);
    const codeUtilisateur = await genererCodeUtilisateur(role);

    const nouvelUtilisateur = await Utilisateur.create({
      codeUtilisateur,
      nom,
      prenom,
      email,
      mdp: mdpTemporaire,
      posteTravail,
      brancheFonction,
      dateFin,
      role
    });

    await envoyerEmailUtilisateur(email, prenom, nom, mdpTemporaire);

    res.status(201).json({
      message: "Utilisateur créé et email envoyé avec succès",
      utilisateur: nouvelUtilisateur
    });
  } catch (error) {
    console.error("Erreur création/envoi :", error);

    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: "Erreur de validation", erreurs: messages });
    }

    res.status(500).json({ message: "Erreur lors de la création", error });
  }
};

exports.getTousLesUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error });
  }
};

exports.getUtilisateurParId = async (req, res) => {
  try {
    const { codeUtilisateur } = req.params;
    const utilisateur = await Utilisateur.findByPk(codeUtilisateur);

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ Mise à jour
exports.modifierUtilisateur = async (req, res) => {
  try {
    const { codeUtilisateur } = req.params;
    const {
      nom,
      prenom,
      email,
      posteTravail,
      brancheFonction,
      dateFin,
      role
    } = req.body;

    const utilisateur = await Utilisateur.findByPk(codeUtilisateur);

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérification si l'email est modifié et existe déjà dans la base
    if (email && email !== utilisateur.email) {
      const emailExistant = await Utilisateur.findOne({ where: { email } });
      if (emailExistant) {
        return res.status(400).json({
          message: "Erreur de validation",
          erreurs: { email: "Cet email est déjà utilisé." }
        });
      }
    }

    // Mise à jour des informations de l'utilisateur
    utilisateur.nom = nom || utilisateur.nom;
    utilisateur.prenom = prenom || utilisateur.prenom;
    utilisateur.email = email || utilisateur.email;
    utilisateur.posteTravail = posteTravail || utilisateur.posteTravail;
    utilisateur.brancheFonction = brancheFonction || utilisateur.brancheFonction;
    utilisateur.dateFin = dateFin || utilisateur.dateFin;
    utilisateur.role = role || utilisateur.role;

    await utilisateur.save();

    res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      utilisateur
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);

    // Gestion des erreurs Sequelize de validation
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({
        message: "Erreur de validation",
        erreurs: messages
      });
    }

    // Erreurs générales (ex: erreur de connexion, etc.)
    res.status(500).json({
      message: "Erreur lors de la mise à jour",
      error: error.message
    });
  }
};

exports.supprimerUtilisateur = async (req, res) => {
  try {
    const { codeUtilisateur } = req.params;

    const utilisateur = await Utilisateur.findByPk(codeUtilisateur);

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await utilisateur.destroy();

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};


exports.getUtilisateursDepotGroupes = async (req, res) => {
  try {
    const gestionnaires = await Utilisateur.findAll({
      where: { role: "Gestionnaire Dépôt" }
    });

    const admins = await Utilisateur.findAll({
      where: { role: "Admin Dépôt" }
    });

    res.status(200).json({
      gestionnaires,
      admins
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
  }
};

