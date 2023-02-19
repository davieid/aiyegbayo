const jwt = require("jsonwebtoken")

module.exports = ( req, res, next) => {
    let token = req.cookies.user,
    user;
    if(token){
        try {
            user = jwt.verify( token, process.env.JWT)
            req.user = user
            next()
        } catch (error) {
            res.clearCookie('user')
            res.redirect('/admin/login')
        }
    }
    else{
        res.redirect('/admin/login')
    }
}