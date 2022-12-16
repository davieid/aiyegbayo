const db = require('../db/index')
const add = ()=>{}
const remove = ()=>{}
const update = ()=>{}
const find = ()=>{}
const search = ()=>{}
const count = async ()=>{
    const [rows] = await db.query( 'SELECT COUNT (*) FROM device')
    return rows;
}
const top = async ( limit)=>{
    if(!limit){
        limit = 1
    }
    const [rows] = await db.query(`SELECT * FROM device order by views DESC LIMIT ?`, [limit])
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