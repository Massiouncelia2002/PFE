const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: DataTypes.ENUM("admin fonctionnel", "admin dept", "gestionnaire depot"),
    allowNull: false,
  },
});

module.exports = Role;
