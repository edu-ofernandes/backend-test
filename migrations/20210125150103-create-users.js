'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('users', {
       id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
        displayName: {
          type: Sequelize.STRING,
          allowNull: false,
          min: 23,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          isEmail: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          max: 6,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt:{
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt:{
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('users');
  }
};
