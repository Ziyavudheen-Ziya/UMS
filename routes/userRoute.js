const express = require("express")
const user_route = express()
const config = require('../config/config.js')
const session = require("express-session")
user_route.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


const auth = require('../middleware/auth.js')

//cache


user_route.set('view engine', 'ejs')
user_route.set('views', './views/users')
const bodyParser = require("body-parser")
user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({ extended: true }))


const userController = require('../controllers/userController')

//Login//
user_route.get('/', auth.isLogout, userController.loginLoad)

user_route.post('/login', userController.verifyLogin)
user_route.get('/home', userController.home)



user_route.post('/register', userController.insertUser)

user_route.get('/logout', userController.userLogout)

user_route.get('/hello',userController.hello)






module.exports = user_route;