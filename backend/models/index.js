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
const CommandePlanifie = require("./CommandePlanifie");
const CommandeVehicule = require("./CommandeVehicule");
const ArticlesEntree = require("./ArticlesEntree");


const db = { sequelize, Utilisateur, Depot, AffectationDepot, Vehicule, Famille, SousFamille, Article, Client, CommandeClient, ArticleCommandeClient, UniteDeMesure, ArticleUnite, ArticleDepot, Entree ,CommandePlanifie, CommandeVehicule, ArticlesEntree};





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




// Association entre Utilisateur et AffectationDepot
Utilisateur.hasMany(AffectationDepot, { foreignKey: "codeUtilisateur" });
AffectationDepot.belongsTo(Utilisateur, { foreignKey: "codeUtilisateur" });

// Association entre Depot et AffectationDepot
Depot.hasMany(AffectationDepot, { foreignKey: "codeDepot" });
AffectationDepot.belongsTo(Depot, { foreignKey: "codeDepot" });







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
  otherKey: "codeDepot",
  as: "depots"
});

Depot.belongsToMany(Article, {
  through: ArticleDepot,
  foreignKey: "codeDepot",
  otherKey: "codeArticle",
  as: "articles"
});



// // Relation Article - Entree
// Article.hasMany(Entree, { foreignKey: "codeArticle" });
// Entree.belongsTo(Article, { foreignKey: "codeArticle" });

// // Relation Depot - Entree
// Depot.hasMany(Entree, { foreignKey: "codeDepot" });
// Entree.belongsTo(Depot, { foreignKey: "codeDepot" });





// Associations N:N entre Article et Entree via ArticlesEntree
// Many-to-Many: Article ↔ Entree via ArticlesEntree
Article.belongsToMany(Entree, {
  through: 'articlesEntree', // ou le modèle si tu l'importes : ArticlesEntree
  foreignKey: 'codeArticle',
  otherKey: 'codeEntree',
  as: 'entrees',
});

Entree.belongsToMany(Article, {
  through: 'articlesEntree',
  foreignKey: 'codeEntree',
  otherKey: 'codeArticle',
  as: 'articles',
});

// Relations directes utiles
ArticlesEntree.belongsTo(Article, { foreignKey: "codeArticle" });
ArticlesEntree.belongsTo(Entree, { foreignKey: "codeEntree" });

Article.hasMany(ArticlesEntree, { foreignKey: "codeArticle" });
Entree.hasMany(ArticlesEntree, { foreignKey: "codeEntree" });


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
