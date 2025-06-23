const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { sequelize } = require("./models");

dotenv.config();

const app = express();

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '1mb' }));
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Fichiers statiques
app.use('/static', express.static(path.join(__dirname, 'client/public')));

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
const articleDepotRoutes = require('./routes/articleDepotRoutes');
const entreeRoutes = require("./routes/entreeRoutes");
const commandePlanifieRoutes = require("./routes/commandePlanifieRoutes");
const livraisonRoutes = require("./routes/livraisonRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const reapproRoutes = require("./routes/reapprovisionnementRoutes");






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


app.use("/articleDepot", articleDepotRoutes);

app.use("/entree", entreeRoutes);

app.use("/api/commandePlanifie", commandePlanifieRoutes);

app.use("/api/livraison", livraisonRoutes);

app.use('/api/prediction', predictionRoutes);

app.use("/api/reappro", reapproRoutes);







// Route 404 si la ressource n'existe pas
app.use((req, res, next) => {
  res.status(404).json({ message: "Ressource non trouvée" });
});

// Gestion centralisée des erreurs
app.use((err, req, res, next) => {
  console.error("❌ Erreur interne :", err);
  res.status(500).json({
    message: "Erreur interne du serveur",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log("✅ Connexion à la base de données réussie");
    return sequelize.sync(); // tu peux ajouter { alter: true } si tu veux dev auto
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ Échec de la connexion à la base de données :", error);
  });








// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const { sequelize } = require("./models");

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Fichiers statiques
// app.use('/static', express.static(path.join(__dirname, 'client/public')));

// // 🚫 SUPPRIMÉ : ancien sync mal placé
// // sequelize.sync() ...

// // Importation des routes
// const authRoutes = require("./routes/authRoutes");
// const utilisateurRoutes = require('./routes/utilisateurRoutes');
// const articleRoutes = require("./routes/articleRoutes");
// const familleRoutes = require("./routes/familleRoutes");
// const sousFamilleRoutes = require("./routes/sousFamilleRoutes");
// const depotRoutes = require("./routes/depot.routes");
// const clientRoutes = require('./routes/clientRoutes');
// const vehiculeRoutes = require("./routes/vehiculeRoutes");
// const commandeRoutes = require('./routes/commandeRoutes');
// const articleDepotRoutes = require('./routes/articleDepotRoutes');
// const entreeRoutes = require("./routes/entreeRoutes");
// const commandePlanifieRoutes = require("./routes/commandePlanifieRoutes");
// const predictionRoutes = require("./routes/predictionRoutes");
// const reapproRoutes = require("./routes/reapprovisionnementRoutes");

// // Définition des routes
// app.use("/api/auth", authRoutes);
// app.use('/utilisateur', utilisateurRoutes);
// app.use("/api/familles", familleRoutes);
// app.use("/api/sous-familles", sousFamilleRoutes);
// app.use("/api/articles", articleRoutes);
// app.use("/depot", depotRoutes);
// app.use("/client", clientRoutes);
// app.use("/vehicules", vehiculeRoutes);
// app.use("/api/commande", commandeRoutes);
// app.use("/articleDepot", articleDepotRoutes);
// app.use("/entree", entreeRoutes);
// app.use("/api/commandePlanifie", commandePlanifieRoutes);
// app.use('/api/prediction', predictionRoutes);
// app.use("/api/reappro", reapproRoutes);

// // Route 404
// app.use((req, res, next) => {
//   res.status(404).json({ message: "Ressource non trouvée" });
// });

// // Gestion des erreurs
// app.use((err, req, res, next) => {
//   console.error("❌ Erreur interne :", err);
//   res.status(500).json({
//     message: "Erreur interne du serveur",
//     error: process.env.NODE_ENV === "development" ? err.message : undefined,
//   });
// });

// // ✅ Connexion + synchronisation correcte
// sequelize.authenticate()
//   .then(() => {
//     console.log("✅ Connexion à la base de données réussie");

//     // 🔧 Ici on force la recréation des tables à partir des modèles (⚠️ en dev uniquement)
//     return sequelize.sync({ force: true });
//   })
//   .then(() => {
//     console.log("✅ Synchronisation des modèles terminée");

//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("❌ Échec de la connexion à la base de données :", error);
//   });
