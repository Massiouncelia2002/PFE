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
    type: DataTypes.ENUM('disponible', 'en_mission', 'en_panne', 'en_maintenance'),
    allowNull: false,
    defaultValue: 'disponible'
  }
}, {
  tableName: "vehicules",
  timestamps: false
});

module.exports = Vehicule;
