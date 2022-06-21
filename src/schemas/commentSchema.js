import Joi from "joi";

const commentSchema = Joi.object({
  comment: Joi.string().required()
});

export default commentSchema;
