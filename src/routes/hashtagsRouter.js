import { Router } from "express";
import { getPostsWithHashtag } from "../controllers/hashtagControllers.js";
import authValidator from "../middlewares/authValidator.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtag/:hashtag" , authValidator , getPostsWithHashtag);
hashtagsRouter.get("/hashtag/trending");

export default hashtagsRouter;

