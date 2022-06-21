import { Router } from "express";

import {
  deletePost,
  publishPost,
  getTimeline,
  createPostId,
  updatePost,
  getUserPosts,
} from "../controllers/postController.js";

import { identifyHashtags, verifyHashtags, createHashtag, relRegisterPostHashtags } from "../controllers/hashtagControllers.js";

import authValidator from "../middlewares/authValidator.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import postSchema from "../schemas/postSchema.js";
import updateSchema from "../schemas/updateSchema.js";
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
  relRegisterPostHashtags,
  publishPost
);

postRouter.delete(
  "/timeline/:postId",
  authValidator,
  deletePostValidator,
  deletePost
);

postRouter.get("/timeline", authValidator, getTimeline);
postRouter.get("/user/:id", getUserPosts);

postRouter.put("/timeline/:postId", authValidator, schemaValidator(updateSchema), updatePost);

export default postRouter;
