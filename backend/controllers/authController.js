// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { Utilisateur } = require("../models"); 

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await Utilisateur.findOne({
//       where: { email }
//     });

//     if (!user) {
//       return res.status(401).json({ message: "Email incorrect" });
//     }

//     const isMatch = await bcrypt.compare(password, user.mdp);
//     if (!isMatch) {
//       return res.status(401).json({ message: " Mot de passe incorrect" });
//     }

//     const token = jwt.sign(
//       { id: user.codeUtilisateur, role: user.role }, 
//       "SECRET_KEY",
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ token, role: user.role });

//   } catch (error) {
//     console.error("Erreur lors de la connexion :", error);
//     res.status(500).json({ message: "Erreur interne du serveur" });
//   }
// };




const { exec } = require("child_process");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Utilisateur } = require("../models");
const { AffectationDepot } = require("../models");

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Recherche de l'utilisateur
//     const user = await Utilisateur.findOne({ where: { email } });

//     if (!user) {
//       return res.status(401).json({ message: "Email incorrect" });
//     }

//     // Vérification du mot de passe
//     const isMatch = await bcrypt.compare(password, user.mdp);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Mot de passe incorrect" });
//     }

//     // Création du token JWT
//     const token = jwt.sign(
//       {
//         id: user.codeUtilisateur, // utilise bien le nom exact de la clé primaire dans ta BDD
//         role: user.role,
//       },
//       process.env.JWT_SECRET, // stocké dans .env
//       { expiresIn: "1h" }
//     );

//     // Réponse
//     res.status(200).json({
//       message: "Connexion réussie",
//       token,
//       role: user.role,
//        nom: user.nom,
//       prenom: user.prenom,
//     });

//   } catch (error) {
//     console.error("Erreur lors de la connexion :", error);
//     res.status(500).json({ message: "Erreur interne du serveur" });
//   }
// };



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
      {
        id: user.codeUtilisateur,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Récupérer les dépôts liés à cet utilisateur
    const affectations = await AffectationDepot.findAll({
      where: { codeUtilisateur: user.codeUtilisateur },
    });

    const codesDepot = affectations.map(a => a.codeDepot);
    if (codesDepot.length > 0) {
      const scriptPath = path.join(__dirname, "..", "python_scripts", "predict_sarima.py");
      const argDepots = codesDepot.join(",");

      // ✅ Lancer le script Python avec les dépôts en argument
      exec(`python "${scriptPath}" "${argDepots}"`, (error, stdout, stderr) => {
        if (error) {
          console.error("Erreur exécution script :", stderr);
        } else {
          console.log("✅ Script exécuté avec succès :", stdout);
        }
      });
    } else {
      console.log("⚠️ Aucun dépôt affecté, script non lancé.");
    }

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
