'use strict';
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize.Sequelize.Model {
        static associate(models) {
            User.hasMany(models.Transaction)
        }
    }
    User.init({
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'EROR EMAIL TELAH DIGUNAKAN'
                }
            }
        },
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        username: DataTypes.STRING
    }, {
        sequelize
    })

    User.addHook('beforeCreate', (user) => {
        user.role = 'customer'
    })

    return User;
};