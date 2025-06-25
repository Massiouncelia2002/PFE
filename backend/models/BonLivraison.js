const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BonLivraison = sequelize.define("BonLivraison", {
  codeBon: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  dateGeneration: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  codeCommande: {
    type: DataTypes.STRING,
    allowNull: false
  },
  matricule: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = BonLivraison;
