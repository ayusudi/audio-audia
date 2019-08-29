'use strict';

const bcrypt = require('bcrypt')
let hash = bcrypt.hashSync('admin', 10)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Master',
      phone: '012345678912',
      address : 'Rawamangun, Jakarta Timur. Indonesia',
      email : 'ayusudi@yahoo.com',
      password : hash,
      role : 'admin',
      createdAt : new Date (),
      updatedAt : new Date(),
      username : 'master'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
