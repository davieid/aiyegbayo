const db = require('../db/index')
const add = async ( email, firstname, lastname)=>{
    const [rows] = await db.query('INSERT INTO admin( uname, fname, lname) VALUES( ?, ?, ?)', [email, firstname, lastname])
    return rows
}
const find = async ( id)=>{
    const [rows] = await db.query( 'SELECT * FROM admin where id=?', [id])
    return rows;
}
const search = ()=>{}
const count = async ()=>{
    const [rows] = await db.query( 'SELECT COUNT (*) FROM email')
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
    find,
    search,
    count,
    top
}