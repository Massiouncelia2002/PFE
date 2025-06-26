

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
    defaultValue: "Palette",
  }
});

module.exports = Article;
