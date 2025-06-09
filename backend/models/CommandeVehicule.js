const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CommandeVehicule = sequelize.define("CommandeVehicule", {
  codePlanification: {
    type: DataTypes.STRING,
    primaryKey:true,
    allowNull: false,
    references: {
      model: "commandePlanifiees",
      key: "codePlanification"
    }
  },
  matricule: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true,
    references: {
      model: "vehicules",
      key: "matricule"
    }
  },
  quantiteTransporte: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "commandeVehicules",
  timestamps: false
});

module.exports = CommandeVehicule;
