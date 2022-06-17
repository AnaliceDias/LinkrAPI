import { Router } from "express";

import authRouter from "./authRouter.js";
<<<<<<< HEAD
import hashtagsRouter from "./hashtagsRouter.js";
=======
import postRouter from "./postRouter.js";
>>>>>>> f89a20b78c5047cae108e00ce243690ff66107db

const router = Router();

router.use(authRouter);
<<<<<<< HEAD
router.use(hashtagsRouter)

=======
router.use(postRouter);


>>>>>>> f89a20b78c5047cae108e00ce243690ff66107db
export default router;
