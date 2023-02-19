const db = require('../db/index')
const add = async ( email)=>{
    const [rows] = await db.query('INSERT INTO newsletter(email) VALUES(?)', [email])
    return rows
}
const find = async ( email)=>{
    const [rows] = await db.query( 'SELECT * FROM newsletter where email=?', [email])
    return rows;
}

module.exports =  {
    add,
    find
}