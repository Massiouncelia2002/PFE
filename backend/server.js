const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Synchroniser la base de données
sequelize.sync()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.log("❌ Database connection error:", err));


// Importation des routes
const authRoutes = require("./routes/authRoutes");
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const articleRoutes = require("./routes/articleRoutes");
const familleRoutes = require("./routes/familleRoutes");
const sousFamilleRoutes = require("./routes/sousFamilleRoutes");
const depotRoutes = require("./routes/depot.routes");
const clientRoutes = require('./routes/clientRoutes');
const vehiculeRoutes = require("./routes/vehiculeRoutes");
const commandeRoutes = require('./routes/commandeRoutes');
const uniteRoutes = require("./routes/uniteDeMesureRoutes");
const articleuniteRoutes = require("./routes/articleUniteRoutes");
const articleDepotRoutes = require('./routes/articleDepotRoutes');
const entreeRoutes = require("./routes/entreeRoutes");
const commandePlanifieRoutes = require("./routes/commandePlanifieRoutes");





// Définition des routes
app.use("/api/auth", authRoutes);
app.use('/utilisateur', utilisateurRoutes);
app.use("/api/familles", familleRoutes);
app.use("/api/sous-familles", sousFamilleRoutes);
app.use("/api/articles", articleRoutes);
app.use("/depot", depotRoutes);
app.use("/client", clientRoutes);
app.use("/vehicules", vehiculeRoutes);
// app.use("/import", commandeRoutes);

app.use("/api/commande", commandeRoutes); 

app.use("/api/unites", uniteRoutes);
app.use("/api/articleUnites", articleuniteRoutes);

app.use("/articleDepot", articleDepotRoutes);

app.use("/entree", entreeRoutes);

app.use("/api/commandePlanifie", commandePlanifieRoutes);







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur", error: err.message });
});

