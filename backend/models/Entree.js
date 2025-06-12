// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Entree = sequelize.define("Entree", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   codeArticle: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   codeDepot: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   quantiteEntree: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   dateEntree: {
//     type: DataTypes.DATE,
//     allowNull: false 
//   },
//   commentaire: {
//     type: DataTypes.STRING,
//     allowNull: true
//   }
// }, {
//   tableName: "entrees",
//   timestamps: false
// });

// module.exports = Entree;



const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Entree = sequelize.define("Entree", {
  codeEntree: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  dateEntree: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  codeDepot: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "entrees",
  timestamps: false
});

module.exports = Entree;
