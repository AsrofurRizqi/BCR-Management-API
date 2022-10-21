'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [      
      {
        nama: 'asrop',
        email: 'asrop@gmail.com',
        password: await bcrypt.hash("123456", 10), //setup with bcrypt encrypt
        roles:"superadmin",
        createdAt: new Date(),
        updatedAt : new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
