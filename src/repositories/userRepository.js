import db from "../../config/db.js"

async function getUserByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email])
}

async function createUser(name, email, password, picture) {
  return db.query(
    `
    INSERT INTO users (name, email, password, picture)
    VALUES ($1, $2, $3, $4)`,
    [name, email, password, picture]
  )
}

async function getUserName(userId){
  return db.query(
    `SELECT users.name FROM users WHERE users.id = $1`,
    [userId]
  )
}

const userRepository = {
  getUserByEmail,
  createUser,
  getUserName
}

export default userRepository
