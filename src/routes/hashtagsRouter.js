import { Router } from "express";
import authValidator from "../middlewares/authValidator.js";

const hashtagsRouter = Router();

hashtagsRouter.post("/hashtag" , authValidator);
hashtagsRouter.get("hashtag/:hashtag");
hashtagsRouter.get("hashtag/trending");

hashtagsRouter.get("/hashtag" , authValidator , teste);

export default hashtagsRouter;

function teste(req , res){
    res.send("OK");
}

