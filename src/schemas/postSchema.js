import Joi from "joi";

const postSchema = Joi.object({
  text: Joi.string().min(0),
  link: Joi.string()
    .uri()
    .required()
    .pattern(/^http?s:\/\/(.*)$/)
});

export default postSchema;
