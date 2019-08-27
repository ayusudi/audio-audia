'use strict';
module.exports = (sequelize, DataTypes) => {
  class Item extends sequelize.Sequelize.Model {
    static associate(models) {
      Item.hasMany(models.UserItem)
    }
  }
  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    bluetooth: DataTypes.BOOLEAN,
    description: DataTypes.STRING
  }, {
      sequelize
    })

  return Item;
};