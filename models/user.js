'use strict';
module.exports = (sequelize, DataTypes) => {
    const Op = sequelize.Sequelize.Op
    let nodemailer = require('nodemailer');

    class User extends sequelize.Sequelize.Model {
        static associate(models) {
            User.hasMany(models.Transaction)
        }
        getInvoice() {
            if (this.Transactions) {
                let invoice = {}
                    // let tes = this.Transactions.length
                for (let i = 0; i < this.Transactions.length; i++) {
                    invoice[this.Transactions[i].Item.name] = {
                        quantity: 0,
                        pricePeritem: this.Transactions[i].Item.price,
                        TotalPrice: 0
                    }
                }
                for (let k in invoice) {
                    for (let i = 0; i < this.Transactions.length; i++) {
                        if (k === this.Transactions[i].Item.name) {
                            invoice[k].quantity += this.Transactions[i].TotalItems
                            invoice[k].TotalPrice += this.Transactions[i].TotalPayment
                        }
                    }
                }
                return invoice
            } else {
                return false
            }
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
                    msg: 'FORMAT ERROR'
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
                if (data) throw Error('Email sudah ada')
            })
    })

    User.addHook('beforeCreate', 'checkUniqueEmail', (input, option) => {
        return User.findOne({
                where: {
                    email: input.email
                }
            })
            .then(isFound => {
                if (isFound) {
                    throw new Error('This Email is already registed')
                }
            })
    })

    User.addHook('beforeCreate', 'checkUniqueUserName', (input, option) => {
        return User.findOne({
                where: {
                    username: input.username
                }
            })
            .then(isFound => {
                if (isFound) {
                    throw new Error('This UserName is Already Registered')
                }
            })
    })

    return User;
};