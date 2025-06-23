// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Article = sequelize.define("Article", {
  
//   codeArticle: { type: DataTypes.STRING,  unique: true, primaryKey: true, },
//   designation: { type: DataTypes.STRING, allowNull: false },
//   statut: { type: DataTypes.BOOLEAN, allowNull: false },
  
  
// });

// module.exports = Article;



// models/Article.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Article = sequelize.define("Article", {
  codeArticle: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uniteStockage: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Palette", // Stockage unique
  }
});

module.exports = Article;
