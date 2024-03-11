const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config'); // Corrected import to use destructuring
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
  // Model attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize, // Sequelize instance is correctly referenced
  hooks: {
    // Hashing password before saving it to the database
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
  modelName: 'user',
  timestamps: true,
  freezeTableName: true,
  underscored: true,
});

module.exports = User;
