'use strict';

const fs = require('fs')
let data = fs.readFileSync('./seedItem.json', 'utf8')
let parse = JSON.parse(data)
parse.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', parse, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
