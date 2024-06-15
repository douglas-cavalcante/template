'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('questions', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    item_a: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    item_b: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    item_c: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    item_d: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    item_e: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    correct_item: {
      type: Sequelize.ENUM,
      values: ['A', 'B', 'C', 'D', 'E'], 
      allowNull: false
    },
    subject_id: {
      type: Sequelize.INTEGER,
      references: { model: 'subjects', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('questions'); 
  }
};
