const Model = require('../models/index')
const User = Model.User
const sumInvoice = require('../helpers/sumInvoice')
const convertMoney = require('../helpers/rupiah')
const bcrypt = require('bcrypt')

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
                // console.log(obj, '<<<<<<<<< MASUK SINI BROH')
                res.redirect('/')
// <<<<<<< crud_user
//                     // res.send(req.body)
// =======
                // res.send(req.body)
// >>>>>>> master
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

    static findByPk(req, res) {
        // console.log(req.params)
        User.findByPk(req.params.id)
            .then(data => {
                // res.send(data)
                let file = data.dataValues
                console.log(file, '<<<<<<<<< INI MASUK FBP')
                res.render('edit-customer.ejs', {
                    file
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static update(req, res) {
        console.log('masuk kesini broh')

        // res.send(req.body)
        User.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                res.redirect('/users/admin/edit-customer')
                console.log(`Selamat Edit Data ${req.body.name} telah berhasil`)
            })
            .catch(err => {
                res.send(err)
                console.log(`Selamat Edit Data ${req.body.name} telah berhasil`)
            })

    }


    static delete(req, res) {
        User.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => {

                console.log('berhasil')
                res.redirect('/users/admin/edit-customer')
            })
            .catch(err => {
                console.log('gagal')
                res.send(err)
            })
    }

    static findAllCustomer(req, res) {
        // console.log('masuk bro')
        User.findAll({
            order : [['id', 'ASC']]
        })
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

    static findUserTRX(req, res) {
        User.findByPk(req.params.idUser, {
                include: [{
                    model: Model.Transaction,
                    include: [{
                        model: Model.Item
                    }]
                }]
            })
            .then(data => {
                let invoice = data.getInvoice()
                let invoiceFormat = {
                    perItem: invoice,
                    totalPaymentSum: sumInvoice(invoice)
                }
                res.render('invoice', {
                    UserInvoice: invoiceFormat,
                    customer: data.dataValues,
                    rupiah: convertMoney,
                    user: req.params.idUser
                })
            })
    }

    static cekLogin(req, res) {
        User.findOne({
                where: {
                    username: req.body.username
                }
            })
            .then(user => {
                // if (req.body.password == user.password) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    req.session.currentUser = {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    }
                    if (user.role === 'admin') {
                        res.redirect('/users/admin/edit-customer')
                    } else {
                        console.log('>>>>>', user);
                        res.redirect(`/users/${user.id}/dashboard`)
                    }
                } else {
                    res.redirect('/login')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }



}

module.exports = UserController