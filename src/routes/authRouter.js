import { Router } from "express"

import { postSignIn, postSignUp } from "../controllers/authController.js"

const authRouter = Router()

authRouter.post("/signup", postSignUp)
authRouter.post("/signin", postSignIn)

export default authRouter
