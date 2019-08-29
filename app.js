const express = require('express')
const app = express()
const PORT = 3000
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))

const isNotLogin = require('./middlewares/isNotLogin')
const users = require('./routes/routerUser')
const login = require('./routes/routerLogin')
const mvp = require('./routes/routerMVP')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.get('/', isNotLogin, (req, res) => [
    res.render('index.ejs')
])

// app.get('/bestseller', (req, res) => [
//     res.render('bestSeller.ejs')
// ])



app.use('/users', users)
app.use('/mvp', mvp)
app.use('/login', login)

app.listen(PORT, function() {
    console.log(`heard on ${PORT}`)
})