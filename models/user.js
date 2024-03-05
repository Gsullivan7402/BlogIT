const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
  // Define attributes like username, email, password
}, {
  sequelize,
  hooks: {
    // Add beforeCreate lifecycle hook to hash password
  }
});

module.exports = User;
