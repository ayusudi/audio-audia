const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const isNotLogin = require('../middlewares/isNotLogin')

router.get('/', isNotLogin,(req,res)=>{
    console.log(req.session);
    res.render('login')
})
router.post('/', isNotLogin, UserController.cekLogin)

router.get('/logout',(req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send(err)
        }
        else {
            res.redirect('/')
        }
    })
})


module.exports = router