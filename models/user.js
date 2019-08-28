'use strict';
module.exports = (sequelize, DataTypes) => {
    const Op = sequelize.Sequelize.Op
    class User extends sequelize.Sequelize.Model {
        static associate(models) {
            User.hasMany(models.Transaction)
        }
    }
    User.init({
        name: DataTypes.STRING,
        phone: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 13]

                }
            }
        },
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
        return User.findOne({
                where: {
                    email: {
                        [Op.eq]: user.email
                    }

                }
            })
            .then(data => {
                if (data) throw 'Email sudah ada'
            })

    })

    return User;
};