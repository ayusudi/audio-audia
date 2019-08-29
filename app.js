const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const session = require('express-session')

const isNotLogin = require('./middlewares/isNotLogin')
const users = require('./routes/routerUser')
const login = require('./routes/routerLogin')
const mvp = require('./routes/routerMVP')


app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))    

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//kading bisa kadang engga (???)
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
})    

app.get('/', isNotLogin, (req, res) => [
    res.render('index.ejs')
])

app.use('/users', users)
app.use('/login', login)
app.use('/mvp', mvp)

app.listen(PORT, function() {
    console.log(`heard on ${PORT}`)
})