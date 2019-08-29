const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const isNotLogin = require('../middlewares/isNotLogin')


const ItemController = require('../controllers/itemController')
    // const UserController = require('../controllers/userController')

router.get('/', ItemController.getTotalSales)

module.exports = router