const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/user_management_system")

const nocache = require("nocache");

const express = require("express")
const app = express()

app.use(nocache());


// for user routes
const userRoute = require("./routes/userRoute")
app.use('/',userRoute)



//for admin routes
const adminRoute = require('./routes/adminRoute')
app.use('/admin',adminRoute)

app.listen(4000,()=>{
    console.log("The server is start");
})

