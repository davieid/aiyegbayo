const UrlSafeString = require('url-safe-string'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
Articles = require('../models/articles'),
Email = require('../models/emails'),
Admin = require('../models/admin'),
tagGenerator  = new UrlSafeString()

const Create = ( req, res, next) => {
    const article = {
        id: '',
        title: '',
        image: '',
        owner: '',
        created: '',
        html: '',
        views: '',
        description: ''
    }
    res.render('admin/article/new', {
        title: 'The Buzz Journal | New Article',
        description: `Write about an interesting topic`,
        article: article,
        page: 'Create',
        action: '/admin/articles/create/'
    })
}
const View = async ( req, res, next) => {
    const [article] = await Articles.find(req.params.id)
    res.render('admin/article/new', {
        title: 'The Buzz Journal',
        description: ``,
        article: article,
        page: 'Update',
        action: '/admin/articles/update/'+req.params.id
    })
}
const profileView = async ( req, res, next) => {
    const [user] = await Email.find(req.user.email),
    [profile] = await Admin.find(user.owner)
    res.render('admin/profile', {
        title: 'The Buzz Journal',
        description: ``,
        profile: profile,
        user: user,
        page: 'Profile Update',
        action: '/admin/profile/update/'+profile.id
    })
}
const Update = async ( req, res, next) => {
    let {title, description, html} = req.body,
    id = req.params.id,
    link = tagGenerator.generate(title)
    await Articles.update( id, title, link, html, description)
    if (req.file) {
        await Articles.updateImage( id, req.file.filename)
    }
    res.redirect('/admin/articles/update/'+id)
}
const newArticle = async ( req, res, next) => {
    let {title, description, html} = req.body,
    link = tagGenerator.generate(title),
    [user] = await Email.find( req.user.email), 
    image = null;
    if(req.file){
        image = req.file.filename
    }
    user = await Articles.add( title, image, user.owner, link, html, description)
    res.redirect('/admin/articles/update/'+user.insertId)
}
const newFile = async ( req, res, next) => {
    let {email} = req.body,
    image = req.file.filename,
    user = await Articles.addFile( email, image)
    res.redirect('/admin/')
}
const Profile = async ( req, res, next) => {
    res.render('admin/profile', {
        title: 'The Buzz Journal | Dashboard',
        description: `Admin Dashboard`,
        page: 'Profile Update',
        profile: {},
        action: '/admin/profile/new',
        user: req.user
    })
}
const FilesUpload = async ( req, res, next) => {
    res.render('admin/file', {
        title: 'The Buzz Journal | Upload File',
        description: `Admin Dashboard: Select file to upload`,
        page: 'File Upload',
        profile: {},
        action: '/admin/files/upload',
        user: req.user
    })
}
const Dashboard = async ( req, res, next) => {
    let [user] = await Email.find( req.user.email),
    articles = await Articles.myArticles(user.owner)
    if(!user.owner){
        res.redirect('/admin/profile')
    }
    else{
        res.render('admin/index', {
            title: 'The Buzz Journal | Dashboard',
            description: `Admin Dashboard`,
            page: 'Dashboard',
            user: req.user,
            data: articles
        })
    }
}
const Login = async ( req, res, next) => {
    res.render('admin/form', {
        title: 'The Buzz Journal | Admin Log In',
        description: `Admin Login Form`,
        page: 'Log In',
        action: '/admin/login/auth'
    })
}
const Register = async ( req, res, next) => {
    res.render('admin/form', {
        title: 'The Buzz Journal | Admin Registration',
        description: `Admin Register`,
        page: 'Register',
        action: '/admin/register/new'
    })
}
const newAdmin = async ( req, res, next) => {
    let {email, password} = req.body,
    rounds = 10,
    user = await Email.find( email),
    salt = await bcrypt.genSalt(rounds)
    password = await bcrypt.hash( password, salt)
    if(user.length > 0){
        //user exist
        res.redirect('/admin/login')
        next()
    }
    else{
        //register new user
        user = await Email.add( email, password)
        res.redirect('/admin/login')
    }
}
const newProfile = async ( req, res, next) => {
    let {email, firstname, lastname} = req.body,
    user = await Admin.add( email, firstname, lastname)
    user = await Email.updateOwner(email, user.insertId)
    res.redirect('/admin/')
}
const Auth = async ( req, res, next) => {
    let {email, password} = req.body,
    user = await Email.find( email)
    if(user.length > 0){
        //user exist
        let User = user[0],
        auth = await bcrypt.compare( password, User.password)
        if(auth){
            let payload = JSON.stringify({
                email: email
            }),
            token = jwt.sign( {email}, process.env.JWT, {expiresIn: "1h"})
            res.cookie( 'user', token, {
                httpOnly: true,
                //secure: true,
                //maxAge: 1000000,
                //signed: true
            })
            res.redirect('/admin/')
            next()
        }
        else{
            res.redirect('/admin/login')
            next()
        }
    }
    else{
        //user does not exist
        res.redirect('/admin/login')
        next()
    }
}
const Logout = async ( req, res, next) => {
    res.clearCookie('user')
    res.redirect('/admin')
}

module.exports = {
    Auth,
    Create,
    Dashboard,
    FilesUpload,
    Login,
    Logout,
    newAdmin,
    newArticle,
    newFile,
    newProfile,
    profileView,
    Profile,
    Register,
    Update,
    View
}