const Model = require('../models/index')
const User = Model.User

class UserController {

    static Create(req, res) {
        let obj = {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }

        // res.send(req.body)
        User.create(obj)
            .then(data => {
                console.log(obj, '<<<<<<<<< MASUK SINI BROH')
                res.redirect('/')
                    // res.send(req.body)
            })
            .catch(err => {
                console.log(err)
                    // res.redirect('register/?error=')
                    // res.send(req.body)
            })
    }

    static findOne(req, res) {
        User.findOne(req.params.id)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static update(req, res) {
        User.findByPk({
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

    }


    static delete(req, res) {
        User.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                // res.redirect('/)
                // res.send(data)
                console.log('berhasil')
                res.redirect('/')
            })
            .catch(err => {
                console.log('gagal')
                res.send(err)
            })
    }

    static findAllCustomer(req, res) {
        // console.log('masuk bro')
        User.findAll()
            .then(data => {
                // res.send(data)
                res.render('allCustomer.ejs', {
                    data
                })
            })
            .catch(err => {
                res.send(err)
            })
    }



}

module.exports = UserController