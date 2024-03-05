// models/index.js

const Sequelize = require('sequelize');
const sequelize = require('../config/config');

// Import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Initialize models
User.init(sequelize, Sequelize);
Post.init(sequelize, Sequelize);
Comment.init(sequelize, Sequelize);

// Define model associations
// User-Post associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// User-Comment associations
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// Post-Comment associations
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

// Export models and sequelize connection
module.exports = { sequelize, User, Post, Comment };
