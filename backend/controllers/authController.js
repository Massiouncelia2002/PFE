const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Utilisateur } = require("../models"); 

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Utilisateur.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: "Email incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.mdp);
    if (!isMatch) {
      return res.status(401).json({ message: " Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user.codeUtilisateur, role: user.role }, 
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, role: user.role });

  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
