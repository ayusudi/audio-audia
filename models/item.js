'use strict';
module.exports = (sequelize, DataTypes) => {
    class Item extends sequelize.Sequelize.Model {
        static associate(models) {
            Item.hasMany(models.Transaction)
        }
        statusBluetooth(){
            if (this.bluetooth){
                return '✓ Bluetooth'
            }
            else {
                return '☓ Bluetooth'
            }
        }
        static findByFilter(field, value) {
            return Item.findAll({
                    where: {
                        [field]: value
                    }
                })
                .then(items => {
                    return items
                })
                .catch(err => {
                    return err
                })
        }
        static filterByName(name) {
            let guess = []
            let eydName = ''
            for (let i = 0; i < name.length; i++) {
                if (i === 0) {
                    eydName += name[i].toUpperCase()
                } else {
                    eydName += name[i].toLowerCase()
                }
            }
            guess.push(`${eydName}`)
            guess.push(`${name.toLowerCase()}`)
            guess.push(`${name.toUpperCase()}`)
            let find = ''
            for (let i = 0; i < guess.length; i++) {
                if (i === guess.length - 1) {
                    find += `name LIKE '%${guess[i]}%'`
                } else {
                    find += `name LIKE '%${guess[i]}%' OR `
                }
            }
            return sequelize.query(`SELECT * FROM "Items" WHERE ${find}`, {
                    type: sequelize.QueryTypes.SELECT
                })
                .then(isFound => {
                    return isFound
                })
                .catch(err => {
                    return err
                })
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