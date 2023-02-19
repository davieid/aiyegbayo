const Articles = require('../models/articles')
const NewsLetter = require('../models/newsletter')

const Find = async ( req, res, next) => {
    const [article] = await Articles.findLink(req.params.id)
    res.render('journal/article.ejs', {
        title: 'The Buzz Journal | '+ article.title,
        description: article.description,
        article: article
    })
}
const Search = async( req, res, next) => {
    let {search} = req.body,
    articles = await Articles.search( search)
    res.render('journal/search', {
        title: 'The Buzz Journal | '+search,
        description: 'Search results for '+search,
        data: articles
    })
}
const Newsletter = async( req, res, next) => {
    let {news_email} = req.body,
    register = await NewsLetter.add( news_email);
    console.log(news_email)
    res.redirect('/')
}
const Home = async ( req, res, next) => {
    const pentagon = await Articles.top( 3)
    res.render('journal/index', {
        title: 'The Buzz Journal',
        description: `
            We are a group of enthusiasts that believe it is our 
            responsibility to accurately report events and ideas 
            in a straightforward, safe manner.
        `,
        data: pentagon
    })
}

module.exports = {
    Find,
    Search,
    Home,
    Newsletter
}