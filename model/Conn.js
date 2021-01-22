const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('api-trybe', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false
});

mo
