const db = require('../db/index')
const add = ( name, img, views, content)=>{
    db.query( 'INSERT into `articles`( name, img, views, content) VALUES( ?,?,?,?)',
    [ name, img, views, content],
    async ( err, res) => {
        if(err){
            await err
        }
        else{
            return await res
        }
    })
}
const remove = ()=>{}
const update = ()=>{}
const find = ()=>{}
const search = ()=>{}
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
    remove,
    update,
    find,
    search,
    count,
    top
}