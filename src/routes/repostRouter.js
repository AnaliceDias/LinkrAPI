import { Router } from "express"
import { getRepostCount, getUserReposted, repostPost } from "../controllers/repostController.js";
import authValidator from "../middlewares/authValidator.js"

const repostRouter = Router();

repostRouter.get("/repost/:userId", getUserReposted)
repostRouter.get("/reposts/:postId", getRepostCount)
repostRouter.post("/repost", authValidator, repostPost);


export default repostRouter;