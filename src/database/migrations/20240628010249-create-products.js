'use strict';

const { ENUM } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.STRING(150),
        unique: true,
        defaultValue: 0
      },
      color: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      voltage: {
        type: Sequelize.ENUM,
        values: [110, 220]
      },
      description: {
        type: Sequelize.TEXT
      },
      
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
