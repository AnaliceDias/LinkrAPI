import { Router } from "express"

import authRouter from "./authRouter.js"
import headerRouter from "./headerRouter.js"

const router = Router()

router.use(authRouter)
router.use(headerRouter)

export default router
