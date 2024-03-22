// const { name } = require("ejs");
const { name } = require("ejs");
const User = require("../models/userModel.js")
const bcrypt = require('bcrypt')







const securePassword = async (password) => {

    try {
        console.log(password);
        const passwordHash = await bcrypt.hash(password, 10)

        return passwordHash;

    } catch (error) {
        console.log(error.message);
    }

}

const loadRegister = async (req, res) => {
    try {
       
          
        res.render('loginSignupPage')


    } catch (error) {
        console.log(error.message);
    }
}



const insertUser = async (req, res) => {
    try {
        const thisUser = await User.findOne({ email: req.body.email });

        if (!thisUser) {

            const userNew = new User({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: await securePassword(req.body.password),
                is_admin: 0
            });

            const user = await userNew.save();

            req.session.user = user;
            req.session.email = req.body.email;

            console.log(req.session.user);
            res.render('home', { user: req.session.user });


        }else{

            req.session.emailExists = true;
            res.render("loginSignupPage", { message: "Already registered user" });

        }
       
    } catch (error) {
        console.log(error.message);
    }
};




const loginLoad = async (req, res) => {
    try {

        //  const userData = await User.findOne({ email: req.body.email });

        const user = req.session.user
        console.log(user);

        if (user) {
            res.render('home', { user })
        } else {
            console.log('landingpage');
            res.render('loginSignupPage')
        }

    } catch (error) {
        console.log(error.message);
    }
}
const verifyLogin = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            email: req.body.email,
        });
        console.log('existingUser' + existingUser);
        if (existingUser) {
            const comparePass = bcrypt.compareSync(
                req.body.password,
                existingUser.password
            );
            if (req.body.email == existingUser.email && comparePass) {


                req.session.user = existingUser;
                let user = req.session.user
                req.session.email = req.body.email;
                console.log(user);

                if (user) {
                    res.redirect('/home')

                } else {

                    res.redirect('/')
                }



            } else {
                req.session.invalidCredentials = true;
                res.redirect("/");
            }
        } else {
            req.session.invalidCredentials = true;
            res.redirect("/");
        }
    } catch (error) {
        console.log(error.message);
    }
}

const home = async (req, res) => {
    try {
        const user = req.session.user;
        console.log(user);
        if (user) {
            res.render('home', { user });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error.message);
    }
};




const userLogout = async (req, res) => {
    try {
        req.session.destroy()
        console.log('logout');
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
    }

}

const hello = async (req,res)=>{

     
     try {
         let val1 =req.query.num
         let val2 = req.query.nums
           
          
         
          res.send("hello")

          console.log(parseFloat(val1)+parseFloat(val2));


         

     } catch (error) {
        
     }
}





module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    home,
    userLogout,
    hello,
}