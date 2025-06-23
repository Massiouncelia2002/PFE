// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const CommandePlanifie = sequelize.define("CommandePlanifie", {
//   codePlanification: {
//     type: DataTypes.STRING,
//     primaryKey: true,
//     unique: true
//   },
//   datePlanification: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW, 
//     allowNull: false
//   },
//   codeCommande: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     references: {
//       model: "commandeClients",
//       key: "codeCommande"
//     }
//   }
// }, {
//   tableName: "commandePlanifiees",
//   timestamps: false
// });

// module.exports = CommandePlanifie;











const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CommandePlanifie = sequelize.define("CommandePlanifie", {
  codeCommande: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "commandeClients",
      key: "codeCommande"
    }
  },
  codeVehicule: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "vehicules",
      key: "matricule"
    }
  },
  datePlanification: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  nbrVehicule: {
    type: DataTypes.INTEGER
  },
  quantiteTransporte: {
    type: DataTypes.FLOAT
  },
  datePrevue: {
    type: DataTypes.DATE
  },
  heurePrevue: {
    type: DataTypes.TIME
  },
  dureePrevue: {
    type: DataTypes.STRING
  },
  statutLivraison: {
  type: DataTypes.ENUM('en_cours', 'livre', 'annule', 'retourne'),
  allowNull: false,
  defaultValue: 'en_cours'
}
}, {
  tableName: "commandePlanifiees",
  timestamps: false
});

module.exports = CommandePlanifie;
