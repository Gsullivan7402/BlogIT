const { sequelize } = require('../config/config'); // Corrected import to destructure sequelize instance

// Import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Initialize models
User.init({
  // Define User model attributes here as in User.js
}, { sequelize, modelName: 'User' }); // Add this for each model

Post.init({
  // Define Post model attributes here as in Post.js
}, { sequelize, modelName: 'Post' });

Comment.init({
  // Define Comment model attributes here as in Comment.js
}, { sequelize, modelName: 'Comment' });

// Associations can remain unchanged
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
