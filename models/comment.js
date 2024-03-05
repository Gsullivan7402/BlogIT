const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}

Comment.init(
  {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Comment must be at least one character long
        len: [1]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Establishes a foreign key relationship to the User model
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Establishes a foreign key relationship to the Post model
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;