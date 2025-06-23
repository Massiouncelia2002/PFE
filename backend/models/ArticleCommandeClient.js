// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const ArticleCommandeClient = sequelize.define("ArticleCommandeClient", {
//   codeCommande: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     primaryKey: true,
//     references: {
//       model: "commandeClients",
//       key: "codeCommande"
//     }
//   },
//   codeArticle: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     primaryKey: true,
//     references: {
//       model: "Articles",
//       key: "codeArticle"
//     }
//   },
//   quantiteDemandee: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   }
// }, {
//   tableName: "articlesCommandeClient",
//   timestamps: false
// });

// module.exports = ArticleCommandeClient;










const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ArticleCommandeClient = sequelize.define("ArticleCommandeClient", {
  codeCommande: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "commandeClients",
      key: "codeCommande"
    }
  },
  codeArticle: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "Articles",
      key: "codeArticle"
    }
  },
  quantiteDemandee: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // quantiteALivrer: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  //   defaultValue: null
  // }
}, {
  tableName: "articlesCommandeClient",
  timestamps: false
});

module.exports = ArticleCommandeClient;
