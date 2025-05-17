const { Sequelize } = require("sequelize");
const {
  Host,
  Database_name,
  Database_user,
  Database_password,
  Port_number,
} = require("../credentials");

// Initialize Sequelize instance using credentials.js
const sequelize = new Sequelize(
  Database_name,
  Database_user,
  Database_password,
  {
    host: Host,
    port: Port_number,
    dialect: "mysql",
    logging: false,
  }
);

// Object to hold database instance and models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Admin = require("./admin")(sequelize, Sequelize);
db.Slider = require("./slider")(sequelize, Sequelize);
db.Contact = require("./contact")(sequelize, Sequelize);

// Sync models with the database
sequelize
  .sync({ alter: false }) // Use alter: true during dev to auto-update DB structure
  .then(() => {
    console.log("Database & tables synced successfully!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

module.exports = db;
