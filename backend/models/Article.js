const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Article = sequelize.define("Article", {
  
  codeArticle: { type: DataTypes.STRING,  unique: true, primaryKey: true, },
  designation: { type: DataTypes.STRING, allowNull: false },
  statut: { type: DataTypes.BOOLEAN, allowNull: false },
  
  
});

module.exports = Article;
