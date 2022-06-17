import { Router } from "express";

import authRouter from "./authRouter.js";
import hashtagsRouter from "./hashtagsRouter.js";

const router = Router();

router.use(authRouter);
router.use(hashtagsRouter)

export default router;
