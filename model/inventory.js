module.exports = function(sequelize, DataTypes) {
  return sequelize.define("inventory", {
    inventoryData: DataTypes.STRING,
    inventoryCount: DataTypes.INTEGER,
    owner: DataTypes.INTEGER
  });
};
