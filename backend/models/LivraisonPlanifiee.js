const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LivraisonPlanifiee = sequelize.define("LivraisonPlanifiee", {
  codePlanification: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "commandePlanifiees",
      key: "codePlanification"
    },
    primaryKey: true
  },
  matricule: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "vehicules",
      key: "matricule"
    },
    primaryKey: true
  },
  quantiteTransportee: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dateDepartPrevue: {
    type: DataTypes.DATE,
    allowNull: false
  },
  heureDepartPrevue: {
    type: DataTypes.TIME,
    allowNull: false
  },
  dateRetourPrevue: {
    type: DataTypes.DATE,
    allowNull: true
  },
  heureRetourPrevue: {
    type: DataTypes.TIME,
    allowNull: true
  },
  statutLivraison: {
    type: DataTypes.ENUM("prévue", "en_cours", "livrée", "retard", "annulée"),
    allowNull: false,
    defaultValue: "prévue"
  }
}, {
  tableName: "livraisonsPlanifiees",
  timestamps: false
});

module.exports = LivraisonPlanifiee;
