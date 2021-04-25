const express = require('express')
const expressHandlebars = require('express-handlebars')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todos')
const chalk = require('chalk')
const path = require('path')
require('dotenv').config()

const PORT = process.env.PORT || 8888

const app = express()
const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

const start = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
      }
    )

    app.listen(PORT, () => {
      console.log(chalk.green('Server is started...'))
    })
  } catch (e) {
    console.log(e)
  }
}

start()
