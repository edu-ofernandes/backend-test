const Sequelize = require('sequelize');
const DBConfig = require('../config/ConfigDB');

const sequelize = new Sequelize(DBConfig);
 
module.exports = sequelize;
// global.sequelize = sequelize;