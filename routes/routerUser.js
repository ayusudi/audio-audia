const express = require('express')
const router = express.Router()

const ItemController = require('../controllers/itemController')
const TransactionController = require('../controllers/transactionController')

// router.get('/', (req, res) => {
//   res.send("Hello")
// })
router.get('/:idUser/dashboard', ItemController.findAll)
router.get('/:idUser/dashboard/filterItem/:field/:value', ItemController.findByFilter)
router.get('/:idUser/dashboard/findName/:name', ItemController.filterByName)

router.get('/:idUser/items/:idItem', ItemController.findOne)
router.post('/:idUser/items/:idItem', TransactionController.create)
module.exports = router
