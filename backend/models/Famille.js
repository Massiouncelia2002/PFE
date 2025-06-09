// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Famille = sequelize.define("Famille", {
//   idFamille: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   nomFamille: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   codeFamille: {
//     type: DataTypes.STRING,
//     unique: true,
//   },
// }, {
//   hooks: {
//     afterCreate: async (famille) => {
//       const code = `F-${famille.idFamille}-${famille.nomFamille.replace(/\s+/g, '').toUpperCase()}`;
//       await famille.update({ codeFamille: code });
//     },
//   },
// });

// module.exports = Famille;





const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Famille = sequelize.define("Famille", {
  codeFamille: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  nomFamille: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (famille) => {
      const nom = famille.nomFamille.replace(/\s+/g, '').toUpperCase();
      let code;
      let exists = true;

      // Boucle jusqu'à trouver un code non utilisé
      while (exists) {
        const randomNumber = String(Math.floor(100 + Math.random() * 900)); // 3 chiffres aléatoires
        code = `F-${randomNumber}-${nom}`;
        const found = await Famille.findOne({ where: { codeFamille: code } });
        exists = !!found;
      }

      famille.codeFamille = code;
    },
  },
  timestamps: false,
});

module.exports = Famille;
