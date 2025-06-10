
const Utilisateur = require("../models/Utilisateur");
const XLSX = require("xlsx");
const fs = require("fs");
envoyerEmailUtilisateur = require("../services/mailService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");


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

// const genererCodeUtilisateur = async (role) => {
//   const prefix = prefixParRole[role] || "GEN";
//   const utilisateurs = await Utilisateur.findAll({ where: { role } });
//   const numero = (utilisateurs.length + 1).toString().padStart(3, "0");
//   return `${prefix}-${numero}`;
// };
const genererCodeUtilisateur = async (role) => {
  const prefixParRole = {
    "Admin Fonctionnel": "ADMF",
    "Admin Dépôt": "ADMD",
    "Gestionnaire Dépôt": "GEST",
  };

  const prefix = prefixParRole[role] || "GEN";

  const dernierUtilisateur = await Utilisateur.findOne({
    where: {
      role,
      codeUtilisateur: { [Op.like]: `${prefix}-%` },
    },
    order: [["codeUtilisateur", "DESC"]],
  });

  let numero = 1;

  if (dernierUtilisateur) {
    const dernierCode = dernierUtilisateur.codeUtilisateur;
    const match = dernierCode.match(/-(\d{3})$/);
    if (match) {
      numero = parseInt(match[1], 10) + 1;
    }
  }

  const code = `${prefix}-${String(numero).padStart(3, "0")}`;
  return code;
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


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Utilisateur.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.mdp);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user.codeUtilisateur, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
      role: user.role,
      nom: user.nom,
      prenom: user.prenom,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
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

