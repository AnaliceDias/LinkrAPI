import { Router } from "express";
import {
  checkIsFollowing,
  followUser,
  getFollows
} from "../controllers/followController.js";
import authValidator from "../middlewares/authValidator.js";

const followRouter = Router();

followRouter.get("/follow/:followId", authValidator, checkIsFollowing);
followRouter.post("/follow/:followId", authValidator, followUser);
followRouter.get("/follows", authValidator, getFollows);

export default followRouter;
