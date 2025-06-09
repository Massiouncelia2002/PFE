const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Depot = sequelize.define("Depot", {
    codeDepot: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nomDepot: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeDepot: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capaciteDepot: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true  
    },
    region: {
    type: DataTypes.STRING,
    allowNull: false
    },
    wilaya: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "depots",
    timestamps: false 
  });

  
  module.exports = Depot;




