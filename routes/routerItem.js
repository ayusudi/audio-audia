const express = require('express')
const router = express.Router()

const ItemController = require('../controllers/itemController')
const UserController = require('../controllers/userController')

router.get('/', (req, res) => {
    res.render('dashboard.ejs')
})


module.exports = router