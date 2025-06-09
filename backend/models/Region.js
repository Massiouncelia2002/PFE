const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Region = sequelize.define("Region", {
  regionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Region;
