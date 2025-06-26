const Utilisateur = require("../models/Utilisateur");
const XLSX = require("xlsx");
const fs = require("fs");
envoyerEmailUtilisateur = require("../services/mailService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// const generateRandomPassword = (length = 10) => {
//   const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
//   let password = "";
//   for (let i = 0; i < length; i++) {
//     password += charset.charAt(Math.floor(Math.random() * charset.length));
//   }
//   return password;
// };
const generateRandomPassword = (length = 10) => {
  if (length < 2) {
    throw new Error("La longueur doit être d'au moins 2 pour inclure une lettre au début et à la fin.");
  }

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";

  let password = "";

  // Première lettre
  password += letters.charAt(Math.floor(Math.random() * letters.length));

  // Corps du mot de passe
  for (let i = 0; i < length - 2; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // Dernière lettre
  password += letters.charAt(Math.floor(Math.random() * letters.length));

  return password;
};


const genererCodeUtilisateur = async (role) => {
  const prefixParRole = {
    "Admin Fonctionnel": "ADMF",
    "Admin Dépôt": "ADMD",
    "Planificateur": "PLNF" 
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
    const emailsExistants = new Set();

    // Vérification préalable des emails
    for (const d of donnees) {
      if (!d.email) {
        erreurs.push({ ligne: donnees.indexOf(d) + 2, messages: ["Email manquant"] });
        continue;
      }

      const emailExistant = await Utilisateur.findOne({ where: { email: d.email } });
      if (emailExistant || emailsExistants.has(d.email)) {
        erreurs.push({ ligne: donnees.indexOf(d) + 2, messages: ["Cet email est déjà utilisé"] });
      } else {
        emailsExistants.add(d.email);
      }
    }

    if (erreurs.length > 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        message: "Erreurs détectées avant importation",
        erreurs
      });
    }

    // Importation des données valides
    for (const [index, d] of donnees.entries()) {
      try {
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
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
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
      where: { role: "Planificateur" }
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

exports.getProfil = async (req, res) => {
  try {
    console.log("Profile request received. Headers:", req.headers);
    console.log("Authenticated user:", req.user);

    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized - No user ID found" });
    }

    const userId = req.user.id;

    const user = await Utilisateur.findByPk(userId, {
      attributes: [
        "codeUtilisateur",
        "nom",
        "prenom",
        "email",
        "posteTravail",
        "brancheFonction",
        "role",
        "dateCreation",
        "dateFin",
        "statut"
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    console.log("Sending profile data for user ID:", userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Profile controller error:", {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: "Erreur serveur",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};