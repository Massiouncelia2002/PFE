// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const bcrypt = require("bcryptjs");



// const Utilisateur = sequelize.define("Utilisateur", {
//   idUtilisateur: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   codeUtilisateur: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   nom: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   prenom: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   mdp: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   posteTravail: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   brancheFonction: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   dateCreation: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   dateFin: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   statut: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true,
//   },
//   role: {
//     type: DataTypes.ENUM("Admin Fonctionnel", "Gestionnaire Dépôt", "Admin Dépôt"),
//     allowNull: false,
//   },
// }, {
//   hooks: {
//     beforeSave: async (utilisateur) => {
//       if (utilisateur.dateFin) {
//         utilisateur.statut = false;
//       }

//       if (utilisateur.mdp) {
//         const salt = await bcrypt.genSalt(10);
//         utilisateur.mdp = await bcrypt.hash(utilisateur.mdp, salt);
//       }
//     }
//   },
//   timestamps: false
// });

// module.exports = Utilisateur;







// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const bcrypt = require("bcryptjs");

// const Utilisateur = sequelize.define("Utilisateur", {
//   codeUtilisateur: {
//     type: DataTypes.STRING,
//     primaryKey: true, 
//     allowNull: false,
//     unique: true,
//   },
//   nom: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   prenom: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   mdp: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   posteTravail: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   brancheFonction: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   dateCreation: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   dateFin: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   statut: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true,
//   },
//   role: {
//     type: DataTypes.ENUM("Admin Fonctionnel", "Gestionnaire Dépôt", "Admin Dépôt"),
//     allowNull: false,
//   },
// }, {
//   hooks: {
//     beforeSave: async (utilisateur) => {
//       if (utilisateur.dateFin) {
//         utilisateur.statut = false;
//       }

//       if (utilisateur.mdp) {
//         const salt = await bcrypt.genSalt(10);
//         utilisateur.mdp = await bcrypt.hash(utilisateur.mdp, salt);
//       }
//     }
//   },
//   timestamps: false
// });

// module.exports = Utilisateur;





   





const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const Utilisateur = sequelize.define("Utilisateur", {
  codeUtilisateur: {
    type: DataTypes.STRING,
    primaryKey: true, 
    allowNull: false,
    unique: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: {
        msg: "Le nom ne doit contenir que des lettres"
      },
      notEmpty: {
        msg: "Le nom est obligatoire"
      }
    }
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: {
        msg: "Le prénom ne doit contenir que des lettres"
      },
      notEmpty: {
        msg: "Le prénom est obligatoire"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "L'adresse email doit être valide"
      },
      notEmpty: {
        msg: "L'email est obligatoire"
      }
    }
  },
  mdp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  posteTravail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[a-zA-Z\s]*$/, 
        msg: 'Le poste de travail ne doit contenir que des lettres et des espaces.',
      },
    },
  },
  brancheFonction: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[a-zA-Z\s]*$/, 
        msg: 'Le poste de travail ne doit contenir que des lettres et des espaces.',
      },
    },
  },
  dateCreation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  dateFin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  statut: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  role: {
    type: DataTypes.ENUM("Admin Fonctionnel", "Gestionnaire Dépôt", "Admin Dépôt"),
    allowNull: false,
  },

}, {
  hooks: {
    beforeSave: async (utilisateur) => {
      if (utilisateur.dateFin) {
        utilisateur.statut = false;
      }

      if (utilisateur.mdp) {
        const salt = await bcrypt.genSalt(10);
        utilisateur.mdp = await bcrypt.hash(utilisateur.mdp, salt);
      }
    }
  },
  timestamps: false
});

module.exports = Utilisateur;

