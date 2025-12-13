const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connections');

const User = sequelize.define(
  'User',
  { 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull:true,
      unique:true
    },
     password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalExpense: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    },
     resetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetTokenExpiry: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    isPremiumUser: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
}
  },
  
);

module.exports = User