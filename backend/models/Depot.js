// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Depot = sequelize.define("Depot", {
//     codeDepot: {
//       type: DataTypes.STRING,
//       primaryKey: true
//     },
//     nomDepot: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     typeDepot: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     capaciteDepot: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true  
//     },
//     region: {
//     type: DataTypes.STRING,
//     allowNull: false
//     },
//     wilaya: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   }, {
//     tableName: "depots",
//     timestamps: false 
//   });

  
//   module.exports = Depot;








const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Depot = sequelize.define("Depot", {
    codeDepot: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nomDepot: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le nom du dépôt est obligatoire"
        },
        notEmpty: {
          msg: "Le nom du dépôt ne peut pas être vide"
        },
        len: {
          args: [1, 255],
          msg: "Le nom du dépôt doit contenir entre 1 et 255 caractères"
        },
        containsLetter(value) {
          if (!/[a-zA-Z]/.test(value)) {
            throw new Error("Le nom du dépôt doit contenir au moins une lettre");
          }
        }
      }
    },
    typeDepot: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le type de dépôt est obligatoire"
        },
        notEmpty: {
          msg: "Le type de dépôt ne peut pas être vide"
        }
      }
    },
    capaciteDepot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La capacité du dépôt est obligatoire"
        },
        isPositive(value) {
          if (value <= 0) {
            throw new Error("La capacité du dépôt doit être une valeur positive strictement");
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true  
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La région est obligatoire"
        },
        notEmpty: {
          msg: "La région ne peut pas être vide"
        }
      }
    },
    wilaya: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La wilaya est obligatoire"
        },
        notEmpty: {
          msg: "La wilaya ne peut pas être vide"
        }
      }
    }
  }, {
    tableName: "depots",
    timestamps: false 
  });

module.exports = Depot;