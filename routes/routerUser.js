const express = require('express')
const router = express.Router()

const ItemController = require('../controllers/itemController')
const UserController = require('../controllers/userController')
const TransactionController = require('../controllers/transactionController')

// router.get('/', (req, res) => {
//   res.send("Hello")
// })
// router.get('/', UserController.findAll)
router.get('/register', (req, res) => {
    res.render('register.ejs')
})
router.post('/register', UserController.Create)

router.get('/admin/edit-customer', UserController.findAllCustomer)

router.get('/:idUser/dashboard', ItemController.findAll)


// BUAT DELETE
router.get('/admin/edit-customer/delete/:id', UserController.delete)

// UNTUK EDIT CUSTOMER
router.get('/admin/edit-customer/:id', UserController.findByPk)
router.post('/admin/edit-customer/:id', UserController.update)






router.get('/:idUser/dashboard/filterItem/:field/:value', ItemController.findByFilter)
router.get('/:idUser/dashboard/findName/:name', ItemController.filterByName)
router.get('/:idUser/dashboard/findName/:name', ItemController.filterByName)
router.post('/:idUser/items/:idItem', TransactionController.create)
router.get('/:idUser/items/:idItem', ItemController.findOne)
router.get('/:idUser/checkout', UserController.findUserTRX)
    // router.get('/items/:idItem', ItemController.findOne)

// router.get('/items/:idItem', ItemController.findOne)

module.exports = router