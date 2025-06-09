const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CommandePlanifie = sequelize.define("CommandePlanifie", {
  codePlanification: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true
  },
  datePlanification: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
    allowNull: false
  },
  codeCommande: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "commandeClients",
      key: "codeCommande"
    }
  }
}, {
  tableName: "commandePlanifiees",
  timestamps: false
});

module.exports = CommandePlanifie;
