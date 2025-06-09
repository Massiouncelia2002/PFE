const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Client = sequelize.define("Client", {
  codeClient: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nomClient: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telType: {  
    type: DataTypes.STRING, 
    allowNull: false,  
    defaultValue: 'cellulaire',  
  },
  codeDepot: {
    type: DataTypes.STRING,  
    allowNull: false,
    references: {
      model: 'depots',      
      key: 'codeDepot'
    }
  }
},{
  tableName: "clients", 
  timestamps: false     
});

module.exports = Client;
