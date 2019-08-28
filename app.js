const express = require('express')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


const users = require('./routes/routerUser')

app.use('/users', users)

app.listen(PORT, function () {
  console.log(`heard on ${PORT}`)
})