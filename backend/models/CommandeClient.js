const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CommandeClient = sequelize.define("CommandeClient", {
    codeCommande: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
        
    },
    dateCommande: {
        type: DataTypes.DATE,
        allowNull: false
    },
    codeClient: {
        type: DataTypes.STRING,  
        allowNull: false,
        references: {
            model: "clients",
            key: "codeClient"
        }
    }
}, {
    tableName: "commandeClients",
    timestamps: false
});

module.exports = CommandeClient;
