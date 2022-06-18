import { Router } from "express";

import authRouter from "./authRouter.js"
import headerRouter from "./headerRouter.js"
import postRouter from "./postRouter.js";

const router = Router();

router.use(authRouter)
router.use(headerRouter)
router.use(postRouter)


export default router;
