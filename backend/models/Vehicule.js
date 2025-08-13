// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Vehicule = sequelize.define("Vehicule", {
//     matricule: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       primaryKey: true
//     },
//     // typeVehicule: {
//     //   type: DataTypes.STRING,
//     //   allowNull: false
//     // },
//     capaciteVehicule: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     statut: {
//       type: DataTypes.STRING,
//       allowNull: true
//     },
    
//   }, {
//     tableName: "vehicules",
//     timestamps: false 
//   });


  
//   module.exports = Vehicule;




const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vehicule = sequelize.define("Vehicule", {
  matricule: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  capaciteVehicule: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  statut: {
    type: DataTypes.ENUM('disponible', 'non_disponible'),
    allowNull: false,
    defaultValue: 'disponible'
  },
  codeDepot: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "depots", // nom de la table liée
      key: "codeDepot"
    }
    }
}, {
  tableName: "vehicules",
  timestamps: false
});

module.exports = Vehicule;
