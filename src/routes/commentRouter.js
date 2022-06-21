import { Router } from "express";
import { addComment, getComments } from "../controllers/commentController.js";
import authValidator from "../middlewares/authValidator.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import commentSchema from "../schemas/commentSchema.js";

const commentRouter = Router();

commentRouter.post(
  "/timeline/comments/:postId",
  authValidator,
  schemaValidator(commentSchema),
  addComment
);
commentRouter.get("/timeline/comments/:postId", authValidator, getComments);

export default commentRouter;
