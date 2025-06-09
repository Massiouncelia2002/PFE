const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AffectationDepot = sequelize.define('AffectationDepot', {
  codeUtilisateur: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  codeDepot: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Gestionnaire Dépôt', 'Admin Dépôt']]
    }
  }
}, {
  tableName: 'AffectationDepots',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['codeDepot', 'role'] // ❌ Empêche 2 utilisateurs d’avoir le même rôle sur le même dépôt
    }
  ]
});

module.exports = AffectationDepot;
