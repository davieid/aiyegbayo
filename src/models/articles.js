const db = require('../db/index')
const add = async ( title, image, owner, link, html, description)=>{
    const [row] = await db.query( 'INSERT into `articles`( title, image, owner, link, html, description) VALUES( ?,?,?,?,?,?)',
    [ title, image, owner, link, html, description])
    return row
}
const addFile = async ( email, image)=>{
    const [row] = await db.query( 'INSERT into `files`( name, email) VALUES( ?,?)',
    [ image, email])
    return row
}
const remove = ()=>{}
const update = async ( id, title, link, html, description)=>{
    await db.query('UPDATE articles SET title=?, link=?, description=?, html=? WHERE id=?;', [ title, link, description, html, id])
}
const updateImage = async ( id, image)=>{
    await db.query('UPDATE articles SET image=? WHERE id=?;', [ image, id])
}
const find = async ( id)=>{
    const [rows] = await db.query( 'SELECT * FROM `articles` WHERE id=?', [id])
    return rows;
}
const myArticles = async ( owner)=>{
    const [rows] = await db.query( 'SELECT * FROM `articles` WHERE owner=?', [owner])
    return rows;
}
const findLink = async ( link)=>{
    const [rows] = await db.query( 'SELECT * FROM `articles` WHERE link=?', [link])
    return rows;
}
const search = async ( term)=>{
    const [rows] = await db.query( 'SELECT * FROM `articles` WHERE html LIKE ?', [`%${term}%`])
    return rows;
}
const count = async ()=>{
    const [rows] = await db.query( 'SELECT count(*) FROM `articles`')
    return rows;
}
const top = async ( limit)=>{
    if(!limit){
        limit = 1
    }
    const [rows] = await db.query(`SELECT * FROM articles order by views DESC LIMIT ?`, [limit])
    return rows
}
module.exports =  {
    add,
    addFile,
    remove,
    update,
    find,
    findLink,
    myArticles,
    search,
    count,
    top,
    updateImage
}