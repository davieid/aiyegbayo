const Articles = require('../models/articles')
const Products = require('../models/products')
async function Banner () {
    //get two products 
    //get count[range]
    //select two from range
    const product_count = await Products.count()
    return product_count
}
async function Pentagon () {
    //pick 5 most viewed articles
    return await Articles.top( 5)
}
const homeData ={
    banner: Banner(),
    articles: Pentagon()
}
module.exports = ( req, res, next) => {
    res.render('journal/index', {
        title: 'The Buzz Journal',
        description: `
            We are a group of enthusiasts that believe it is our 
            responsibility to accurately report events and ideas 
            in a straightforward, safe manner.
        `
    })
}