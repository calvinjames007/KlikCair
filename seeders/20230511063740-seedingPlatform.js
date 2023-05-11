'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let dataPlatform = JSON.parse(fs.readFileSync('./data/platform.json', 'utf-8')).map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      delete el.id 
      return el
    })

    return queryInterface.bulkInsert('Platforms', dataPlatform)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Platforms')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
