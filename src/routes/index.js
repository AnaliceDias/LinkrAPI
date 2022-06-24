import { Router } from "express";

import authRouter from "./authRouter.js";
import headerRouter from "./headerRouter.js";
import likeRouter from "./likesRouter.js";
import commentRouter from "./commentRouter.js";
import postRouter from "./postRouter.js";
import hashtagsRouter from "./hashtagsRouter.js";
import followRouter from "./followRouter.js";
import repostRouter from "./repostRouter.js";

const router = Router();

router.use(authRouter);
router.use(headerRouter);
router.use(postRouter);
router.use(hashtagsRouter);
router.use(likeRouter);
router.use(commentRouter);
router.use(followRouter);
router.use(repostRouter);

export default router;
