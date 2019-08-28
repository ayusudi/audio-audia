'use strict';
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize.Sequelize.Model {
        static associate(models) {
            User.hasMany(models.Transaction)
        }
        getInvoice() {
            if (this.Transactions) {
                let invoice = {}
                let tes = this.Transactions.length
                for (let i=0; i<this.Transactions.length; i++){
                    invoice[this.Transactions[i].Item.name] = {
                        quantity : 0,
                        pricePeritem : this.Transactions[i].Item.price,
                        TotalPrice : 0
                    }
                }
                for (let k in invoice){
                    for(let i=0; i<this.Transactions.length; i++){
                        if (k === this.Transactions[i].Item.name){
                            invoice[k].quantity += this.Transactions[i].TotalItems
                            invoice[k].TotalPrice += this.Transactions[i].TotalPayment
                        }
                    }
                }
                return invoice
            }
            else {
                return false
            }
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
                    msg: 'Wrong input form'
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