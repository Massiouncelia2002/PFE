// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const ArticleUnite = sequelize.define("ArticleUnite", {
//   articleCode: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     references: {
//       model: "Articles",
//       key: "codeArticle"
//     },
//     primaryKey: true,
//   },
//   uniteId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: "UniteDeMesure",
//       key: "id"
//     },
//     primaryKey: true,
//   },
//   facteur: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
 
//   typeConversion: { type: DataTypes.ENUM("multiplication", "division"), defaultValue: "multiplication" },
//   estUniteDeBase: { 
//     type: DataTypes.BOOLEAN, 
//     defaultValue: false }
// }, {
//   timestamps: false,
//   tableName: "ArticleUnite"
// });

// module.exports = ArticleUnite;












const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ArticleUnite = sequelize.define("ArticleUnite", {
  articleCode: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Articles",  
      key: "codeArticle"
    },
    primaryKey: true,
  },
  uniteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "UniteDeMesure",
      key: "id"
    },
    primaryKey: true,
  },
  facteur: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  typeConversion: {
    type: DataTypes.ENUM("multiplication", "division"),
    defaultValue: "multiplication",
    allowNull: false
  },
  estUniteDeBase: { 
    type: DataTypes.BOOLEAN, 
    allowNull: false, 
    defaultValue: false 
  }
}, {
  tableName: "ArticleUnite",
  timestamps: false
});

module.exports = ArticleUnite;
