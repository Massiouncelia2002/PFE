const sequelize = require("./database");
const User = require("/models/User");

(async () => {
  try {
    await sequelize.authenticate(); // Vérifier la connexion
    console.log("Connexion réussie à PostgreSQL");

    await sequelize.sync({ force: true }); // Création de la table
    console.log("Table User créée avec succès !");
    process.exit();
  } catch (error) {
    console.error("Erreur de connexion ou de création de table :", error);
    process.exit(1);
  }
})();
