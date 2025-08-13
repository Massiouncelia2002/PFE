const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BonRetour = sequelize.define("BonRetour", {
  codeBonRetour: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  dateGeneration: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  quantiteRetourne: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
   codeBon: { 
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'BonLivraisons',
      key: 'codeBon'
    },
    },
    commandePlanifieId: {
  type: DataTypes.INTEGER,
  references: {
    model: "commandePlanifiees", 
    key: "commandePlanifieId"
  }
}
});

module.exports = BonRetour;
