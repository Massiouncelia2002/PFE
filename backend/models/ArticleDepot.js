const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ArticleDepot = sequelize.define("ArticleDepot", {
  codeArticle: {
    type: DataTypes.STRING,
    primaryKey: true,
    references: {
      model: "Articles",
      key: "codeArticle"
    }
  },
  codeDepot: {
    type: DataTypes.STRING,
    primaryKey: true,
    references: {
      model: "depots",
      key: "codeDepot"
    }
  },
  quantiteStockee: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stockMax: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stockAlert: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: "articleDepot",
  timestamps: false,


});

module.exports = ArticleDepot;
