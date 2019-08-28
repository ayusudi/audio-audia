const express = require('express')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))


const users = require('./routes/routerUser')
const item = require('./routes/routerItem')


app.get('/', (req, res) => [
    res.render('index.ejs')
])


app.use('/users', users)
app.use('/dashboard', item)


app.listen(PORT, function() {
    console.log(`heard on ${PORT}`)
})