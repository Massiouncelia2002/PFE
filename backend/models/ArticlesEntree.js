// models/ArticlesEntree.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ArticlesEntree = sequelize.define('ArticlesEntree', {
  codeArticle: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  codeEntree: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  quantiteEntree: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  commentaire: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'articlesEntree',
  
});

module.exports = ArticlesEntree;
