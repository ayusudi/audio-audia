'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserItem extends sequelize.Sequelize.Model {
    static associate(models) {
      UserItem.belongsTo(models.User)
      UserItem.belongsTo(models.Item)
    }
  }
  UserItem.init({
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER
  }, {
      sequelize
    })

  return UserItem;
};