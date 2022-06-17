import { Router } from "express";

import authRouter from "./authRouter.js";
import likeRouter from "./likesRouter.js";
import postRouter from "./postRouter.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(likeRouter);

export default router;
