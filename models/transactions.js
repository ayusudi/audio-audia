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
    TotalItems: DataTypes.INTEGER,
    TotalPayment: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Due to your input to stock is less than 1'
        }
      }
    }
  }, {
      sequelize
    })
  Transaction.addHook('beforeValidate', (trx) => {
    const Item = require('./index').Item
    return Item.findByPk(trx.ItemId)
      .then(item => {
        console.log('>>>>>>>', item);
        if (item.stock >= trx.TotalItems) {
          let payment = item.price * trx.TotalItems
          trx.TotalPayment = payment
        }
        else {
          throw new Error(`Our stock is ${item.stock}`)
        }
      })
  })

  Transaction.addHook('afterCreate', (trx, options) => {
    const Item = require('./index').Item
    return Item.update({
      stock: sequelize.literal(`stock - ${trx.TotalItems}`)
    }, {
        where: {
          id: trx.ItemId
        }
      })
  })
  return Transaction;
};