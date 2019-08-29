const Model = require('../models/index')
const User = Model.User
const sumInvoice = require('../helper/sumInvoice')
const convertMoney = require('../helper/rupiah')

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

    static findByPk(req, res) {
        User.findByPk(req.params.id)
            .then(data => {
                let file = data.dataValues
                res.render('edit-customer.ejs', file)

            })
            .catch(err => {
                res.send(err)
            })
    }

    static update(req, res) {
        console.log('masuk kesini broh')
        res.send(req.params)
        User.update()
            .then(data => {
                // res.send(data)
            })
            .catch(err => {

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
                    rupiah: convertMoney
                })
            })
    }



}

module.exports = UserController