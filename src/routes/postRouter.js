import { Router } from "express";
import { getTimeline, publishPost } from "../controllers/postController.js";
import authValidator from "../middlewares/authValidator.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import postSchema from "../schemas/postSchema.js";


const postRouter = Router();

postRouter.post(
  "/timeline",
  authValidator,
  schemaValidator(postSchema),
  publishPost
);

postRouter.get(
  "/timeline", 
  getTimeline
);


export default postRouter;
