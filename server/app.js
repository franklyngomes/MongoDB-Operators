const express = require('express')
const databaseCon = require('./app/config/databaseCon')
const dotenv = require('dotenv').config()
const ejs = require('ejs')
const cors = require('cors')
const cookieParser = require("cookie-parser")


const app = express()
databaseCon()
app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true
}))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(cookieParser())

app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use('/uploads',express.static('uploads'))


const router = require('./app/routes/webRouter')
app.use(router)
const port = 5000
app.listen(port, () => {
  console.log('Server is running on http://localhost:5000')
})