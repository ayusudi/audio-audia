const Model = require('../models/index')
const Item = Model.Item
const convertMoney = require('../helpers/rupiah')
const Transaction = require('../models/index').Transaction
const loopMVP = require('../helpers/loopingItem')

class ItemController {
    static findAll(req, res) {
        Item.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
            .then(items => {
                res.render('dashboard', {
                    items: items,
                    user: req.params.idUser,
                    rupiah: convertMoney
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static findByFilter(req, res) {
        Item.findByFilter(req.params.field, req.params.value)
            .then(items => {
                res.render('dashboard', {
                    items: items,
                    user: req.params.idUser,
                    rupiah: convertMoney
                })
            })
            .catch(err => {
                res.send(err)
            })

    }
    static filterByName(req, res) {
        Item.filterByName(req.params.name)
            .then(items => {
                res.render('dashboard', {
                    items: items,
                    user: req.params.idUser,
                    rupiah: convertMoney
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static findOne(req, res) {
        Item.findByPk(req.params.idItem)
            .then(item => {
                res.render('show-item', {
                    item: item,
                    user: {
                        id: req.params.idUser
                    },
                    rupiah: convertMoney
                })
            })
    }
    static postFilterName(req, res) {
        res.redirect(`/users/${req.params.idUser}/dashboard/findName/${req.body.search}`)
    }

    static getTotalSales(req, res) {
        // console.log('+++++++++++++++++++++++++++++++++')
        Transaction.findAll()
            .than(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
          }

    static getAll(req, res){
      Item.findAll({
        include : [{
          model : Model.Transaction
        }], 

          order : [['id', 'ASC']]
        
      })
      .then(data =>{
          console.log(loopMVP(data))
        res.render('bestSeller', {mvp : loopMVP(data)})
        // res.send({mvp : loopMVP(data)})
      })
    }

}

module.exports = ItemController