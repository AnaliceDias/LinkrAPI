import { Router } from "express";


import authRouter from "./authRouter.js"
import headerRouter from "./headerRouter.js"
import likeRouter from "./likesRouter.js";

import postRouter from "./postRouter.js";
import hashtagsRouter from "./hashtagsRouter.js";

const router = Router();

router.use(authRouter)
router.use(headerRouter)
router.use(postRouter);
router.use(hashtagsRouter);
router.use(likeRouter);

export default router;
