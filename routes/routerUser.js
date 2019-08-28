const express = require('express')
const router = express.Router()

const ItemController = require('../controllers/itemController')
const UserController = require('../controllers/userController')

// router.get('/', (req, res) => {
//   res.send("Hello")
// })
// router.get('/', UserController.findAll)
router.get('/register', (req, res) => {
    res.render('register.ejs')
})
router.post('/register', UserController.Create)

router.get('/admin/edit-customer', UserController.findAllCustomer)

router.get('/dashboard/filterItem/:field/:value', ItemController.findByFilter)
router.get('/dashboard/findName/:name', ItemController.filterByName)

router.get('/items/:idItem', ItemController.findOne)
module.exports = router