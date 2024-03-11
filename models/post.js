const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config'); // Corrected import to use destructuring

class Post extends Model {}

Post.init({
  // Define the model attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // This should match the table name exactly
      key: 'id'
    }
  }
}, {
  sequelize, // Correctly references the imported sequelize instance
  modelName: 'Post',
  freezeTableName: true,
  underscored: true,
});

module.exports = Post;
