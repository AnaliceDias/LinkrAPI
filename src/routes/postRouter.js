import { Router } from "express";

import {
  deletePost,
  publishPost,
  getTimeline,
  createPostId
} from "../controllers/postController.js";

import {
  identifyHashtags,
  verifyHashtags,
  createHashtag
} from "../controllers/hashtagControllers.js";

import authValidator from "../middlewares/authValidator.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import postSchema from "../schemas/postSchema.js";
import deletePostValidator from "../middlewares/deletePostValidator.js";

const postRouter = Router();

postRouter.post(
  "/timeline",
  authValidator,
  schemaValidator(postSchema),
  createPostId,
  identifyHashtags,
  verifyHashtags,
  createHashtag,
  publishPost
);

postRouter.delete(
  "/timeline/:postId",
  authValidator,
  deletePostValidator,
  deletePost
);

postRouter.get("/timeline", getTimeline);

export default postRouter;
