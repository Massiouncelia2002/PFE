const bcrypt = require("bcryptjs");

async function hashPassword() {
  const password = "celia"; // Mets ici le mot de passe voulu
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Mot de passe haché :", hashedPassword);
}

hashPassword();