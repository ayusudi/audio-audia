const Model = require('../models/index')
const Item = Model.Item

class ItemController {
  static findAll(req, res) {
    Item.findAll({
      order: [['id', 'ASC']]
    })
      .then(items => {
        res.render('dashboard', { items: items })
      })
      .catch(err => {
        res.send(err)
      })
  }
  static findByFilter(req, res) {
    Item.findByFilter(req.params.field, req.params.value)
      .then(items => {
        res.render('dashboard', { items: items })
      })
      .catch(err => {
        res.send(err)
      })

  }
  static filterByName(req, res) {
    Item.filterByName(req.params.name)
      .then(items => {
        res.render('dashboard', { items: items })
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = ItemController