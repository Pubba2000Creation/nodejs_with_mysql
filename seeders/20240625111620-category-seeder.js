'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories',[
      {
        name:'nodeJs'
      },
      {
        name:'expressJs'
      },
      {
        name:'test-category'
      },
      {
        name:'laravel'
      },
      {
        name:'MERN'
      },
      {
        name:"MEAN"
      },
      {
        name:'LAMP'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    
    return queryInterface.bilkDelete('categories',{},null)
  }
};
