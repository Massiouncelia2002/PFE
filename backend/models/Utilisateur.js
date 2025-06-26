
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const Utilisateur = sequelize.define("Utilisateur", {
  codeUtilisateur: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 50],
        msg: "Le code utilisateur doit contenir entre 3 et 50 caractères"
      },
      notEmpty: {
        msg: "Le code utilisateur est obligatoire"
      }
    }
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
      },
      len: {
        args: [2, 50],
        msg: "Le nom doit contenir entre 2 et 50 caractères"
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
      },
      len: {
        args: [2, 50],
        msg: "Le prénom doit contenir entre 2 et 50 caractères"
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
      },
      len: {
        args: [5, 100],
        msg: "L'email doit contenir entre 5 et 100 caractères"
      }
    }
  },
  mdp: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 100],
        msg: "Le mot de passe doit contenir entre 8 et 100 caractères"
      },
      notEmpty: {
        msg: "Le mot de passe est obligatoire"
      }
    }
  },
  posteTravail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[a-zA-Z\s]*$/,
        msg: 'Le poste de travail ne doit contenir que des lettres et des espaces.',
      },
      len: {
        args: [0, 100],
        msg: "Le poste de travail ne doit pas dépasser 100 caractères"
      }
    }
  },
  brancheFonction: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[a-zA-Z\s]*$/,
        msg: 'La branche fonctionnelle ne doit contenir que des lettres et des espaces.',
      },
      len: {
        args: [0, 100],
        msg: "La branche fonctionnelle ne doit pas dépasser 100 caractères"
      }
    }
  },
  dateCreation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: {
        msg: "La date de création doit être une date valide"
      }
    }
  },
dateFin: {
  type: DataTypes.DATE,
  allowNull: true,
  validate: {
    isDate: {
      msg: "La date de fin doit être une date valide"
    },
    isAfterCreationEtMoins30Ans(value) {
      if (value && this.dateCreation) {
        const creation = new Date(this.dateCreation);
        const fin = new Date(value);
        const maxDate = new Date(creation);
        maxDate.setFullYear(maxDate.getFullYear() + 30);

        if (fin <= creation) {
          throw new Error("La date de fin doit être postérieure à la date de création.");
        }

        if (fin > maxDate) {
          throw new Error("La date de fin ne peut pas dépasser 30 ans après la date de création.");
        }
      }
    }
  }
},

  statut: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    validate: {
      isBoolean: {
        msg: "Le statut doit être un booléen"
      }
    }
  },
  role: {
    type: DataTypes.ENUM("Admin Fonctionnel", "Planificateur", "Admin Dépôt"),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Le rôle est obligatoire"
      },
      isIn: {
        args: [["Admin Fonctionnel", "Planificateur", "Admin Dépôt"]],
        msg: "Rôle invalide"
      }
    }
  }
}, {
  hooks: {
    beforeSave: async (utilisateur) => {
      // Validation du rôle
      const rolesValides = ["Admin Fonctionnel", "Planificateur", "Admin Dépôt"];
      if (!rolesValides.includes(utilisateur.role)) {
        throw new Error("Rôle invalide");
      }

      if (utilisateur.dateFin) {
        utilisateur.statut = false;
      }

      if (utilisateur.changed('mdp') && utilisateur.mdp) {
        const salt = await bcrypt.genSalt(10);
        utilisateur.mdp = await bcrypt.hash(utilisateur.mdp, salt);
      }
    }
  },
  timestamps: false,
  indexes: [
    {
      fields: ['role']
    },
    {
      fields: ['email'],
      unique: true
    }
  ]
});

module.exports = Utilisateur;