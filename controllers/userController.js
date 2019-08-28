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
                console.log(err, '<<<<<<<<<<< ERRORNYA DISINI BRO')
                res.send(err)
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
        User.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
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
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static findAllCustomer(req, res) {
        console.log('masuk bro')
        User.findAll()
            .then(data => {
                res.send(data)
                    // res.render('/edit-customer', {
                    //     data
                    // })
            })
            .catch(err => {
                res.send(err)
            })
    }



}

module.exports = UserController