import { Router } from "express";

import { getUserPost } from "../controllers/usersController.js";

const userRouter = Router()

userRouter.get("/users/:id", getUserPost)

export default userRouter;