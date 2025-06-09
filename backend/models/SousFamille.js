// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Famille = require("./Famille");

// const SousFamille = sequelize.define("SousFamille", {
//   idSousFamille: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   nomSousFamille: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   codeSousFamille: {
//     type: DataTypes.STRING,
//     unique: true,
//   },
//   idFamille: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: "Familles",
//       key: "idFamille",
//     },
//   },
// }, {
//   hooks: {
//     afterCreate: async (sousFamille) => {
//       const famille = await Famille.findByPk(sousFamille.idFamille); 
//       if (famille) {
//         const nomFamille = famille.nomFamille.replace(/\s+/g, '').toUpperCase();
//         const nomSous = sousFamille.nomSousFamille.replace(/\s+/g, '').toUpperCase();
//         const code = `SF-${sousFamille.idSousFamille}-${nomFamille}-${nomSous}`;
//         await sousFamille.update({ codeSousFamille: code });
//       }
//     },
//   },
// });

// module.exports = SousFamille;













const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Famille = require("./Famille");

const SousFamille = sequelize.define("SousFamille", {
  codeSousFamille: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  nomSousFamille: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codeFamille: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Familles",
      key: "codeFamille",
    },
  },
}, {
  hooks: {
    beforeCreate: async (sousFamille) => {
      const famille = await Famille.findByPk(sousFamille.codeFamille);
      if (famille) {
        const nomFamille = famille.nomFamille.replace(/\s+/g, '').toUpperCase();
        const nomSous = sousFamille.nomSousFamille.replace(/\s+/g, '').toUpperCase();

        let code;
        let exists = true;

        while (exists) {
          const randomNumber = String(Math.floor(100 + Math.random() * 900)); // 3 chiffres
          code = `SF-${randomNumber}-${nomFamille}-${nomSous}`;
          const found = await SousFamille.findOne({ where: { codeSousFamille: code } });
          exists = !!found;
        }

        sousFamille.codeSousFamille = code;
      } else {
        throw new Error("Famille introuvable avec le code fourni.");
      }
    },
  },
  timestamps: false,
});

module.exports = SousFamille;
