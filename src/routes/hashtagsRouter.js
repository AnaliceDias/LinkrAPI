import { Router } from "express";
import { getHashtagTrending, getPostsWithHashtag } from "../controllers/hashtagControllers.js";
import authValidator from "../middlewares/authValidator.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtag" , getHashtagTrending);
hashtagsRouter.get("/hashtag/:hashtag" , authValidator , getPostsWithHashtag);


export default hashtagsRouter;