const sequelize = require("../config/database");

const Utilisateur = require("./Utilisateur");
const Article = require("./Article");
const Famille = require("./Famille");
const SousFamille = require("./SousFamille");
const Depot = require("./Depot");
const AffectationDepot = require("./AffectationDepot");
const Client = require("./Client");
const Vehicule = require("./Vehicule");
const CommandeClient = require("./CommandeClient");
const ArticleCommandeClient = require("./ArticleCommandeClient");
const ArticleDepot = require("./ArticleDepot");
const Entree = require("./Entree");
const CommandePlanifie = require("./CommandePlanifie");
const LivraisonPlanifiee = require("./LivraisonPlanifiee");
const ArticlesEntree = require("./ArticlesEntree");


const db = { sequelize, Utilisateur, Depot, AffectationDepot, Vehicule, Famille, SousFamille, Article, Client, CommandeClient, ArticleCommandeClient, ArticleDepot, Entree ,CommandePlanifie, LivraisonPlanifiee, ArticlesEntree};





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

CommandeClient.hasMany(ArticleCommandeClient, {
  foreignKey: "codeCommande",
  as: "articlesCommandes"
});



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



Article.belongsToMany(Entree, {
  through: ArticlesEntree,
  foreignKey: 'codeArticle',
  otherKey: 'codeEntree',
  as: 'entrees',
});

Entree.belongsToMany(Article, {
  through: ArticlesEntree,
  foreignKey: 'codeEntree',
  otherKey: 'codeArticle',
  as: 'articles',
});
// Relations directes utiles
ArticlesEntree.belongsTo(Article, { foreignKey: "codeArticle" });
ArticlesEntree.belongsTo(Entree, { foreignKey: "codeEntree" });

Article.hasMany(ArticlesEntree, { foreignKey: "codeArticle" });
Entree.hasMany(ArticlesEntree, { foreignKey: "codeEntree" });


// // Relation 1:N — CommandeClient → CommandePlanifie
// CommandeClient.hasMany(CommandePlanifie, {
//   foreignKey: "codeCommande",
//   sourceKey: "codeCommande"
// });
// CommandePlanifie.belongsTo(CommandeClient, {
//   foreignKey: "codeCommande",
//   targetKey: "codeCommande"
// });



//commandeClient et Vehicule via commandePlanifie 

CommandeClient.hasMany(CommandePlanifie, {
  foreignKey: "codeCommande"
});
CommandePlanifie.belongsTo(CommandeClient, {
  foreignKey: "codeCommande"
});


Vehicule.hasMany(CommandePlanifie, {
  foreignKey: "matricule"
});
CommandePlanifie.belongsTo(Vehicule, {
  foreignKey: "matricule"
});





// // Une commande planifiée a plusieurs livraisons planifiées
// CommandePlanifie.hasMany(LivraisonPlanifiee, {
//   foreignKey: 'codePlanification'
// });
// LivraisonPlanifiee.belongsTo(CommandePlanifie, {
//   foreignKey: 'codePlanification'
// });

// // Un véhicule peut être affecté à plusieurs livraisons planifiées
// Vehicule.hasMany(LivraisonPlanifiee, {
//   foreignKey: 'matricule'
// });
// LivraisonPlanifiee.belongsTo(Vehicule, {
//   foreignKey: 'matricule'
// });






module.exports = db;
