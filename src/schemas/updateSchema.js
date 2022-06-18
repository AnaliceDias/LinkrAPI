import joi from "joi";

const updateSchema = joi.object({
  text: joi.string().min(0).required(),
});

export default updateSchema;
