const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Role = require("./models/Role");
require("dotenv").config();

const router = express.Router();

// Route d'inscription
router.post("/register", async (req, res) => {
  try {
    const { nom, prenom, email, password, roleId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      roleId,
      statut: "activer",
    });
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route de connexion
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: Role });

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.id, role: user.Role.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, role: user.Role.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
