const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Entree = sequelize.define("Entree", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  codeArticle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  codeDepot: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantiteEntree: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dateEntree: {
    type: DataTypes.DATE,
    allowNull: false 
  },
  commentaire: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "entrees",
  timestamps: false
});

module.exports = Entree;
