const express = require('express')
const router = express.Router()

const ItemController = require('../controllers/itemController')
const UserController = require('../controllers/userController')
const TransactionController = require('../controllers/transactionController')
const isAdmin = require('../middlewares/isAdmin')
const isCustomer = require('../middlewares/isCustomer')
const isNotLogin = require('../middlewares/isNotLogin')

router.get('/register', (req, res) => {
    res.render('register.ejs')
})
router.post('/register', isNotLogin, UserController.Create)
router.post('/register', isNotLogin, UserController.Create)

router.get('/admin/edit-customer', isAdmin, UserController.findAllCustomer)
router.get('/admin/edit-customer', isAdmin, UserController.findAllCustomer)
// BUAT DELETE
router.get('/admin/edit-customer/delete/:id', isAdmin, UserController.delete)
// UNTUK EDIT CUSTOMER
router.get('/admin/edit-customer/:id', isAdmin, UserController.findByPk)
router.post('/admin/edit-customer/:id', isAdmin, UserController.update)


//all items
router.get('/:idUser/dashboard', isCustomer, ItemController.findAll)
router.post('/:idUser/dashboard', isCustomer, ItemController.postFilterName)
//one item
router.get('/:idUser/items/:idItem', isCustomer, ItemController.findOne)
//filter bluetooth
router.get('/:idUser/dashboard/filterItem/:field/:value', isCustomer, ItemController.findByFilter)
//filter name rawquery
router.post('/:idUser/dashboard/filter', isCustomer, ItemController.postFilterName)
router.get('/:idUser/dashboard/findName/:name', isCustomer, ItemController.filterByName)
//belanja
router.post('/:idUser/items/:idItem', isCustomer, TransactionController.create)
//invoice || checkout
router.get('/:idUser/checkout', isCustomer, UserController.findUserTRX)


module.exports = router