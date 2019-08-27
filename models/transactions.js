'use strict';
module.exports = (sequelize, DataTypes) => {
  class Transaction extends sequelize.Sequelize.Model {
    static associate(models) {
      Transaction.belongsTo(models.User)
      Transaction.belongsTo(models.Item)
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    TotalItems : DataTypes.INTEGER,
    TotalPayment : DataTypes.INTEGER
  }, {
      sequelize
    })

  return Transaction;
};