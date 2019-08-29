const Model = require('../models/index')
const Transaction = Model.Transaction

class TransactionController {
    static create(req, res) {
        Transaction.create({
                UserId: req.params.idUser,
                ItemId: req.params.idItem,
                TotalItems: req.body.TotalItems,
            })
            .then(data => {
                console.log('success called')
                res.render('dashboard',`/users/${req.params.idUser}/dashboard`)
            })
            .catch(err => {
                res.redirect(`/users/${req.params.idUser}/items/${req.params.idItem}?status=${err}`)
            })
    }

}

module.exports = TransactionController