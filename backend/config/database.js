//imene

// const { Sequelize } = require("sequelize");
// const dotenv = require("dotenv");

// dotenv.config();

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   logging: false,
//   dialectOptions: {
//     ssl: process.env.NODE_ENV === "production" ? { require: true, rejectUnauthorized: false } : false,
//   },
// });

// sequelize.authenticate()
//   .then(() => console.log(" Connexion à la base de données réussie."))
//   .catch((err) => console.error(" Erreur de connexion à la base de données :", err));

// module.exports = sequelize;





// celia

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: false
});

module.exports = sequelize;
