const sequelize = require('../database/Conn')
const { DataTypes } = require('sequelize')

module.exports = sequelize.define('users', {
  displayName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }

})
