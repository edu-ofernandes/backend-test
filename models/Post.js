const sequelize = require('../database/Conn')
const { DataTypes } = require('sequelize')
const UserModel = require('./User')
const Post = sequelize.define('posts', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})
Post.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' })
UserModel.hasMany(Post, { foreignKey: 'userId', as: 'user' })
module.exports = Post
