
const isLogout = async(req,res,next)=>{
    try {
        if(req.session.user){
            res.redirect('/home')
        }else{
            next()
        }
       
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    isLogout
}