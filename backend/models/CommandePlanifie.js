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
  commandePlanifieId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codeCommande: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
    references: {
      model: "commandeClients",
      key: "codeCommande"
    }
  },
  matricule: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
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
