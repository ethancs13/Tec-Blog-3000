const Posts = require("./Post");
const Comments = require("./Comment");
const Users = require("./User");

// Post can belong to any user with the user_id as reference
Posts.belongsTo(Users, {
  foreignKey: "user_id",
});

// Post can have many comments, and will use post_id key to reference
Posts.hasMany(Comments, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// Comment can belong to only one post, and uses post_id key to reference
Comments.belongsTo(Posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// Comment can belong to any user with the user_id as reference
Comments.belongsTo(Users, {
  foreignKey: "user_id",
});

// User can have many posts with the user_id as reference
Users.hasMany(Posts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// User can have many comments with the user_id as reference
Users.hasMany(Comments, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { Posts, Comments, Users };