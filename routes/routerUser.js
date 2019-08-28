const express = require('express')
const router = express.Router()

const ItemController = require('../controllers/itemController')

// router.get('/', (req, res) => {
//   res.send("Hello")
// })
router.get('/dashboard', ItemController.findAll)
router.get('/dashboard/filterItem/:field/:value', ItemController.findByFilter)
router.get('/dashboard/findName/:name', ItemController.filterByName)
module.exports = router
