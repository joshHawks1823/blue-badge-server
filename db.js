const Sequelize = require("sequelize");

const sequelize = new Sequelize("inventory-database", "postgres", "password", {
  host: "localhost",
  dialect: "postgres"
});

sequelize.authenticate().then(
  function() {
    console.log("Connected to inventory-database postgres database");
  },
  function(err) {
    console.log(err);
  }
);

module.exports = sequelize;
