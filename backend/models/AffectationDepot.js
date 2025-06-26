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
  roleDepot: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Planificateur', 'Admin Dépôt']]
    }
  }
}, {

  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['codeDepot', 'roleDepot'] // ❌ Empêche 2 utilisateurs d’avoir le même rôle sur le même dépôt
    }
  ]
});

module.exports = AffectationDepot;
