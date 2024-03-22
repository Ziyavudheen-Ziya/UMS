const express = require("express")
const adminRoute = express()

const session = require('express-session')
const config = require('../config/config.js')
adminRoute.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


const bodyParser = require('body-parser')
adminRoute.use(bodyParser.json())
adminRoute.use(bodyParser.urlencoded({extended:true}))

//cache
// const nocache = require("nocache");
// app.use(nocache());


adminRoute.set('view engine','ejs')
adminRoute.set('views','./views/admin')

const auth = require('../middleware/adminAuth.js')

const adminController = require('../controllers/adminController.js')

adminRoute.get('/',auth.isLogout,adminController.loadLogin)
adminRoute.post('/',adminController.verifyLogin)

adminRoute.get('/home',auth.isLogin,adminController.loadDashboard)

adminRoute.get('/logout',auth.isLogin,adminController.logout)

adminRoute.get('/dashboard',auth.isLogin,adminController.adminDashboard)

adminRoute.get('/new-user',auth.isLogin,adminController.newUserLoad)

adminRoute.post('/new-user',adminController.addUser)

adminRoute.get('/edit-user',auth.isLogin,adminController.editUserLoad)
adminRoute.post('/edit-user',adminController.updateUsers)

adminRoute.get('/delete-user',adminController.deleteUser)

module.exports = adminRoute



