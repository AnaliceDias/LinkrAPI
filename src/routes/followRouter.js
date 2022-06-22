import { Router } from "express"
import { checkIsFollowing, followUser } from "../controllers/followController.js";
import authValidator from "../middlewares/authValidator.js"

const followRouter = Router();

followRouter.get("/follow/:followId", authValidator, checkIsFollowing);
followRouter.post("/follow/:followId", authValidator, followUser);

export default followRouter;