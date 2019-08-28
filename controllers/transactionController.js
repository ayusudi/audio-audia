const Model = require('../models/index')
const Transaction = Model.Transaction

class TransactionController {
  static create (req, res){
    Transaction.create({
      UserId : req.params.idUser,
      ItemId : req.params.idItem,
      TotalItems : req.body.TotalItems,
    })
    .then(data =>{
      console.log('success called')
      res.redirect(`/users/${req.params.idUser}/dashboard`)
    })
    .catch(err =>{
      res.send(err.Error)
      console.log('im called')
      console.log(err);
    })
  }

}

module.exports = TransactionController