const sequelize = require("../config/database");

const Utilisateur = require("./Utilisateur");
const Region = require("./Region");
const Article = require("./Article");
const Famille = require("./Famille");
const SousFamille = require("./SousFamille");
const Depot = require("./Depot");
const AffectationDepot = require("./AffectationDepot");
const Client = require("./Client");
const Vehicule = require("./Vehicule");
const CommandeClient = require("./CommandeClient");
const ArticleCommandeClient = require("./ArticleCommandeClient");
const UniteDeMesure = require("./UniteDeMesure");
const ArticleUnite = require("./ArticleUnite");
const ArticleDepot = require("./ArticleDepot");
const Entree = require("./Entree");
const CommandePlanifie = require("./CommandePlanifie")
const CommandeVehicule = require("./CommandeVehicule")


const db = { sequelize, Utilisateur, Depot, AffectationDepot, Vehicule, Famille, SousFamille, Article, Client, CommandeClient, ArticleCommandeClient, UniteDeMesure, ArticleUnite, ArticleDepot, Entree ,CommandePlanifie, CommandeVehicule};





// Famille - SousFamille
Famille.hasMany(SousFamille, {
  foreignKey: "codeFamille",
});
SousFamille.belongsTo(Famille, {
  foreignKey: "codeFamille",
});

// Famille - Article
Famille.hasMany(Article, {
  foreignKey: "codeFamille",
  
});
Article.belongsTo(Famille, {
  foreignKey: "codeFamille",
  as: "famille", 
});

// SousFamille - Article
SousFamille.hasMany(Article, {
  foreignKey: "codeSousFamille",
});
Article.belongsTo(SousFamille, {
  foreignKey: "codeSousFamille",
  as: "sousFamille",
});




// // utilisateur et depot
// Utilisateur.hasMany(Depot, { foreignKey: 'codeUtilisateur', as: 'depots' });
// Depot.belongsTo(Utilisateur, { foreignKey: 'codeUtilisateur', as: 'utilisateur' });

// un depot peux avoir deux utilisateur de roles differents 

// Utilisateur.js
Utilisateur.belongsToMany(Depot, {
  through: AffectationDepot,
  foreignKey: 'codeUtilisateur',
  otherKey: 'codeDepot',
  as: 'depots'
});

// Depot.js
Depot.belongsToMany(Utilisateur, {
  through: AffectationDepot,
  foreignKey: 'codeDepot',
  otherKey: 'codeUtilisateur',
  as: 'utilisateurs'
});







// Client - Depot
Depot.hasMany(Client, { foreignKey: 'codeDepot' });
Client.belongsTo(Depot, { foreignKey: 'codeDepot'});



// Un client peut avoir plusieurs commandes
Client.hasMany(CommandeClient, {
  foreignKey: "codeClient",
  as: "commandes"
});
// Une commande appartient à un seul client
CommandeClient.belongsTo(Client, {
  foreignKey: "codeClient",
  as: "client"
});



// Relation CommandeClient <--> Article via ArticleCommandeClient
CommandeClient.belongsToMany(Article, {
  through: ArticleCommandeClient,
  foreignKey: "codeCommande",
  otherKey: "codeArticle",
  as: "articles"
});

Article.belongsToMany(CommandeClient, {
  through: ArticleCommandeClient,
  foreignKey: "codeArticle",
  otherKey: "codeCommande",
  as: "commandes"
});


// ArticleCommandeClient appartient à CommandeClient
ArticleCommandeClient.belongsTo(CommandeClient, {
  foreignKey: 'codeCommande',
  targetKey: 'codeCommande',
  as: 'commande'
});

// ArticleCommandeClient appartient à Article
ArticleCommandeClient.belongsTo(Article, {
  foreignKey: 'codeArticle',
  targetKey: 'codeArticle',
  as: 'article'
});

// // Associations directes pour permettre les includes
// ArticleCommandeClient.belongsTo(Article, { foreignKey: 'codeArticle' });
// ArticleCommandeClient.belongsTo(CommandeClient, { foreignKey: 'codeCommande' });


// // Article - UniteDeMesure (unité de base)
// UniteDeMesure.hasMany(Article, { foreignKey: "idUniteDeBase" });
// Article.belongsTo(UniteDeMesure, { foreignKey: "idUniteDeBase", as: "uniteDeBase" });

// // Article - Conditionnements
// Article.hasMany(ConditionnementArticle, { foreignKey: "codeArticle", as: "conditionnements" });
// ConditionnementArticle.belongsTo(Article, { foreignKey: "codeArticle", as: "article" });

// // Chaque niveau de conditionnement peut aussi avoir une unité de mesure
// UniteDeMesure.hasMany(ConditionnementArticle, { foreignKey: "idUnite" });
// ConditionnementArticle.belongsTo(UniteDeMesure, { foreignKey: "idUnite", as: "unite" });



// // Associations
// Article.belongsToMany(UniteDeMesure, { through: ArticleUnite, foreignKey: "codeArticle", otherKey: "idUnite" });
// UniteDeMesure.belongsToMany(Article, { through: ArticleUnite, foreignKey: "idUnite", otherKey: "codeArticle" });

// // Si tu veux récupérer ArticleUnite en tant que modèle complet :
// Article.hasMany(ArticleUnite, { foreignKey: "codeArticle" });
// ArticleUnite.belongsTo(Article, { foreignKey: "codeArticle" });

// UniteDeMesure.hasMany(ArticleUnite, { foreignKey: "idUnite" });
// ArticleUnite.belongsTo(UniteDeMesure, { foreignKey: "idUnite" });


Article.belongsToMany(UniteDeMesure, {
  through: ArticleUnite,
  foreignKey: "articleCode",
  otherKey: "uniteId"
});

UniteDeMesure.belongsToMany(Article, {
  through: ArticleUnite,
  foreignKey: "uniteId",
  otherKey: "articleCode"
});

Article.hasMany(ArticleUnite, { foreignKey: "articleCode" });
ArticleUnite.belongsTo(Article, { foreignKey: "articleCode" });

UniteDeMesure.hasMany(ArticleUnite, { foreignKey: "uniteId" });
ArticleUnite.belongsTo(UniteDeMesure, { foreignKey: "uniteId" });





// Associations plusieurs-à-plusieurs via ArticleDepot
Article.belongsToMany(Depot, {
  through: ArticleDepot,
  foreignKey: "codeArticle",
  otherKey: "codeDepot"
});

Depot.belongsToMany(Article, {
  through: ArticleDepot,
  foreignKey: "codeDepot",
  otherKey: "codeArticle"
});



// Relation Article - Entree
Article.hasMany(Entree, { foreignKey: "codeArticle" });
Entree.belongsTo(Article, { foreignKey: "codeArticle" });

// Relation Depot - Entree
Depot.hasMany(Entree, { foreignKey: "codeDepot" });
Entree.belongsTo(Depot, { foreignKey: "codeDepot" });






// Relation 1:N — CommandeClient → CommandePlanifie
CommandeClient.hasMany(CommandePlanifie, {
  foreignKey: "codeCommande",
  sourceKey: "codeCommande"
});
CommandePlanifie.belongsTo(CommandeClient, {
  foreignKey: "codeCommande",
  targetKey: "codeCommande"
});

// Relation N:N — CommandePlanifie ↔ Vehicule via CommandeVehicule
CommandePlanifie.belongsToMany(Vehicule, {
  through: CommandeVehicule,
  foreignKey: "codePlanification",
  otherKey: "matricule"
});
Vehicule.belongsToMany(CommandePlanifie, {
  through: CommandeVehicule,
  foreignKey: "matricule",
  otherKey: "codePlanification"
});


// Pour accéder aux données supplémentaires, on peut aussi déclarer belongsTo dans CommandeVehicule

// CommandeVehicule.belongsTo(CommandePlanifie, { foreignKey: 'codePlanifie', as: 'commandePlanifie' });
// CommandeVehicule.belongsTo(Vehicule, { foreignKey: 'codeVehicule', as: 'vehicule' });

// CommandePlanifie.hasMany(CommandeVehicule, { foreignKey: 'codePlanifie', as: 'commandeVehicules' });
// Vehicule.hasMany(CommandeVehicule, { foreignKey: 'codeVehicule', as: 'commandeVehicules' });



module.exports = db;
