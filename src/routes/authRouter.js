import { Router } from "express"

import { postSignIn, postSignUp } from "../controllers/authController.js"
import schemaValidator from "../middlewares/schemaValidator.js"
import signupSchema from "../schemas/signupSchema.js"
import loginSchema from "../schemas/loginSchema.js"

const authRouter = Router()

authRouter.post("/sign-up", schemaValidator(signupSchema), postSignUp)
authRouter.post("/", schemaValidator(loginSchema), postSignIn)

export default authRouter
