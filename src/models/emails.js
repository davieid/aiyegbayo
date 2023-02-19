const db = require('../db/index')
const add = async ( email, password)=>{
    const [rows] = await db.query('INSERT INTO email(email,password) VALUES( ?, ?)', [email, password])
    return rows
}
const find = async ( email)=>{
    const [rows] = await db.query( 'SELECT * FROM email where email=?', [email])
    return rows;
}
const updateOwner = async ( email, id)=>{
    const [rows] = await db.query('UPDATE email SET owner=?  WHERE email=?;', [ id, email])
    return rows;
}

module.exports =  {
    add,
    find,
    updateOwner
}