import { Router } from "express"
import { checkPostIsLiked, likePost } from "../controllers/likesController.js"
import authValidator from "../middlewares/authValidator.js"

const likeRouter = Router();

likeRouter.get("/like/:postId", authValidator, checkPostIsLiked);
likeRouter.post("/like", authValidator, likePost);


export default likeRouter;