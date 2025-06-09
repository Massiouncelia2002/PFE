// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const UniteDeMesure = sequelize.define("UniteDeMesure", {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   nom: { type: DataTypes.STRING, allowNull: false },
//   type: { type: DataTypes.STRING, allowNull: false },
// }, {
//   tableName: "UniteDeMesure", 
// });

// module.exports = UniteDeMesure;






const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UniteDeMesure = sequelize.define("UniteDeMesure", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  nom: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  abreviation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: { // 'base' ou 'conditionnement'
    type: DataTypes.ENUM("base", "conditionnement"),
    allowNull: false
  },
}, {
  tableName: "UniteDeMesure",
  timestamps: false
});

module.exports = UniteDeMesure;
