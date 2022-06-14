import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import userRepository from "../repositories/userRepository.js"

dotenv.config()

export async function postSignUp(req, res) {
  try {
    // check if email isn't already in use
    const user = await userRepository.getUserByEmail(req.body.email)
    if (user.rows[0]) {
      return res.sendStatus(409)
    }

    // create new user in database
    const { name, email, password, picture } = req.body

    const SALT = 10
    const passwordHash = bcrypt.hashSync(password, SALT)

    await userRepository.createUser(name, email, passwordHash, picture)

    res.sendStatus(201)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function postSignIn(req, res) {
  const u = res.locals.user
  console.log(u)
  
  const { email, password } = req.body
  try {
    // check if both email and password are corrects
    const user = await userRepository.getUserByEmail(email)
    if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
      return res.sendStatus(401)
    }

    // create new token
    const data = { userId: user.rows[0].id }
    const key = process.env.JWT_KEY
    const config = { expiresIn: 60 * 60 } // 60 minutes

    const token = jwt.sign(data, key, config)

    res.status(200).send(token)
  } catch (e) {
    res.sendStatus(500)
  }
}
