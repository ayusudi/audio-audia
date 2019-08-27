'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Transactions', 'TotalItems', Sequelize.INTEGER),
      queryInterface.addColumn('Transactions', 'TotalPayment', Sequelize.INTEGER)
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Transactions', 'TotalItems'),
      queryInterface.removeColumn('Transactions', 'TotalPayment')
    ])
  }
};
