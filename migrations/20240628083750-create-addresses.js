'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // name of the target model (Users table)
          key: 'id' // key in the target model that the foreign key refers to
        },
        onDelete: 'CASCADE' // delete the address if the associated user is deleted
      },
      mobile: {
        type: Sequelize.STRING, // Store mobile as a string to handle leading zeros
        allowNull: true // assuming mobile number can be optional
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Addresses');
  }
};
