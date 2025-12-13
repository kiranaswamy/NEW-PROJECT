const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connections");

const Expense = sequelize.define("Expense", {
   id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true,
    },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Expense;
